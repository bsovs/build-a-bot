# Build-A-Bot
*Starter kit to build a Discord Server Bot*

### Getting Started

Build-a-Bot requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/bsovs/build-a-bot.git
$ cd build-a-bot
$ npm i
$ node server.js
```
### Launching Bot
```sh
$ node server
```

### Creating a new command
Run to create a new bot command (creates cmd, flag, and test files)
```sh
$ npm run new
```

### Testing
Run mocha tests in intellij or by running the following test command
```sh
$ npm run test
```

### [Documentation - *wip*](https://github.com/bsovs/build-a-bot/tree/master/src#docs---wip)

# Full Guide
### Step 1
> Create a new application at: \
> https://discord.com/developers/applications \
> [![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774813483488641074/unknown.png)](https://discord.com/developers/applications)
### Step 2
> Add a bot to your new app \
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774814312781840394/unknown.png)
### Step 3
> Copy your bot token (should be in the General tab) and head over to \
> https://discord.com/oauth2/authorize?scope=bot&client_id=YOUR_CLIENT_ID \
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774815879317159956/unknown.png) \
> Should look something like this\
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774815592581431357/unknown.png) \
> Add your bot to your server
### Step 4
> Copy over your bot token to the config.json file \
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774814817156071434/unknown.png) \
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774816681242525776/unknown.png) \
> `./config.json`
### Step 5
> Test it out!  \
> Launch using ```node server``` in command promt, then send `!ping` in discord \
> ![N|Solid](https://cdn.discordapp.com/attachments/766804341439856673/774818702004322304/unknown.png) \
> *Note: if you have node yet installed depandancies do so now using the following commands,
```sh
$ npm i
$ node server.js
```
### Step 6
> Customise a new command.  \
> Use ``` npm run new ``` to create a new command. \
> Open up your new command *(found in ./src/bot/commands/)* \
> Once your command is registered you can refresh it by sending ```!refresh *your command*``` to discord.
### Hosting on Heroku
> In order to keep your bot running all the time we suggest using Heroku hosting solutions. \
> Head over to https://devcenter.heroku.com/articles/git and learn about how to deploy nodejs apps to Heroku \
> Add your config variables from ` config.json ` to your apps environment variables. 
