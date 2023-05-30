const { Client, GatewayIntentBits } = require("discord.js");
const { KRW } = require("./exchangeRate.json");
const { FEE } = require("./nowFee.json");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    await channel.send(`이번 달 사용 금액은 ${calculate()}원 입니다.`);
    process.exit();
  } catch (e) {
    process.exit();
  }
});

// deprecated
// client.on("messageCreate", async (message) => {
//   if (message.content.replace(/ /g, "") === "!이번달요금") {
//     message.reply(`이번 달 사용 금액은 ${calculate()}원 입니다.`);
//   }
// });

const calculate = () => {
  return Math.floor(FEE * KRW).toLocaleString("ko-KR");
};

client.login(process.env.DISCORD_BOT_TOKEN);
