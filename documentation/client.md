Creating a Client | WPPConnect

\===============

[Skip to main content](https://wppconnect.io/docs/tutorial/basics/creating-client#__docusaurus_skipToContent_fallback)

⭐️ If you like WPPConnect, give it a star on [GitHub](https://github.com/wppconnect-team/wppconnect)

 [![Image 1: WPPconnect Logo](https://wppconnect.io/img/logo192.png) **WPPConnect**](https://wppconnect.io/)[Docs](https://wppconnect.io/docs/)[Tutorial](https://wppconnect.io/docs/tutorial/intro)[Projects](https://wppconnect.io/docs/projects)

[API](https://wppconnect.io/docs/tutorial/basics/creating-client#)

*   [WA-JS](https://wppconnect.io/wa-js)
*   [WPPConnect](https://wppconnect.io/wppconnect)

[Swagger](https://wppconnect.io/swagger/wppconnect-server)[WhatsApp Versions](https://wppconnect.io/whatsapp-versions)[Blog](https://wppconnect.io/blog)

[English](https://wppconnect.io/docs/tutorial/basics/creating-client#)

*   [English](https://wppconnect.io/docs/tutorial/basics/creating-client)
*   [Português (Brasil)](https://wppconnect.io/pt-BR/docs/tutorial/basics/creating-client)

***

*   [Help Us Translate](https://crowdin.com/project/wppconnect-site)

[](https://discord.gg/JU5JGGKGNG "Discord channel")[](https://github.com/wppconnect-team "GitHub repository")

⌘K

*   [Introduction](https://wppconnect.io/docs/)
    
*   [Projects](https://wppconnect.io/docs/projects)
    
    *   [Choosing the best project](https://wppconnect.io/docs/choosing-the-best-project-of-wppconnect-team)
    *   [WA-JS](https://wppconnect.io/docs/wa-js)
    *   [LIB (WPPConnect)](https://wppconnect.io/docs/wppconnect-lib)
    *   [WPPConnect-Server](https://wppconnect.io/docs/wppconnect-server)
    *   [WPP4Delphi](https://wppconnect.io/docs/wpp4delphi)
*   [Tutorial](https://wppconnect.io/docs/tutorial/basics/creating-client#)
    
    *   [Intro](https://wppconnect.io/docs/tutorial/intro)
    *   [Tutorial - WPPConnect](https://wppconnect.io/docs/tutorial/basics/creating-client#)
        *   [Installation](https://wppconnect.io/docs/tutorial/basics/installation)
        *   [Creating a Client](https://wppconnect.io/docs/tutorial/basics/creating-client)
        *   [Receiving Messages](https://wppconnect.io/docs/tutorial/basics/receiving-messages)
        *   [Configuring the logger](https://wppconnect.io/docs/tutorial/basics/configuring-logger)
        *   [Basic Functions (usage)](https://wppconnect.io/docs/tutorial/basics/basic-functions)
*   [](https://wppconnect.io/)
    
*   Tutorial
    
*   Tutorial - WPPConnect
    
*   Creating a Client
    

On this page

# Creating a Client

To start using `Wppconnect Bot`, you need to create a file and call the {@link create} method.\\ That method returns an `Promise` of {@link Whatsapp}.

`// Supports ES6// import { create, Whatsapp } from '@wppconnect-team/wppconnect';const wppconnect = require('@wppconnect-team/wppconnect');wppconnect .create() .then((client) => start(client)) .catch((error) => console.log(error));`

# Login with code

For login by code, insert the phone number in create method That method returns an `Promise` of {@link Whatsapp}.

`// Supports ES6// import { create, Whatsapp } from '@wppconnect-team/wppconnect';const wppconnect = require('@wppconnect-team/wppconnect');wppconnect .create({ phoneNumber: '5521985232927', catchLinkCode: (str) => console.log('Code: ' + str), }) .then((client) => start(client)) .catch((error) => console.log(error));`

## Multi sessions[​](https://wppconnect.io/docs/tutorial/basics/creating-client#multi-sessions "Direct link to Multi sessions")

If you want to start more than one session, for example, in case you have different departments in your project, then you had to specify it in your code like in that example:

`// Init sales whatsapp botwppconnect.create({session: 'sales'}).then((client) => startClient(client));// Init support whatsapp botwppconnect.create({session: 'support'}).then((client) => startSupport(client));`

## Passing options on create[​](https://wppconnect.io/docs/tutorial/basics/creating-client#passing-options-on-create "Direct link to Passing options on create")

The {@link create} method third parameter can have the following optional parameters (see all parameters in {@link CreateOptions}):

`wppconnect.create({ session: 'sessionName', //Pass the name of the client you want to start the bot catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => { console.log('Number of attempts to read the qrcode: ', attempts); console.log('Terminal qrcode: ', asciiQR); console.log('base64 image string qrcode: ', base64Qrimg); console.log('urlCode (data-ref): ', urlCode); }, statusFind: (statusSession, session) => { console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken //Create session wss return "serverClose" case server for close console.log('Session name: ', session); }, headless: true, // Headless chrome devtools: false, // Open devtools by default useChrome: true, // If false will use Chromium instance debug: false, // Opens a debug session logQR: true, // Logs QR automatically in terminal browserWS: '', // If u want to use browserWSEndpoint browserArgs: [''], // Parameters to be added into the chrome browser instance puppeteerOptions: {}, // Will be passed to puppeteer.launch disableWelcome: false, // Option to disable the welcoming message which appears in the beginning updatesLog: true, // Logs info updates automatically in terminal autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false) tokenStore: 'file', // Define how work with tokens, that can be a custom interface folderNameToken: './tokens', //folder name when saving tokens // BrowserSessionToken // To receive the client's token use the function await clinet.getSessionTokenBrowser() sessionToken: { WABrowserId: '"UnXjH....."', WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}', WAToken1: '"0i8...."', WAToken2: '"1@lPpzwC...."', } }) .then((client) => start(client)) .catch((error) => console.log(error));`

### Callback Status Session[​](https://wppconnect.io/docs/tutorial/basics/creating-client#callback-status-session "Direct link to Callback Status Session")

More details in {@link StatusFind}

| Status | Condition |
| --- | --- |
| `isLogged` | When the user is already logged in to the browser |
| `notLogged` | When the user is not connected to the browser, it is necessary to scan the QR code through the cell phone in the option WhatsApp Web |
| `browserClose` | If the browser is closed this parameter is returned |
| `qrReadSuccess` | If the user is not logged in, the QR code is passed on the terminal a callback is returned. After the correct reading by cell phone this parameter is returned |
| `qrReadFail` | If the browser stops when the QR code scan is in progress, this parameter is returned |
| `autocloseCalled` | The browser was closed using the autoClose command |
| `desconnectedMobile` | Client has disconnected in to mobile |
| `serverClose` | Client has disconnected in to wss |
| `deleteToken` | If you pass true within the function `client.getSessionTokenBrowser(true)` |

`const wppconnect = require('@wppconnect-team/wppconnect');wppconnect .create({ session: 'sessionName', statusFind: (statusSession, session) => { // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken console.log('Status Session: ', statusSession); // create session wss return "serverClose" case server for close console.log('Session name: ', session); }, }) .then((client) => start(client)) .catch((error) => console.log(error));`

### Phone connection verification[​](https://wppconnect.io/docs/tutorial/basics/creating-client#phone-connection-verification "Direct link to Phone connection verification")

To enforce the phone connection verification, you can use the code below or check the documentation {@link Whatsapp.startPhoneWatchdog}.:

`// To start with default interval.client.startPhoneWatchdog();// To start with custom interval.client.startPhoneWatchdog(30000); // 30s// To stop.client.stopPhoneWatchdog();`

### Exporting QR Code[​](https://wppconnect.io/docs/tutorial/basics/creating-client#exporting-qr-code "Direct link to Exporting QR Code")

By default, QR code will appear on the terminal. If you need to pass the QR somewhere else heres how (See {@link CatchQRCallback}):

`const fs = require('fs');const wppconnect = require('@wppconnect-team/wppconnect');wppconnect .create({ session: 'sessionName', catchQR: (base64Qr, asciiQR) => { console.log(asciiQR); // Optional to log the QR in the terminal var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {}; if (matches.length !== 3) { return new Error('Invalid input string'); } response.type = matches[1]; response.data = new Buffer.from(matches[2], 'base64'); var imageBuffer = response; require('fs').writeFile( 'out.png', imageBuffer['data'], 'binary', function (err) { if (err != null) { console.log(err); } } ); }, logQR: false, }) .then((client) => start(client)) .catch((error) => console.log(error));`

### Saving Session Token[​](https://wppconnect.io/docs/tutorial/basics/creating-client#saving-session-token "Direct link to Saving Session Token")

Read the {@link TokenStore}

[Edit this page](https://github.com/wppconnect-team/wppconnect-team.github.io/tree/main/docs/tutorial/basics/creating-client.md)

[Previous Installation](https://wppconnect.io/docs/tutorial/basics/installation)[Next Receiving Messages](https://wppconnect.io/docs/tutorial/basics/receiving-messages)

*   [Multi sessions](https://wppconnect.io/docs/tutorial/basics/creating-client#multi-sessions)
*   [Passing options on create](https://wppconnect.io/docs/tutorial/basics/creating-client#passing-options-on-create)
    *   [Callback Status Session](https://wppconnect.io/docs/tutorial/basics/creating-client#callback-status-session)
    *   [Phone connection verification](https://wppconnect.io/docs/tutorial/basics/creating-client#phone-connection-verification)
    *   [Exporting QR Code](https://wppconnect.io/docs/tutorial/basics/creating-client#exporting-qr-code)
    *   [Saving Session Token](https://wppconnect.io/docs/tutorial/basics/creating-client#saving-session-token)

Docs

*   [Tutorial](https://wppconnect.io/docs/tutorial/intro)

Community

*   [Discord](https://discord.gg/JU5JGGKGNG)
*   [YouTube](https://www.youtube.com/c/wppconnect)

More

*   [Blog](https://wppconnect.io/blog)
*   [GitHub](https://github.com/wppconnect-team)

Copyright © 2025 WPPConnect Team. Built with Docusaurus.