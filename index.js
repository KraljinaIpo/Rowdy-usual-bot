const Discord = require("discord.js")
const botconfig = require("./botconfig.json")
const bot = new Discord.Client();
const fs = require("fs");
const tokenfile = require("./token.json");
const ordinal = require("ordinal-js");
let coins = require("./coins.json");
let xp = require("./xp.json");

 

bot.commands = new Discord.Collection();

if(botconfig.token === "setmeplease") return console.log("Set your token up! Go to https://www.discordapp.com/developers and generate a token from a bot user.");
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) => {
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});
//------------------LOGGING----------------
bot.on("message", async message => {
  console.log(`[ ${message.guild} | ${message.channel.name} ] ${message.author.username}: ${message.content}`);
  let log = `[ ${message.guild} | ${message.channel.name} ] ${message.author.username}: ${message.content}`
  let logschannel = message.guild.channels.find( c => c.name  ==   `logs`)
  if(!logschannel) return message.channel.send("fuck you")
  if(message.author.bot) return;
  logschannel.send(log)

  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    //Reply to the user via DM.
    message.reply("Hey, ask anything mate!"); 
    //This logs the message to the console.
    console.log('\x1b[42m%s\x1b[0m', `(BotPM) ${message.author.username}: ${message.content}`); 
    //This get the user by their ID and assigns it to a variable.
    let userid = bot.users.get("387037054611226625"); 
    //Send the username and message content to the user
    return userid.send(`(BotPM) ${message.author.username}: ${message.content}`); 
  }

});
//-----------------------------------------------------

//-------------------SERVER STATS --------------------
const serverStats = {
  guildID: "468436520672690177",
  totalUsersID: "469211923528024065",
  memberCountID: "469211972156653568",
  botCountID: "469212007694860299"
};


//-----------------------------------WELCOME-------------------------------

bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'join-leave-log');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('#8e17b2')
      .setThumbnail(memberavatar)
      .addField(':bust_in_silhouette: | Name : ', `${member}`)
      .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
      .addField(`:family_mwgb: | Your are our `, ordinal.toOrdinal(member.guild.memberCount) + ` member!`)      
      .addField("Name", `<@` + `${member.id}` + `>`, true)
      .addField('Server', `${member.guild.name}`, true )
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

  console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'join-leave-log');
  let memberavatar = member.user.avatarURLl
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('#c82cf7')
      .setThumbnail(memberavatar)
      .addField('Sadly',`${member} has left the server!`)
      .addField('The server now has', `${member.guild.memberCount}` + " members!")
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

//-----------------------------------DONE----------------------------------

//CONSOLE LOG 
bot.on('guildMemberRemove', member => {
  console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
  console.log("Leave Message Sent")
  console.log(ordinal.toOrdinal(1)) // "1st"
  console.log(ordinal.toOrdinal(2)) // "2nd"
  console.log(ordinal.toOrdinal(3)) // "3rd"
  console.log(ordinal.toOrdinal(4)) // "4th"
});

//--------------------------------------------DONE----------------------------


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`on ${bot.guilds.size} servers!`, {type: "PLAYING"});
  //bot.user.setStatus('dnd')
  console.log("----------------------------------[ SERVERS ]----------------------------------")
  bot.guilds.forEach(guild => {
    guild.channels.filter(c => c.type == "text").first().createInvite({maxAge: 0}).then(invite => {
        console.log(`${invite.guild.name}: discord.gg/${invite.code}`)
    }).catch(e => console.log(e));
});
});


bot.on("message", async message => {
  let prefix = botconfig.prefix;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

//COIN SYSTEM ........ COIN SYSTEM
  if(!coins[message.author.id]) {
    coins[message.author.id] = {
        coins: 0
    };
  }
  
  let coinAmt = Math.floor(Math.random() * 20) + 1;
  let baseAmt = Math.floor(Math.random() * 20) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);
  
    if(coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
  
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
        });
      
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#0000FF")
    .addField("💰", `${coinAmt} coins added!`)
    
     message.channel.send(coinEmbed);
  }
// COIN SYSTEM ^^^^^^^^^ COIN SYSTEM

//XP SYSTEM DOWN...........XP SYSTEM

let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 1000;


  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Congratulations, you have leveled up!")
    .setColor("#00ff00")
    .addField("New Level", curlvl + 1)

    message.channel.send(lvlup);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err);
  });



//--------------------------------------------

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(!message.content.startsWith(botconfig.prefix)) return;
  if(commandfile) commandfile.run(bot,message,args);

});

//===================prefix above+===================

bot.on("guildMemberAdd", member => {
  if (member.guild.id !== serverStats.guildID) return;
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);



});
bot.on("guildMemberRemove", member => {
  if (member.guild.id !== serverStats.guildID) return;
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});


bot.login(tokenfile.token);