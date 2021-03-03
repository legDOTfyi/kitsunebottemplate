  const Discord = require('discord.js');
  const client = new Discord.Client();
  const bot = client;
  const prefix = "$"

  //Place your client token here!

  client.login(tokenhere)

  Array.prototype.random = function() {

  return this[Math.floor(Math.random() * this.length)]
  
  }

  var categoryUsage = {
  "categoryName": "categoryDescripton",

  }

  var allCategories = PopulateCategoriesVar()

  function PopulateCategoriesVar() {

  let categories = []

  for (var cmd in commandList) {
  categories.push(cmd.category)
  }
  return categories
  }

  //These are all of the available categories to use! You can change the name and descriptions of these!

  var categoryUsage = {
  "moderation": "Commands to moderate the server!",
  "images": "These commands allow for image mirroring and image manipulation!",
  "bombs": "Shows up to 5 images depending on what command you use!",
  "emotions": "Let them know how you feel!",
  "actions": "Do some stuff, I guess.",
  "server": "Server-related things!",
  "misc": "Miscellaneous commands!"
  }

  var commandList = {

  //This is your help command. It should already be fancy and in an embed. You may leave the credit to me, the developer of KB, or you can remove it. Up to you. ^w^

"help": {
  description: "Displays this menu!",
  usage: "$help  or  $help {command}",
  category: "misc",
  process: async function(msg, parameters) {
  var embed = new Discord.MessageEmbed().setColor("#06FBFE")

  if (parameters) {
  var getPageNumber = parameters.replace(/\D+/g, '').trim()
  if (!getPageNumber)
  getPageNumber = 1
  parameters = parameters.replace(/\d+/g, '').trim()
  if (categoryUsage[parameters]) {
  let capitalizeCategoryName = parameters.charAt(0).toUpperCase() + parameters.slice(1)
  embed
  .setTitle(capitalizeCategoryName)
  .setDescription("Use `$commandName` to issue a command or do `$help {category} {page}` to change pages!")

  var fieldLimit = 6

  var fieldRangeMax = fieldLimit * getPageNumber
  var fieldRangeMin = fieldRangeMax - fieldLimit
  var fieldCount = 0
  for (var cmd in commandList) {

  let command = commandList[cmd]
  if (command.category === parameters) {
  fieldCount++
  if (fieldCount <= fieldRangeMin)
  continue
  if (fieldCount > fieldRangeMax)
  continue

  if (command.description)
  embed.addField(cmd, command.description, true)
  else
  embed.addField(cmd, "--", false)
  }
  }
  var maxPages = Math.ceil(fieldCount / fieldLimit)
  embed.setFooter(`Showing page  ${getPageNumber}  of  ${maxPages}`)

  if (embed.fields.length == 0)
  msg.channel.send(`No results found on that page!\nMax page count for  **${capitalizeCategoryName}**  is  **${maxPages}**`)
  else
  msg.channel.send(embed)
  }

  else if (commandList[parameters]) {
  msg.channel.send(`**$${parameters}** - **\`${commandList[parameters].usage}\`**\n${commandList[parameters].description}`)
  }
  else {
  msg.channel.send("Couldn't find that command, or category!  Use `$help` for a list!")
  }
  }
  else {
  embed
  .setTitle("Categories")
  .setFooter("Created by: Dusk#4396")
  .setDescription("Use `$help <category name>` to show commands for that category!")
  let helpMessageBody = ""
  for (var category in categoryUsage) {
  embed.addField(category, categoryUsage[category], true)
  }

  msg.channel.send(embed)
  }
  }
  },

  "commandname": {
  description: "Does something cool!",
  usage: "$commandname",
  category: "categoryNameHere",
  process: async function(msg, parameters) {

  //This is where your command code goes!

  }
  },

  }

  //Check and see if the message uses whatever you set the prefix to be at the top of the page. (You can change this if you wish!)

  bot.on('message', async msg => {

  if (!msg.content.startsWith(prefix))
  return

  let command = msg.content.toLowerCase().substring(1)

  command = command.split(' ')[0].trim().toLowerCase()

  statcord.postCommand(command, msg.author.id);

  let parameters = msg.content.replace(`$${command}`, '').trim()

  var isIgnored = IsIgnored(msg, command)
  if (isIgnored[0]) {
  msg.channel.send(isIgnored[1])
  return
  }

  console.log(`Processing Command:\nUser: ${msg.author.tag} - ${msg.author.id}\nCommand: ${command}\nParams: ${parameters}\nChannel: ${msg.channel.id}\n`)

  //If the command can't be found in your arraylist, react to their message with 🚫

  if (!commandList[command]) {
  await msg.channel.messages.fetch()
  .then(m => {
  msg.react("🚫")
  })
  .catch(m => {
  msg.react("🚫")
  })
  return
  }

  commandList[command].process(msg, parameters)
  })

  //This is where you set the fancy presence for things like, `PLAYING with fire` on bots status/presence

  //The types of activities are: 
  //PLAYING
  //STREAMING
  //LISTENING
  //WATCHING
  //CUSTOM_STATUS
  //COMPETING

  //Some of these may be deprecated and may no longer work!

  bot.on('ready', () => {
  bot.user.setActivity(`activityText`, { type: activityType });
  console.log("ready!")
  })
