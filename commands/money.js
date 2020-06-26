module.exports = {
  name: "money",
  run: async (msg, args) => {
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.channel.send("You dont have permission to use that!");

    const target = msg.mentions.members.first();
    if (!target)
      return msg.channel.send("You need to mention someone to add <:level_4_big:674793235972882467> to");

    const amt = parseInt(args[1]);
    if (!amt) return msg.channel.send("You need to supply a valid number");

    const tBal =
      (await msg.client.money.get(`${msg.guild.id}_${target.user.id}`)) || 0;

    await msg.client.money.set(`${msg.guild.id}_${target.user.id}`, tBal + amt);

    msg.channel.send(
      `${amt < 0 ? "Removed" : "Added"} ${amt} <:level_4_big:674793235972882467> ${
        amt < 0 ? "from" : "to"
      } ${target}`
    );
  },
};
