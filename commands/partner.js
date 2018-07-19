const Discord = require ("discord.js");

module.exports.run = async(bot, message, args ) => {
    if(!args[0]) return message.channel.send("USAGE: %partner <user>");
    let arUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you cant do that.");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Couldn't find that user!");

    let gRole = message.guild.roles.find(`name`, "Partners");
    if(!gRole) return message.reply("Couldn't find that role.");

    if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
    await(rMember.addRole(gRole.id));

    
    message.channel.send(`<@${rMember.id}> has became one of our partners!`)
    
}

module.exports.help = {
    name:"partner"
}