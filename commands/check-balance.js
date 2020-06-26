module.exports = {
  name: "check-balance",
  run: async (msg, args) => {
    const target = msg.mentions.members.first() || msg.member;

    const bal =
      (await msg.client.money.get(`${msg.guild.id}_${target.user.id}`)) || 0;

    msg.channel.send(`**${target.user.username}** has ${Math.floor(bal)} <:level_4_big:674793235972882467>`);
  },
};
