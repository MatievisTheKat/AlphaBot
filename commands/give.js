module.exports = {
  name: "give",
  run: async (msg, args) => {
    const target = msg.mentions.members.first();
    if (!target)
      return msg.channel.send("You need to mention a member to give coins to!");

    const amt = parseInt(args[1]);
    if (!amt)
      return msg.channel.send("You must provide a valid amount to give!");

    const authorBal =
      (await msg.client.money.get(`${msg.guild.id}_${msg.author.id}`)) || 0;

    if (amt > authorBal)
      return msg.channel.send("You cant give more than you have!");
    if (amt <= 0)
      return msg.channel.send("You cant give less than or equal to 0 coins!");

    const tBal =
      (await msg.client.money.get(`${msg.guild.id}_${target.user.id}`)) || 0;

    await msg.client.money.set(
      `${msg.guild.id}_${msg.author.id}`,
      authorBal - amt
    );
    await msg.client.money.set(`${msg.guild.id}_${target.user.id}`, tBal + amt);

    msg.channel.send(`You gave ${target} ${amt} <:level_4_big:674793235972882467>!`);
  },
};
