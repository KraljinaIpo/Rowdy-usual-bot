const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("USAGE: %suggest <suggestion>");
    message.delete(1000)
    let suggestionChannel = message.guild.channels.find(`name`, "suggestions");
    if(!suggestionChannel) return message.channel.send("Can't find suggestions channel!");
    let suggestion = message.content.split(' ').slice(1).join(' ');
    let suggest = new Discord.RichEmbed()
      
      
    .setDescription('New Suggestion!')
        .setColor('#4286f4')
        .addField('User:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Server:', `${message.guild.name}`)
        .addField('Suggestion:', `${suggestion}`)
        .addField("Time", message.createdAt) 
        
    let msg = await suggestionChannel.send(suggest)
    await msg.react('✅');
    await msg.react('❌');
      
        
    
    }

module.exports.help = {
    name:"suggest"
  }