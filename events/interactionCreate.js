const { Collection, Events } = require("discord.js");

// Store cooldown timeouts for each user
const cooldownTimeouts = new Collection();

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const { cooldowns } = client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 5;
    const cooldownAmount =
      (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id);

      if (now < expirationTime) {
        const remainingTime = (expirationTime - now) / 1000;
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${
            command.data.name
          }\`. You can use it again in ${remainingTime.toFixed(
            1
          )} seconds.`,
          ephemeral: true,
        });
      }
    }

    const expirationTime = now + cooldownAmount;
    timestamps.set(interaction.user.id, expirationTime);

    // Clear the existing timeout if it exists
    if (cooldownTimeouts.has(interaction.user.id)) {
      clearTimeout(cooldownTimeouts.get(interaction.user.id));
    }

    // Set a new timeout to remove the cooldown after the specified duration
    cooldownTimeouts.set(
      interaction.user.id,
      setTimeout(() => {
        timestamps.delete(interaction.user.id);
        cooldownTimeouts.delete(interaction.user.id);
      }, cooldownAmount)
    );

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
