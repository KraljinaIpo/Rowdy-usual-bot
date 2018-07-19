const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
var options = {
  maxAge: 3600,
  maxUses: 1
};

  var invite = rulesChannel.createInvite(options).then(function(newInvite){
   message.channel.send("https://discord.gg/" + newInvite.code)
    });
}

module.exports.help = {
    name: "invite"
}