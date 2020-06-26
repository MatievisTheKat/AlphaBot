const ms = require("ms");

module.exports = {
  name: "giveaway",
  run: async (msg, args) => {
    const prize = args.slice(2).join(" ");
    const coinsToEnter =
      parseInt(args[1]) === 0
        ? parseInt(args[1])
        : parseInt(args[1]) || client.config.price_to_enter_giveaway;
    const timeout = ms(args[0]);

    if (!args[0] || !args[1] || !timeout || !prize)
      return msg.channel.send(
        `Incorrect usage! Usage: ${msg.client.prefix}${this.name} {timeout} {price to enter} {prize}\nFor example: \`${msg.client.prefix}${this.name} 10d 5 A very nice prize\``
      );

    const m = await msg.channel.send(
      ":tada: Giveaway! :tada:",
      new msg.client.embed().setTitle(prize).setDescription(
        `Timeout: ${ms(timeout, {
          long: true,
        })}\nPrice: ${coinsToEnter} <:level_4_big:674793235972882467>`
      )
    );

    const col = await m.createReactionCollector(
      (r, u) => !u.bot && r.emoji.name === "🎉",
      { time: timeout }
    );

    col.on("collect", async (r, u) => {
      const bal = (await msg.client.money.get(`${msg.guild.id}_${u.id}`)) || 0;
      if (bal < coinsToEnter) {
        await r.message.reactions.cache.get("🎉").users.remove(u.id);
        return msg.channel
          .send(
            `You do not have enough <:level_4_big:674793235972882467> to enter that giveaway ${u}! The required amount is ${coinsToEnter} <:level_4_big:674793235972882467>`
          )
          .then((message) => message.delete({ timeout: 10000 }));
      }

      await msg.client.money.set(
        `${msg.guild.id}_${u.id}`,
        bal - msg.client.config.price_to_enter_giveaway
      );
    });

    col.on("end", async (_) => {
      await m.reactions.removeAll();
      await m.edit("Giveaway Ended");
    });

    setTimeout(() => {
      col.stop();

      const users = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .array();
      const index = Math.floor(Math.random() * users.length);
      const winner = users[index];

      if (winner)
        msg.channel.send(`Congratulations ${winner}! You won **${prize}**`);
      else msg.channel.send(`No one won **${prize}** :(`);
    }, timeout);

    await m.react("🎉");
  },
};
