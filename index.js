require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ✅ Command /setupverify
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "setupverify") {
    const embed = new EmbedBuilder()
      .setTitle("✅ VERIFIKASI SERVER")
      .setDescription(
        "Tekan verifikasi di bawah ini untuk verif agar semua channel terbuka 🔓"
      );

    const button = new ButtonBuilder()
      .setCustomId("verify_button")
      .setLabel("✅ Verifikasi")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  }
});

// ✅ Button role verify
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify_button") {
    const role = interaction.guild.roles.cache.get(
      process.env.VERIFIED_ROLE_ID
    );

    if (!role)
      return interaction.reply({
        content: "❌ Role Verified belum diset!",
        ephemeral: true,
      });

    await interaction.member.roles.add(role);

    return interaction.reply({
      content: "✅ Kamu sudah verified! Semua channel kebuka 🔓",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);