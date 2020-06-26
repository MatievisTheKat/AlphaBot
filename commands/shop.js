module.exports = {
  name: "shop",
  run: async (msg, args) => {
    const embed = new msg.client.embed().setAuthor("Role Shop").setDescription(
      msg.client.config.shop.roles
        .map((r) => {
          const role = msg.guild.roles.cache.get(r.id);
          if (!role) return;
          return `${role.name}: <:level_4_big:674793235972882467> ${r.price}`;
        })
        .join("\n")
    );

    msg.channel.send(embed);
  },
};
