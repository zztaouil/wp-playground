const wppconnect = require('@wppconnect-team/wppconnect');

/**
 * Script to send a message to a specific group every 1 minute
 * 
 * Configuration:
 * - Set your GROUP_ID below (format: 'XXXXXXXXXX-XXXXXXXXXX@g.us')
 * - Set your custom MESSAGE
 * - Adjust INTERVAL_MS if needed (default: 60000ms = 1 minute)
 */

// ============ CONFIGURATION ============
const GROUP_ID = '120363403690304718@g.us'; // Replace with your group ID
const MESSAGE = 'wah a liam wah cheb l3arbi'; // Your custom message
const INTERVAL_MS = 60000; // 1 minute in milliseconds (60000ms = 60s = 1 minute)
// =======================================

let client = null;
let messageInterval = null;
let messageCount = 0;

/**
 * Send message to the specified group
 */
async function sendScheduledMessage() {
	try {
		messageCount++;
		const timestamp = new Date().toLocaleString();

		console.log(`\n📤 [${timestamp}] Sending message #${messageCount} to group...`);

		const result = await client.sendText(GROUP_ID, MESSAGE);

		console.log(`✅ Message sent successfully!`);
		console.log(`   Message ID: ${result.id}`);

	} catch (error) {
		console.error(`❌ Error sending message:`, error.message);
	}
}

/**
 * Start the scheduled message sender
 */
async function startScheduledMessages() {
	console.log('🚀 Starting WhatsApp Scheduled Message Bot...');
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
					console.log('✅ Already logged in! Using saved session.\n');
				} else if (statusSession === 'notLogged') {
					console.log('⚠️  Not logged in. Please scan the QR code.\n');
				} else if (statusSession === 'qrReadSuccess') {
					console.log('✅ QR Code scanned successfully!\n');
				} else if (statusSession === 'desconnectedMobile') {
					console.log('❌ Phone disconnected. Please check your phone.\n');
				}
			},
		});

		console.log('✅ Client initialized successfully!\n');

		// Verify the group exists
		console.log('🔍 Verifying group...');
		try {
			const chat = await client.getChatById(GROUP_ID);
			console.log(`✅ Found group: ${chat.name || 'Unnamed Group'}`);
			console.log(`   Participants: ${chat.groupMetadata?.participants?.length || 'N/A'}\n`);
		} catch (error) {
			console.error(`❌ Error: Could not find group with ID: ${GROUP_ID}`);
			console.error(`   Please check the group ID and try again.\n`);
			await client.close();
			process.exit(1);
		}

		console.log('⏰ Starting scheduled messages...');
		console.log(`📊 Configuration:`);
		console.log(`   Group ID: ${GROUP_ID}`);
		console.log(`   Message: "${MESSAGE}"`);
		console.log(`   Interval: ${INTERVAL_MS}ms (${INTERVAL_MS / 1000} seconds)`);
		console.log(`\n🔄 Bot is running. Press Ctrl+C to stop.\n`);

		// Send first message immediately
		await sendScheduledMessage();

		// Start interval for recurring messages
		messageInterval = setInterval(sendScheduledMessage, INTERVAL_MS);

		// Handle phone watchdog to ensure connection
		client.startPhoneWatchdog(30000); // Check connection every 30 seconds

	} catch (error) {
		console.error('❌ Fatal error:', error.message);
		console.error(error);
		cleanup();
		process.exit(1);
	}
}

/**
 * Cleanup function to close connections properly
 */
async function cleanup() {
	console.log('\n\n🛑 Stopping bot...');

	if (messageInterval) {
		clearInterval(messageInterval);
		console.log('✅ Stopped scheduled messages');
	}

	if (client) {
		try {
			await client.close();
			console.log('✅ Closed WhatsApp client');
		} catch (error) {
			console.error('Error closing client:', error.message);
		}
	}

	console.log(`\n📊 Final Stats:`);
	console.log(`   Total messages sent: ${messageCount}`);
	console.log('\n👋 Goodbye!\n');

	process.exit(0);
}

// Handle graceful shutdown
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Catch unhandled errors
process.on('unhandledRejection', (error) => {
	console.error('❌ Unhandled error:', error);
	cleanup();
});

// Start the bot
startScheduledMessages();
