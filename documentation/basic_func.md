[Skip to main content](https://wppconnect.io/docs/tutorial/basics/basic-functions/#__docusaurus_skipToContent_fallback)

⭐️ If you like WPPConnect, give it a star on [GitHub](https://github.com/wppconnect-team/wppconnect)

[![WPPconnect Logo](https://wppconnect.io/img/logo192.png)\\
**WPPConnect**](https://wppconnect.io/) [Docs](https://wppconnect.io/docs/) [Tutorial](https://wppconnect.io/docs/tutorial/intro) [Projects](https://wppconnect.io/docs/projects)

[API](https://wppconnect.io/docs/tutorial/basics/basic-functions/#)

- [WA-JS](https://wppconnect.io/wa-js)
- [WPPConnect](https://wppconnect.io/wppconnect)

[Swagger](https://wppconnect.io/swagger/wppconnect-server) [WhatsApp Versions](https://wppconnect.io/whatsapp-versions) [Blog](https://wppconnect.io/blog)

[English](https://wppconnect.io/docs/tutorial/basics/basic-functions/#)

- [English](https://wppconnect.io/docs/tutorial/basics/basic-functions)
- [Português (Brasil)](https://wppconnect.io/pt-BR/docs/tutorial/basics/basic-functions)
- * * *

- [Help Us Translate](https://crowdin.com/project/wppconnect-site)

[Discord channel](https://discord.gg/JU5JGGKGNG "Discord channel")  [GitHub repository](https://github.com/wppconnect-team "GitHub repository")

`ctrl`  `K`

- [Introduction](https://wppconnect.io/docs/)

- [Projects](https://wppconnect.io/docs/projects)

  - [Choosing the best project](https://wppconnect.io/docs/choosing-the-best-project-of-wppconnect-team)
  - [WA-JS](https://wppconnect.io/docs/wa-js)

  - [LIB (WPPConnect)](https://wppconnect.io/docs/wppconnect-lib)

  - [WPPConnect-Server](https://wppconnect.io/docs/wppconnect-server)

  - [WPP4Delphi](https://wppconnect.io/docs/wpp4delphi)
- [Tutorial](https://wppconnect.io/docs/tutorial/basics/basic-functions/#)

  - [Intro](https://wppconnect.io/docs/tutorial/intro)
  - [Tutorial - WPPConnect](https://wppconnect.io/docs/tutorial/basics/basic-functions/#)

    - [Installation](https://wppconnect.io/docs/tutorial/basics/installation)
    - [Creating a Client](https://wppconnect.io/docs/tutorial/basics/creating-client)
    - [Receiving Messages](https://wppconnect.io/docs/tutorial/basics/receiving-messages)
    - [Configuring the logger](https://wppconnect.io/docs/tutorial/basics/configuring-logger)
    - [Basic Functions (usage)](https://wppconnect.io/docs/tutorial/basics/basic-functions)

- [Home page](https://wppconnect.io/)
- Tutorial
- Tutorial - WPPConnect
- Basic Functions (usage)

On this page

# Basic Functions (usage)

Not every available function will be listed, for further look, every function
available can be found in {@link Whatsapp}

## Summary [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#summary "Direct link to Summary")

- [Chatting](https://wppconnect.io/docs/tutorial/basics/basic-functions/#chatting)
  - [sendContactVcard](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendcontactvcard)
  - [sendContactVcardList](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendcontactvcardlist)
  - [sendText](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendtext)
  - [sendLocation](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendlocation)
  - [sendLinkPreview](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendlinkpreview)
  - [sendImage](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimage)
  - [sendFile](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendfile)
  - [sendFileFromBase64](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendfilefrombase64)
  - [sendImageAsStickerGif](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimageasstickergif)
  - [sendImageAsSticker](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimageassticker)
  - [sendMentioned](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendmentioned)
  - [reply](https://wppconnect.io/docs/tutorial/basics/basic-functions/#reply)
  - [reply with mention](https://wppconnect.io/docs/tutorial/basics/basic-functions/#reply-with-mention)
  - [sendMessageOptions](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendmessageoptions)
  - [sendVideoAsGif](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendvideoasgif)
  - [forwardMessages](https://wppconnect.io/docs/tutorial/basics/basic-functions/#forwardmessages)
  - [sendSeen](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendseen)
  - [startTyping](https://wppconnect.io/docs/tutorial/basics/basic-functions/#starttyping)
  - [stopTyping](https://wppconnect.io/docs/tutorial/basics/basic-functions/#stoptyping)
  - [setChatState](https://wppconnect.io/docs/tutorial/basics/basic-functions/#setchatstate)

## Chatting [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#chatting "Direct link to Chatting")

> Here, `chatId` could be `<phoneNumber>@c.us` or `<phoneNumber>-<groupId>@g.us`

### sendContactVcard [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendcontactvcard "Direct link to sendContactVcard")

Send contact

```codeBlockLines_e6Vv
await client
  .sendContactVcard('000000000000@c.us', '111111111111@c.us', 'Name of contact')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendContactVcardList [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendcontactvcardlist "Direct link to sendContactVcardList")

Send a list of contact cards

```codeBlockLines_e6Vv
await client
  .sendContactVcardList('000000000000@c.us', [\
    '111111111111@c.us',\
    '222222222222@c.us',\
  ])
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendText [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendtext "Direct link to sendText")

Send basic text

```codeBlockLines_e6Vv
await client
  .sendText('000000000000@c.us', '👋 Hello from wppconnect!')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendLocation [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendlocation "Direct link to sendLocation")

Send location

```codeBlockLines_e6Vv
await client
  .sendLocation('000000000000@c.us', '-13.6561589', '-69.7309264', 'Brasil')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendLinkPreview [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendlinkpreview "Direct link to sendLinkPreview")

Automatically sends a link with the auto generated link preview. You can also add a custom message to be added.

```codeBlockLines_e6Vv
await client
  .sendLinkPreview(
    '000000000000@c.us',
    'https://www.youtube.com/watch?v=V1bFr2SWP1I',
    'Kamakawiwo ole'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendImage [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendimage "Direct link to sendImage")

Send an image (you can also upload an image using a valid HTTP protocol)

```codeBlockLines_e6Vv
await client
  .sendImage(
    '000000000000@c.us',
    'path/to/img.jpg',
    'image-name',
    'Caption text'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendFile [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendfile "Direct link to sendFile")

Send a file (wppconnect will take care of mime types, just need the path).\
You can also upload an image using a valid HTTP protocol

```codeBlockLines_e6Vv
await client
  .sendFile(
    '000000000000@c.us',
    'path/to/file.pdf',
    'file_name',
    'See my file in pdf'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendFileFromBase64 [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendfilefrombase64 "Direct link to sendFileFromBase64")

Sends a file.

> base64 parameter should have mime type already defined

```codeBlockLines_e6Vv
await client
  .sendFileFromBase64(
    '000000000000@c.us',
    base64PDF,
    'file_name.pdf',
    'See my file in pdf'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendImageAsStickerGif [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendimageasstickergif "Direct link to sendImageAsStickerGif")

Generates a sticker from the provided animated gif image and sends it (Send an image as animated sticker)\
Image path imageBase64 A valid gif and webp image will be required. You can also send via http/https ( [http://www.website.com/img.gif](http://www.website.com/img.gif))

```codeBlockLines_e6Vv
await client
  .sendImageAsStickerGif('000000000000@c.us', './image.gif')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendImageAsSticker [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendimageassticker "Direct link to sendImageAsSticker")

Generates a sticker from given image and sends it (Send Image As Sticker)\
image path imageBase64 A valid png, jpg and webp image will be required. You can also send via http/https ( [http://www.website.com/img.jpg](http://www.website.com/img.jpg))

```codeBlockLines_e6Vv
await client
  .sendImageAsSticker('000000000000@c.us', './image.jpg')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

```

### sendMentioned [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendmentioned "Direct link to sendMentioned")

Send `@tagged` message

```codeBlockLines_e6Vv
await client.sendMentioned(
  '000000000000@c.us',
  'Hello @5218113130740 and @5218243160777!',
  ['5218113130740', '5218243160777']
);

```

### reply [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#reply "Direct link to reply")

Reply to a message

```codeBlockLines_e6Vv
await client.reply(
  '000000000000@c.us',
  'This is a reply!',
  message.id.toString()
);

```

### reply with mention [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#reply-with-mention "Direct link to reply with mention")

Reply to a message with mention

```codeBlockLines_e6Vv
await client.reply(
  '000000000000@c.us',
  'Hello @5218113130740 and @5218243160777! This is a reply with mention!',
  message.id.toString(),
  ['5218113130740', '5218243160777']
);

```

### sendMessageOptions [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendmessageoptions "Direct link to sendMessageOptions")

Send a message with options

```codeBlockLines_e6Vv
await client
    .sendMessageOptions(
      '000000000000@c.us',
      'This is a reply!',
       {
          quotedMessageId: reply,
        }
    )
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });

```

### sendVideoAsGif [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendvideoasgif "Direct link to sendVideoAsGif")

Send a gif

```codeBlockLines_e6Vv
await client.sendVideoAsGif(
  '000000000000@c.us',
  'path/to/video.mp4',
  'video.gif',
  'Gif image file'
);

```

### forwardMessages [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#forwardmessages "Direct link to forwardMessages")

Forwards messages

```codeBlockLines_e6Vv
await client.forwardMessages(
  '000000000000@c.us',
  [message.id.toString()],
  true
);

```

### sendSeen [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#sendseen "Direct link to sendSeen")

Send seen ✔️✔️

```codeBlockLines_e6Vv
await client.sendSeen('000000000000@c.us');

```

### startTyping [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#starttyping "Direct link to startTyping")

Start typing...

```codeBlockLines_e6Vv
await client.startTyping('000000000000@c.us');

```

### stopTyping [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#stoptyping "Direct link to stopTyping")

Stop typing

```codeBlockLines_e6Vv
await client.stopTyping('000000000000@c.us');

```

### setChatState [​](https://wppconnect.io/docs/tutorial/basics/basic-functions/\#setchatstate "Direct link to setChatState")

Set chat state (0: Typing, 1: Recording, 2: Paused)

```codeBlockLines_e6Vv
await client.setChatState('000000000000@c.us', 0 | 1 | 2);

```

[Edit this page](https://github.com/wppconnect-team/wppconnect-team.github.io/tree/main/docs/tutorial/basics/basic-functions.md)

[Previous\\
\\
Configuring the logger](https://wppconnect.io/docs/tutorial/basics/configuring-logger)

- [Summary](https://wppconnect.io/docs/tutorial/basics/basic-functions/#summary)
- [Chatting](https://wppconnect.io/docs/tutorial/basics/basic-functions/#chatting)
  - [sendContactVcard](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendcontactvcard)
  - [sendContactVcardList](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendcontactvcardlist)
  - [sendText](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendtext)
  - [sendLocation](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendlocation)
  - [sendLinkPreview](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendlinkpreview)
  - [sendImage](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimage)
  - [sendFile](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendfile)
  - [sendFileFromBase64](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendfilefrombase64)
  - [sendImageAsStickerGif](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimageasstickergif)
  - [sendImageAsSticker](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendimageassticker)
  - [sendMentioned](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendmentioned)
  - [reply](https://wppconnect.io/docs/tutorial/basics/basic-functions/#reply)
  - [reply with mention](https://wppconnect.io/docs/tutorial/basics/basic-functions/#reply-with-mention)
  - [sendMessageOptions](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendmessageoptions)
  - [sendVideoAsGif](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendvideoasgif)
  - [forwardMessages](https://wppconnect.io/docs/tutorial/basics/basic-functions/#forwardmessages)
  - [sendSeen](https://wppconnect.io/docs/tutorial/basics/basic-functions/#sendseen)
  - [startTyping](https://wppconnect.io/docs/tutorial/basics/basic-functions/#starttyping)
  - [stopTyping](https://wppconnect.io/docs/tutorial/basics/basic-functions/#stoptyping)
  - [setChatState](https://wppconnect.io/docs/tutorial/basics/basic-functions/#setchatstate)

Docs

- [Tutorial](https://wppconnect.io/docs/tutorial/intro)

Community

- [Discord](https://discord.gg/JU5JGGKGNG)
- [YouTube](https://www.youtube.com/c/wppconnect)

More

- [Blog](https://wppconnect.io/blog)
- [GitHub](https://github.com/wppconnect-team)

Copyright © 2025 WPPConnect Team. Built with Docusaurus.