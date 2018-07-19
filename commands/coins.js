const Discord = require("discord.js");
let coins = require("../coins.json")

module.exports.run = async (bot, message, args) => {
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0 
        };
    }

    let uCoins = coins[message.author.id].coins;

    message.channel.send(":euro:" + "** | You have a balance of " + `${uCoins}` + " coins.**");
}


module.exports.help = {
    name:"coins"
}