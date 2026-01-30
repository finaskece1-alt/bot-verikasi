const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

/* ✅ Ambil Variables dari Railway */
const token = process.env.DISCORD_TOKEN;
const roleId = process.env.VERIFIED_ROLE_ID;
const channelId = process.env.VERIFY_CHANNEL_ID;

/* ✅ Anti Crash: cek variable */
if (!token) {
  console.log("❌ ERROR: DISCORD_TOKEN belum diset di Railway Variables");
  process.exit(1);
}

if (!roleId) {
  console.log("❌ ERROR: VERIFIED_ROLE_ID belum diset di Railway Variables");
  process.exit(1);
}

if (!channelId) {
  console.log("❌ ERROR: VERIFY_CHANNEL_ID belum diset di Railway Variables");
  process.exit(1);
}

/* ✅ Client Discord */
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", async () => {
  console.log(`✅ Bot Online sebagai ${client.user.tag}`);

  try {
    // ✅ Ambil channel verifikasi
    const channel = await client.channels.fetch(channelId);

    // ✅ Button Verify
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("verify_button")
        .setLabel("✅ VERIFIKASI")
        .setStyle(ButtonStyle.Success)
    );

    // ✅ Kirim pesan verify
    await channel.send({
      content:
        "**Tekan tombol verifikasi di bawah ini agar semua channel terbuka 🔓**",
      components: [row],
    });

    console.log("✅ Panel Verifikasi terkirim!");
  } catch (err) {
    console.log("❌ ERROR kirim pesan ke channel verify:");
    console.error(err);
  }
});

/* ✅ Handler Button */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify_button") {
    try {
      await interaction.member.roles.add(roleId);

      await interaction.reply({
        content: "✅ Kamu berhasil Verified! Semua channel terbuka 🔓",
        ephemeral: true,
      });
    } catch (err) {
      console.log("❌ ERROR kasih role:");
      console.error(err);

      await interaction.reply({
        content:
          "❌ Gagal kasih role. Pastikan bot punya izin Manage Roles & role bot di atas Verified.",
        ephemeral: true,
      });
    }
  }
});

/* ✅ Login */
client.login(token);
