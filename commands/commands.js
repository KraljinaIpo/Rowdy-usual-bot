const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rMember = message.author

    let dmEmbed = new Discord.RichEmbed()
    .setAuthor("Commands")
    .setColor("#77FF33")
    .addField("!kick", "Kicks a user off your server")
    .addField("!ban", "Bans a user from your server so they cant join back unless unbanned")
    .addField("!clear", "Deletes a specific number of messages at once")
    //Whatever else you want to add.
    
    let hMember = message.author
    
            try{
            await message.author.send(dmEmbed);
            await message.channel.send(`<@${hMember.id}>: I have sent you the commands via DMs!`)
            }catch(e){
                message.channel.send(`<@${hMember.id}> we have tried to DM you the Help information but your DM's are locked.`)
            }
    }
module.exports.help = {
    name:"commands"
  }     