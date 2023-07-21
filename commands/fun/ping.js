const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(interaction) {
        // const ping = Date.now() - interaction.createdTimestamp; // Use the createdTimestamp directly

        await interaction.reply(`**🏓 Pong ${Math.abs(Date.now() - interaction.createdTimestamp)}ms. !**`);
    },
};
