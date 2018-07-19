const Discord = require('discord.js');
module.exports.run = async (bot,message,args) => {
    message.delete()
        let credit = new Discord.RichEmbed()
        .setTitle(`Credit of KraljinaIpo#0334`)
        .setColor("#E99E0B")
        .setDescription("Thank you for using our bot - Free Version we hope you enjoy this discord bot as much as we had coding it here at BLA BLA WILL BE ADDED");
      
        return message.channel.send(credit);
      }
      module.exports.help = {
          name: "credit"
      }