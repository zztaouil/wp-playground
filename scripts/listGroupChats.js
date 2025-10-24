const wppconnect = require('@wppconnect-team/wppconnect');

/**
 * Script to list all group chats with session persistence
 * This script will save the session to avoid scanning QR code every time
 * You only need to scan QR code on first run or when session expires
 */

async function listGroupChats() {
	console.log('Starting WhatsApp client...');
	console.log('Session will be saved to ./tokens folder\n');

	try {
		const client = await wppconnect.create({
			session: 'main', // Session name for identification
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
		console.log('Fetching group chats...\n');

		// Get all chats
		const allChats = await client.listChats();

		// Filter only group chats (groups have '@g.us' in their ID)
		// const groupChats = allChats.filter(chat => chat.isGroup);
		const groupChats = allChats;

		console.log(`\n📊 Found ${groupChats.length} group chat(s):\n`);
		console.log('='.repeat(80));

		groupChats.forEach((group, index) => {
			console.log(`\n${index + 1}. ${group.name || 'Unnamed Group'}`);
			console.log(`   ID: ${group.id._serialized}`);
			console.log(`   Participants: ${group.groupMetadata?.participants?.length || 'N/A'}`);
			console.log(`   Unread: ${group.unreadCount || 0}`);
			console.log(`   Last Message: ${group.lastReceivedKey ? new Date(group.t * 1000).toLocaleString() : 'N/A'}`);
			console.log('-'.repeat(80));
		});

		console.log('\n✅ Group listing complete!');
		console.log('💾 Session saved to ./tokens folder');
		console.log('🔄 Next time you run this script, you won\'t need to scan the QR code!\n');

		// Close the client
		await client.close();
		process.exit(0);

	} catch (error) {
		console.error('❌ Error:', error.message);
		console.error(error);
		process.exit(1);
	}
}

// Run the script
listGroupChats();
