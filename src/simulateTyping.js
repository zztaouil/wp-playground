const wppconnect = require('@wppconnect-team/wppconnect');

const GROUP_IDS = [
	// '120363403690304718@g.us', // Replace with your group IDs
	// '120363421930545060@g.us',
	// '120363297987222618@g.us', // abtal lmla7
	// '120363421170347948@g.us',
	// '120363419348107571@g.us',
	'212767563071@c.us' // ilias
];

async function main() {
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

		while (true) {
			// Loop over groups and simulate typing
			for (const groupId of GROUP_IDS) {
				console.log(`Starting typing simulation in group: ${groupId}`);
				
				// Start typing indicator
				await client.setChatState(groupId, 1);
				
				// Wait for 5 seconds
				await new Promise(resolve => setTimeout(resolve, Math.random() * 10000 + 5000));
				
				// Stop typing indicator
				await client.setChatState(groupId, 2);
				
				console.log(`Finished typing simulation in group: ${groupId}`);
			}
			await new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000));
		}

		// Handle phone watchdog to ensure connection
		client.startPhoneWatchdog(30000); // Check connection every 30 seconds
	} catch (error) {
		console.error('Fatal error:', error.message);
		console.error(error);
		cleanup();
		process.exit(1);
	}
}


main();