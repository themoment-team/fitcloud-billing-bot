const { Client, GatewayIntentBits } = require("discord.js");
const { FEE } = require("./nowFee.json");
const https = require("https");
require("dotenv").config();

const getExchangeRateURL = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${process.env.KOREA_EXIM_API_KEY}&data=AP01`;

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
    const exchangeRate = await getExchangeRate();
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    await channel.send(
      `이번 달 사용 금액은 ${calculate(FEE, exchangeRate)}원 입니다.`
    );
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

const calculate = (fee, krw) => {
  return Math.floor(fee * krw).toLocaleString("ko-KR");
};

client.login(process.env.DISCORD_BOT_TOKEN);

const getExchangeRate = () => {
  return new Promise(function (resolve, reject) {
    https
      .get(getExchangeRateURL, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const returnData = JSON.parse(data);
          resolve(returnData[returnData.length - 1].bkpr.replace(",", ""));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
