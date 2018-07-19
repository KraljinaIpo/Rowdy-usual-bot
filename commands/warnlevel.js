const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I am sorry but you can not use this command!");
    if(!args[0]) return message.channel.send("USAGE: %warnlevel <user>");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
    let wUser = message.guild.member(message.mentions.users()) || message.guild.members.get(args[0]) 
    if(!wUser) return message.reply("Couldn't find them yo"); 
    let warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
    name:"warnlevel"
}