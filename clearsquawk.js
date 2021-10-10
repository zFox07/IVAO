const Discord = require("discord.js");
const squawkCommand = require("./squawk");

module.exports.run = async (bot, message, args) => {
    if (args.length == 0) {
        await message.channel.send("Escreva um CallSign para remover o squawk!");
    } else {
        squawkCommand.removeSquawk(args[0]);
        await message.channel.send("O **SQUAWK** com o callsign \"" + args[0] + "\" foi removido!");
    }

}
