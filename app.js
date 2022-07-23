const { Client, GatewayIntentBits } = require("discord.js");
const { PythonShell } = require("python-shell");
const { KRW } = require("./exchangeRate.json");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const option = {
  scriptPath: "./scripts",
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!이번 달 요금") {
    PythonShell.run("_main_.py", option, (err, data) => {
      if (err) throw err;
      message.reply(`이번 달 사용 금액은 ${calculate(data[0])}원 입니다.`);
    });
  }
});

const calculate = (dollar) => {
  return Math.floor(dollar.split("$")[1] * KRW).toLocaleString("ko-KR");
};

client.login(process.env.DISCORD_BOT_TOKEN);
