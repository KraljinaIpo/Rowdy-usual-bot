const randomPuppy = require("random-puppy");
const request = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    let sReddits = ["learnprogramming", "compsci", "java", "javascript", "howtohack", "cpp", "python"];
    let s = sReddits[Math.round(Math.random() * (sReddits.length - 1))];
    randomPuppy(s)
        .then(url => {
            request.get(url).then(r => {
                message.channel.send({file: r.body});
            })
        })
}

module.exports.help = {
    name: "coding"
}