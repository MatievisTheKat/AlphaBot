module.exports = {
  name: "buy",
  run: async (msg, args) => {
    const item = msg.client.config.shop.roles.find(
      (r) => r.name.toLowerCase() === args.join(" ").toLowerCase()
    );
    if (!item) return msg.channel.send("That is not a valid shop item name!");

    const bal =
      (await msg.client.money.get(`${msg.guild.id}_${msg.author.id}`)) || 0;
    if (bal < item.price)
      return msg.channel.send(
        "You do not have enough <:level_4_big:674793235972882467> to buy that!"
      );

    try {
      await msg.member.roles.add(item.id);
      await msg.client.money.set(
        `${msg.guild.id}_${msg.author.id}`,
        bal - item.price
      );

      msg.channel.send(
        `You successfully bought **${item.name}** for ${item.price} <:level_4_big:674793235972882467>`
      );
    } catch (err) {
      console.log(err);
      msg.channel.send(
        "I failed to add the role to you! Make sure I have enough permissions"
      );
    }
  },
};
