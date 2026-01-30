require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log("✅ Bot Online!");
});

// ✅ Kirim button otomatis pas bot nyala
client.on("ready", async () => {
  const channel = await client.channels.fetch("ID_CHANNEL_VERIF");

  channel.send({
    content: "**Klik tombol di bawah untuk verifikasi ✅**",
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("verify")
          .setLabel("✅ VERIFIKASI")
          .setStyle(ButtonStyle.Success)
      ),
    ],
  });
});

// ✅ Saat button diklik
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify") {
    await interaction.member.roles.add(process.env.VERIFIED_ROLE_ID);

    interaction.reply({
      content: "✅ Kamu sudah verified, channel terbuka!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
