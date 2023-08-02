const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const command = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Select a member and kick them.")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The member to kick")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("The reason for kicking")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .setDMPermission(false);

module.exports = {
  data: command,
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    await interaction.reply(
      `kicking ${target.username} for reason: ${reason}`
    );

    await interaction.guild.members.kick(target);
  },
};
