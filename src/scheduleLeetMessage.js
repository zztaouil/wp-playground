const wppconnect = require('@wppconnect-team/wppconnect');

/**
 * Script to send "13:37" message at exactly 13:37 UTC+1 (leet time!)
 * 
 * Configuration:
 * - Set your GROUP_IDS array below
 * - Message will be sent every day at 13:37 UTC+1
 * - Time zone: UTC+1 (CET/CEST)
 */

// ============ CONFIGURATION ============
const GROUP_IDS = [
	'120363403690304718@g.us', // Replace with your group IDs
	'120363297987222618@g.us',
	'120363421170347948@g.us'
];

const MESSAGE = '13:37'; // Leet message!
const TARGET_HOUR = 13; // 13:37 hour
const TARGET_MINUTE = 37; // 13:37 minute
const TIMEZONE_OFFSET = 1; // UTC+1 (in hours)
// =======================================

let client = null;
let checkInterval = null;
let messagesSentToday = new Set(); // Track which groups received message today

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
 * Check if it's time to send the message (13:37 UTC+1)
 */
function isLeetTime() {
	const now = getCurrentTimeUTCPlus1();
	const hour = now.getHours();
	const minute = now.getMinutes();

	return hour === TARGET_HOUR && minute === TARGET_MINUTE;
}

/**
 * Get next leet time occurrence
 */
function getNextLeetTime() {
	const now = getCurrentTimeUTCPlus1();
	const next = new Date(now);

	next.setHours(TARGET_HOUR, TARGET_MINUTE, 0, 0);

	// If we've passed 13:37 today, schedule for tomorrow
	if (now.getHours() > TARGET_HOUR ||
		(now.getHours() === TARGET_HOUR && now.getMinutes() >= TARGET_MINUTE)) {
		next.setDate(next.getDate() + 1);
	}

	return next;
}

/**
 * Send message to all configured groups
 */
async function sendLeetMessage() {
	const timestamp = getCurrentTimeUTCPlus1();
	const timeString = formatTime(timestamp);

	console.log(`\n[${timeString}] LEET TIME! Sending messages...`);

	let successCount = 0;
	let failCount = 0;

	for (const groupId of GROUP_IDS) {
		try {
			// Check if already sent to this group today
			const dateKey = timestamp.toISOString().split('T')[0];
			const messageKey = `${dateKey}-${groupId}`;

			if (messagesSentToday.has(messageKey)) {
				console.log(`Skipping ${groupId} (already sent today)`);
				continue;
			}

			console.log(`Sending to: ${groupId}...`);
			const result = await client.sendText(groupId, MESSAGE);

			console.log(`Sent successfully!`);
			console.log(`   Message ID: ${result.id}`);

			messagesSentToday.add(messageKey);
			successCount++;

			// Small delay between messages to avoid rate limiting
			await new Promise(resolve => setTimeout(resolve, 1000));

		} catch (error) {
			console.error(`Failed to send to ${groupId}:`, error.message);
			failCount++;
		}
	}

	console.log(`\nSummary:`);
	console.log(`   Sent: ${successCount}`);
	console.log(`   Failed: ${failCount}`);
	console.log(`   Total groups: ${GROUP_IDS.length}`);

	// Show next scheduled time
	const nextLeet = getNextLeetTime();
	console.log(`\nNext leet time: ${formatTime(nextLeet)}`);
}

/**
 * Check every second if it's leet time
 */
function checkAndSendIfLeetTime() {
	const now = getCurrentTimeUTCPlus1();
	const currentSecond = now.getSeconds();

	// Only check at the beginning of the minute (0-5 seconds window)
	if (currentSecond <= 5 && isLeetTime()) {
		sendLeetMessage();
	}
}

/**
 * Reset daily message tracker at midnight
 */
function scheduleMidnightReset() {
	const now = getCurrentTimeUTCPlus1();
	const tomorrow = new Date(now);
	tomorrow.setHours(0, 0, 0, 0);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const msUntilMidnight = tomorrow - now;

	setTimeout(() => {
		console.log('\nMidnight reset - clearing message history');
		messagesSentToday.clear();
		scheduleMidnightReset(); // Schedule next reset
	}, msUntilMidnight);

	console.log(`Midnight reset scheduled in ${Math.round(msUntilMidnight / 1000 / 60)} minutes`);
}

/**
 * Verify all groups exist
 */
async function verifyGroups() {
	console.log('\nVerifying groups...');

	const validGroups = [];
	const invalidGroups = [];

	for (const groupId of GROUP_IDS) {
		try {
			const chat = await client.getChatById(groupId);
			console.log(`${chat.name || 'Unnamed Group'} (${groupId})`);
			console.log(`   Participants: ${chat.groupMetadata?.participants?.length || 'N/A'}`);
			validGroups.push(groupId);
		} catch (error) {
			console.error(`Invalid group: ${groupId}`);
			invalidGroups.push(groupId);
		}
	}

	console.log(`\nGroups verified:`);
	console.log(`   Valid: ${validGroups.length}`);
	console.log(`   Invalid: ${invalidGroups.length}`);

	if (validGroups.length === 0) {
		throw new Error('No valid groups found! Please check your GROUP_IDS configuration.');
	}

	return validGroups;
}

/**
 * Calculate time until next leet time
 */
function getTimeUntilNextLeet() {
	const now = getCurrentTimeUTCPlus1();
	const next = getNextLeetTime();
	const diff = next - now;

	const hours = Math.floor(diff / 3600000);
	const minutes = Math.floor((diff % 3600000) / 60000);
	const seconds = Math.floor((diff % 60000) / 1000);

	return { hours, minutes, seconds, total: diff };
}

/**
 * Start the leet time scheduler
 */
async function startLeetScheduler() {
	console.log('Starting 13:37 Leet Time Scheduler...');
	console.log('Session will be saved to ./tokens folder\n');

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

		console.log('Client initialized successfully!\n');

		// Verify all groups
		await verifyGroups();

		const now = getCurrentTimeUTCPlus1();
		const nextLeet = getNextLeetTime();
		const timeUntil = getTimeUntilNextLeet();

		console.log('\nScheduler Configuration:');
		console.log(`   Current time (UTC+${TIMEZONE_OFFSET}): ${formatTime(now)}`);
		console.log(`   Target time: ${TARGET_HOUR}:${TARGET_MINUTE.toString().padStart(2, '0')} UTC+${TIMEZONE_OFFSET}`);
		console.log(`   Message: "${MESSAGE}"`);
		console.log(`   Groups: ${GROUP_IDS.length}`);
		console.log(`\nTime until next leet time:`);
		console.log(`   ${timeUntil.hours}h ${timeUntil.minutes}m ${timeUntil.seconds}s`);
		console.log(`   Next occurrence: ${formatTime(nextLeet)}`);

		console.log(`\nScheduler is running. Press Ctrl+C to stop.\n`);

		// Start checking every second
		checkInterval = setInterval(checkAndSendIfLeetTime, 1000);

		// Schedule midnight reset
		scheduleMidnightReset();

		// Handle phone watchdog to ensure connection
		client.startPhoneWatchdog(30000); // Check connection every 30 seconds

		// Show periodic status updates every 5 minutes
		setInterval(() => {
			const timeUntil = getTimeUntilNextLeet();
			const now = getCurrentTimeUTCPlus1();
			console.log(`\n[${formatTime(now)}] Status update:`);
			console.log(`   Time until next leet: ${timeUntil.hours}h ${timeUntil.minutes}m ${timeUntil.seconds}s`);
			console.log(`   Messages sent today: ${messagesSentToday.size / GROUP_IDS.length} times to ${GROUP_IDS.length} groups`);
		}, 300000); // Every 5 minutes

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

	if (checkInterval) {
		clearInterval(checkInterval);
		console.log('Stopped time checker');
	}

	if (client) {
		try {
			await client.close();
			console.log('Closed WhatsApp client');
		} catch (error) {
			console.error('Error closing client:', error.message);
		}
	}

	console.log(`\nSession Stats:`);
	console.log(`   Total message batches sent: ${messagesSentToday.size / GROUP_IDS.length}`);
	console.log(`   Total individual messages: ${messagesSentToday.size}`);
	console.log('\nGoodbye!\n');

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

// Start the scheduler
startLeetScheduler();
