module.exports = {
  name: "help",
  run: async (msg, args) => {
    const embed = new msg.client.embed()
      .setDescription(msg.client.cmd.commands.map((c) => c.name).join(", "))
      .setColor("BLUE");

    msg.channel.send(embed);
  },
};
