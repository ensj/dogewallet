# DogeWallet - A Discord Bot for Dogecoin 
* [Try inviting the bot to your server!](https://discordapp.com/api/oauth2/authorize?client_id=466402935186784266&permissions=0&scope=bot) Type $help to get started.

DogeWallet is a discord bot that creates and manages dogecoin wallets for discord users. Users can transfer funds from their account to any user in discord, or any address outside of discord with their dogecoins. Try it yourself!

## Getting started

This Discord bot was created with block.io's API and discord.js! It's licensed under the MIT license, so feel free to do whatever you'd like with the code.

Make sure to install/create the files required to run this bot first, though. Here is a list of files/folders that have been omitted from the repo.

**node_modules/**
```
A simple npm init would install most of the required files.
npm install discord.js should install files required for a discord bot.
npm install block_io should allow your bot to use the block.io API.
``` 

**config.json**
```
{
	"prefix":"whatever prefix you'd like to use for the bot",
	"token":"the token your bot logs in with",
	"dogekey":"the dogecoin API key for block_io",
	"secret":"the secret user pin for block_io"
}
``` 
