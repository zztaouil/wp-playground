const wppconnect = require('@wppconnect-team/wppconnect');
const { send } = require('process');
const cron = require('node-cron');

/**
 * Script to send "13:37" message at exactly 13:37 UTC+1 (leet time!)
 * 
 * Configuration:
 * - Set your GROUP_IDS array below
 * - Message will be sent every day at 23:37 UTC+1
 * - Time zone: UTC+1 (CET/CEST)
 * - Uses node-cron for reliable scheduling
 */

// ============ CONFIGURATION ============
const GROUP_IDS = [
	'120363403690304718@g.us', // Replace with your group IDs
	'120363421930545060@g.us',
	'120363297987222618@g.us',
	'120363421170347948@g.us',
	'120363419348107571@g.us',
];

const MESSAGE = '13:37'; // Leet message!
const TARGET_HOUR = 13; // 13:37 hour
const TARGET_MINUTE = 37; // 13:37 minute
const TIMEZONE_OFFSET = 1; // UTC+1 (in hours)
// =======================================

let client = null;
let cronJob = null;

/**
 * Get current time in UTC+1
 */
function getCurrentTimeUTCPlus1() {
	const now = new Date();
	// Get UTC time and add offset
	const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
	const targetTime = new Date(utc + (TIMEZONE_OFFSET * 3600000));
	return targetTime;
}

/**
 * Format time for display
 */
function formatTime(date) {
	return date.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: 'UTC',
		timeZoneName: 'short'
	});
}

/**
 * Fetch a random duck image URL from the API
 */
async function getRandomDuckImage() {
	try {
		const https = require('https');

		return new Promise((resolve, reject) => {
			https.get('https://random-d.uk/api/v2/random', (res) => {
				let data = '';

				res.on('data', (chunk) => {
					data += chunk;
				});

				res.on('end', () => {
					try {
						const json = JSON.parse(data);
						if (json.url) {
							resolve(json.url);
						} else {
							reject(new Error('No URL found in response'));
						}
					} catch (error) {
						reject(error);
					}
				});
			}).on('error', (error) => {
				reject(error);
			});
		});
	} catch (error) {
		console.error('Error fetching duck image:', error.message);
		return null;
	}
}

/**
 * Send message to all configured groups
 */
async function sendLeetMessage() {
	try {
		const timestamp = getCurrentTimeUTCPlus1();
		const timeString = formatTime(timestamp);

		console.log(`\n[${timeString}] Sending messages...`);

		let successCount = 0;
		let failCount = 0;

		for (const groupId of GROUP_IDS) {
			try {
				// Check if already sent to this group today
				const dateKey = timestamp.toISOString().split('T')[0];
				const hour = timestamp.getHours().toString().padStart(2, '0');
				const minute = timestamp.getMinutes().toString().padStart(2, '0');
				const duckImageUrl = await getRandomDuckImage();

				// switched image to view-once, sending image first them leet message.
				let result;
				if (duckImageUrl) {
					result = await client.sendImage(
						groupId,           // to
						duckImageUrl,      // filePath (or URL)
						'duck.jpg',        // filename
						'',           	   // caption
						undefined,         // quotedMessageId
						true               // isViewOnce
					);
				} 
				result = await client.sendText(groupId, MESSAGE);

				console.log(`Sent successfully!`);
				console.log(`   Message ID: ${result.id}`);

				successCount++;

				// Small delay between messages to avoid rate limiting
				await new Promise(resolve => setTimeout(resolve, 5000));

			} catch (error) {
				console.error(`Failed to send to ${groupId}:`, error.message);
				failCount++;
			}
		}
	} catch (error) {
		console.error('Error in sendLeetMessage:', error.message);
	}
}

/**
 * Start the leet time scheduler using node-cron
 */
async function startLeetScheduler() {
	console.log('Starting scheduler...');

	try {
		// Create WhatsApp client
		client = await wppconnect.create({
			session: 'main', // Unique session name
			headless: true, // Run in headless mode (no browser window)
			logQR: true, // Show QR code in terminal
			disableWelcome: true, // Disable welcome message
			updatesLog: false, // Disable update logs for cleaner output
			autoClose: 0, // Don't auto-close after QR scan
			tokenStore: 'file', // Store tokens in file system
			folderNameToken: './tokens', // Folder to save session tokens

			puppeteerOptions: {
				args: ['--no-sandbox', '--disable-setuid-sandbox']
			},

			// Callback for QR code
			catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
				console.log('QR Code Attempts:', attempts);
				console.log('\nScan this QR code with WhatsApp:');
				console.log(asciiQR);
				console.log('\n');
			},

			// Callback for session status
			statusFind: (statusSession, session) => {
				console.log('Status:', statusSession);
				console.log('Session:', session);

				if (statusSession === 'isLogged') {
					console.log('Already logged in! Using saved session.\n');
				} else if (statusSession === 'notLogged') {
					console.log('Not logged in. Please scan the QR code.\n');
				} else if (statusSession === 'qrReadSuccess') {
					console.log('QR Code scanned successfully!\n');
				} else if (statusSession === 'desconnectedMobile') {
					console.log('Phone disconnected. Please check your phone.\n');
				}
			},
		});

		console.log(`\nScheduler is running. Press Ctrl+C to stop.`);

		// Schedule the message using cron
		cronJob = cron.schedule(`${TARGET_MINUTE} ${TARGET_HOUR} * * *`, async () => {
			await sendLeetMessage();
		}, {
			scheduled: true,
			timezone: 'Etc/GMT-1' // UTC+1 timezone
		});

		// Handle phone watchdog to ensure connection
		client.startPhoneWatchdog(30000); // Check connection every 30 seconds
	} catch (error) {
		console.error('Fatal error:', error.message);
		console.error(error);
		cleanup();
		process.exit(1);
	}
}

/**
 * Cleanup function to close connections properly
 */
async function cleanup() {
	console.log('\n\nStopping scheduler...');

	if (cronJob) {
		cronJob.stop();
		console.log('Stopped cron job');
	}

	if (client) {
		try {
			await client.close();
			console.log('Closed WhatsApp client');
		} catch (error) {
			console.error('Error closing client:', error.message);
		}
	}

	process.exit(0);
}

// Handle graceful shutdown
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Catch unhandled errors
process.on('unhandledRejection', (error) => {
	console.error('Unhandled error:', error);
	cleanup();
});

/**
 * Test function - sends a single message immediately after connecting
 */
async function testSendMessage() {
	console.log('Starting test mode - will send message once...');
	console.log('Session will be saved to ./tokens folder\n');

	try {
		// Create WhatsApp client
		client = await wppconnect.create({
			session: 'main',
			headless: true,
			logQR: true,
			disableWelcome: true,
			updatesLog: false,
			autoClose: 0,
			tokenStore: 'file',
			folderNameToken: './tokens',
			puppeteerOptions: {
				args: ['--no-sandbox', '--disable-setuid-sandbox']
			},
		});

		console.log('Client initialized successfully!\n');

		// Send the message
		await sendLeetMessage();

		// Cleanup and exit
		setTimeout(async () => {
			await cleanup();
		}, 2000);

	} catch (error) {
		console.error('Fatal error:', error.message);
		console.error(error);
		cleanup();
		process.exit(1);
	}
}

// Start the scheduler
startLeetScheduler();

// Test mode - send one message
// testSendMessage();