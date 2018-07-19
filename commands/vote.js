const Discord = require("discord.js");
const agree = "✅";
const disagree = "❌";

module.exports.run = async (bot, message, args) => {
    question = args.join(" ");
    if(!question) return message.channel.send("Usage: **%vote <question>**");
    let putQuestion = await message.channel.send(`[QUESTION] ${question}`);
    let msg = await message.channel.send("VOTE! You have 15 seconds untill the vote expires!");
    await msg.react(agree);
    await msg.react(disagree);
    
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
    message.channel.send(`Results: \n\n${agree}: ${reactions.get(agree).count-1}${disagree}: ${reactions.get(disagree).count-1}`);
}

module.exports.run = async (bot, message, args) => {

}

module.exports.help = {
    name: "vote"
}