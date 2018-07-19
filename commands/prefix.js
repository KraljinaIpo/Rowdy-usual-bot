const Discord = require("discord.js")
const fs = require("fs");
const botconfig = require("../config.json")


module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("USAGE: .prefix <new-prefix>");
    let newPrefix = args[0]
    botconfig.prefix = newPrefix;
    fs.writeFile("./config.json", JSON.stringify(botconfig), (err) => {
        if(err) console.log(err)
      });
      message.channel.send(`Prefix updated to "${newPrefix}"`);
}


module.exports.help = {
    name: "prefix"
}