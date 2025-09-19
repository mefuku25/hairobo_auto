import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  // ユーザーが VC に新規参加したとき
  if (!oldState.channelId && newState.channelId) {
    const textChannel = newState.guild.systemChannel; // サーバーのデフォルトチャンネル
    if (textChannel) {
      textChannel.send("はいロボ");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
