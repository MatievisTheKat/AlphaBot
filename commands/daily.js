const cd = new Set();

module.exports = {
  name: "daily",
  run: async (msg, args) => {
    if (cd.has(msg.author.id))
      return msg.channel.send(
        "You may only claim your daily bonus once a day!"
      );

    const bal =
      (await msg.client.money.get(`${msg.guild.id}_${msg.author.id}`)) || 0;

    await msg.client.money.set(
      `${msg.guild.id}_${msg.author.id}`,
      bal + msg.client.config.daily_reward_amount
    );
    cd.add(msg.author.id);

    msg.channel.send(
      `You have received ${msg.client.config.daily_reward_amount} <:level_4_big:674793235972882467>`
    );

    setTimeout(() => {
      cd.delete(msg.author.id);
    }, 24 * 60 * 60 * 1000);
  },
};
