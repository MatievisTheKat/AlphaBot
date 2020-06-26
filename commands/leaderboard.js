module.exports = {
  name: "leaderboard",
  run: async (msg, args) => {
    const money = await msg.client.money.all();
    const sorted = money
      .filter((m) => m.key.split("_")[0] === msg.guild.id)
      .sort((a, b) => b.value - a.value);

    const lb = sorted.map(
      (m, i) => `**${i + 1}**: <@${m.key.split("_")[1]}> - *${m.value}*`
    );

    msg.channel.send(
      new msg.client.embed()
        .setTitle("Leaderboard")
        .setDescription(lb || "No one")
    );
  },
};
