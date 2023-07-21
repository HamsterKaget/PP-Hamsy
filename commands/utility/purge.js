// utility/purge.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete multiple messages from a channel.")
    .addNumberOption((option) => option.setName("ammount").setDescription("Enter an Ammount of the message do you want to delete").setRequired(true)),
  async execute(interaction) {
    // Implement the purge functionality here
    const ammount = interaction.options.getNumber("ammount");

    await interaction.channel.bulkDelete(ammount);
    await interaction.reply({ content: `Success Delete ${ammount} messages!`, ephemeral: true });
  },
};
