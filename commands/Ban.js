const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("I am sorry but you can not use this command!");
    if(!args[0]) return message.channel.send("USAGE: %ban <person> <reason>");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!");
       
 
 
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#990000")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
 
        let incidentChannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentChannel) return message.channel.send("Can't find incidents channel!");
 
       message.guild.member(bUser).ban(bReason);
       incidentChannel.send(banEmbed);
 
       return;
    }
 
module.exports.help = {
    name:"ban"
  }