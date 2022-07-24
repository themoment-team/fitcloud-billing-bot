const { Client, GatewayIntentBits } = require("discord.js");
const { KRW } = require("./exchangeRate.json");
const { FEE } = require("./nowFee.json");
const request = require("request");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content.replace(/ /g, "") === "!이번달요금") {
    message.reply(`이번 달 사용 금액은 ${calculate()}원 입니다.`);
  }
  if (message.content == "!gcs") {
    request({
      uri: "https://p94a7zofw0.execute-api.ap-northeast-2.amazonaws.com/HiRecruit-API-stage/hirecruit-github-action-caches-for-repository",
      method: "GET",
    });
    message.reply("hr-action-cache-storage-stat");
  }
});

const calculate = () => {
  return Math.floor(FEE * KRW).toLocaleString("ko-KR");
};

client.login(process.env.DISCORD_BOT_TOKEN);
