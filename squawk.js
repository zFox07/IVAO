const Discord = require("discord.js")
const axios = require("axios")
var squawks = {}
function clearSquawks() {
        squawks = {};
}
function removeSquawk(callsign) {
        delete squawks[callsign];
}
async function run(bot, message, args) {

        axios.get("https://api.ivao.aero/v2/tracker/whazzup").then((res) => {
                const apiResponse = res.data;
                const callSignToSearch = args[0]
                var arg = args[0]
                var isOnline = false;
                function random(min, max) {
                        return Math.floor(Math.random() * (max - min) + min)
                }
                apiResponse.clients.pilots.forEach((value) => {
                        if (value.callsign == callSignToSearch) {
                                var squawk = 0;
                                if (value.callsign in squawks) {
                                        squawk = squawks[value.callsign];
                                } else {
                                        squawk = random(7000, 7999);
                                        squawks[value.callsign] = squawk;
                                }
                                isOnline = true;
                                let embed = new Discord.MessageEmbed()
                                        .setTitle(`**SQUAWK**`)
                                        .setDescription(`O CallSign ${args[0]} foi encontrado! \n**Squawk** ${squawk}`)
                                        .setTimestamp()
                                        .setColor("BLUE")
                                message.channel.send(embed)
                        }
                })
                if (!isOnline) {
                        let embedOff = new Discord.MessageEmbed()
                                .setTitle(`**SQUAWK**`)
                                .setDescription(`Não foi possivel encontrar o callsign, por isso não pode ser gerado um Squawk!`)
                                .setTimestamp()
                                .setColor("RED")
                        message.channel.send(embedOff)
                }

        });
}
module.exports = {
        run,
        clearSquawks,
        removeSquawk
}
