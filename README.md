# WhatsApp Bot - wp-fun

A modular WhatsApp bot built with WPPConnect that provides automated message processing and responses with session persistence.

## Features

✅ **Session Management**: Persistent sessions that don't require QR scanning after every restart  
✅ **Smart Message Processing**: Analyzes incoming messages and determines appropriate response types  
✅ **Flexible Response System**: Supports text, images, files, contacts, and location responses  
✅ **Channel Subscription**: Subscribe to specific users or groups  
✅ **Session Expiration Handling**: Automatically prompts for new QR code when session expires  
✅ **Error Handling & Retry Logic**: Robust error handling with automatic retries  
✅ **Comprehensive Logging**: File and console logging with multiple levels  
✅ **Health Monitoring**: Connection monitoring and health checks

## Project Structure

```
wp-fun/
├── src/
│   ├── main.js              # Main bot application
│   ├── config.js            # Configuration settings
│   ├── messageProcessor.js  # Message analysis and processing
│   ├── responseFormatter.js # Response formatting and sending
│   ├── sessionManager.js    # Session persistence and QR handling
│   └── utils.js             # Utility functions and logging
├── documentation/
│   ├── basic_func.md        # WPPConnect basic functions documentation
│   └── client.md            # WPPConnect client documentation
├── tokens/                  # Session tokens (auto-created)
├── logs/                    # Log files (auto-created)
├── package.json
└── README.md
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Edit `src/config.js` to customize your bot:

### 1. Subscribe to Channels

Add phone numbers and group IDs to monitor:

```javascript
subscribedChannels: {
  // Individual users (format: 'phonenumber@c.us')
  users: [
    '5511999999999@c.us', // Brazilian number example
    '1234567890@c.us',    // US number example
  ],
  
  // Groups (format: 'groupid@g.us')
  groups: [
    '120363123456789@g.us', // Group ID example
  ]
}
```

### 2. Customize Responses

Modify response templates and keywords:

```javascript
processing: {
  keywords: {
    help: ['help', 'ajuda', 'menu', 'comandos'],
    greeting: ['hello', 'hi', 'oi', 'olá'],
    // Add your keywords...
  }
},

responses: {
  templates: {
    greeting: ['Hello! How can I help you? 👋'],
    help: '🤖 Bot Commands\\n\\n• Type *help* - Show menu...',
    // Customize your responses...
  }
}
```

## Usage

### Start the Bot

```bash
# Development mode
npm run dev

# Production mode
npm run prod

# Standard start
npm start
```

### First Time Setup

1. Run the bot: `npm start`
2. Scan the QR code with your WhatsApp
3. The session will be saved for future use

### Managing the Bot

```bash
# Check if bot is running
npm run status

# Stop the bot
npm run stop

# Restart the bot
npm run restart

# View live logs
npm run logs

# Clear session (force new QR scan)
npm run clear-session

# Clear log files
npm run clear-logs
```

## How It Works

### 1. Message Flow

```
Incoming Message → Message Processor → Response Formatter → WhatsApp
                       ↓
                 Determines if should reply
                 and what type of response
```

### 2. Key Components

- **MessageProcessor**: Analyzes messages, checks subscribed channels, determines response type
- **ResponseFormatter**: Formats and sends appropriate responses (text, media, etc.)
- **SessionManager**: Handles QR codes, session persistence, and connection monitoring
- **Utils**: Logging, error handling, and helper functions

### 3. Session Management

- Sessions are automatically saved to the `tokens/` folder
- QR code is only required for first setup or after session expiration
- Automatic session health monitoring and reconnection

## Response Types

The bot supports various response types:

- **GREETING**: Welcome messages
- **HELP**: Command help and instructions
- **INFO**: Bot information
- **THANKS**: Thank you responses
- **STATUS**: Bot status information
- **DEFAULT**: General responses
- **ERROR**: Error messages

## Logging

Logs are saved to `logs/bot.log` with different levels:

- **ERROR**: Critical errors
- **WARN**: Warnings and issues
- **INFO**: General information
- **DEBUG**: Detailed debug information

## Customization

### Adding New Response Types

1. Add to `config.js` response types and templates
2. Update `messageProcessor.js` to detect new patterns
3. Handle in `responseFormatter.js` for custom formatting

### Adding Media Responses

```javascript
// In responseFormatter.js
const imageResponse = {
  type: 'image',
  content: {
    path: 'path/to/image.jpg',
    filename: 'image.jpg',
    caption: 'Image caption'
  }
};
```

## Security Notes

- Never commit the `tokens/` folder to version control
- Keep your session tokens secure
- Be cautious with auto-responses to avoid spam
- Monitor logs for suspicious activity

## Troubleshooting

### Common Issues

1. **QR Code Not Appearing**: Check if `logQR: true` in config
2. **Session Expires Quickly**: Check WhatsApp Web settings
3. **Messages Not Processing**: Verify subscribed channels configuration
4. **High Memory Usage**: Monitor logs and restart periodically

### Debug Mode

Set `debug: true` in config and `logLevel: 'debug'` for verbose logging.

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

- Check the logs: `npm run logs`
- Review WPPConnect documentation in the `documentation/` folder
- Create an issue for bugs or feature requests