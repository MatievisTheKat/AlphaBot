module.exports = {
  name: "custom-command",
  run: async (msg, args) => {
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.channel.send("You dont have permission to use that!");
      
    const opt = args[0];
    if (!opt)
      return msg.channel.send(
        "You need to specify whether to add or remove a custom command! (Usage: {add | remove} {name} <response>"
      );

    if (opt === "add") {
      const name = args[1];
      const response = args.slice(2).join(" ");
      if (!name) return msg.channel.send("You need to supply a name!");
      if (!response) return msg.channel.send("You need to specify a response!");

      await addCC(msg, name, response);

      msg.channel.send("Added that custom command");
    } else if (opt === "remove") {
      const name = args[1];
      if (!name) return msg.channel.send("You need to supply a name!");

      await removeCC(msg, name);

      msg.channel.send("Removed that custom command");
    }
  },
};

async function removeCC(msg, name) {
  await msg.client.cc.delete(name, {
    name,
    run: (msg) => msg.channel.send(res),
  });
  await msg.client.cmd.commands.delete(name, {
    name,
    run: (msg) => msg.channel.send(res),
  });
}

async function addCC(msg, name, res) {
  await msg.client.cc.set(name, {
    name,
    run: (msg) => msg.channel.send(res),
  });
  await msg.client.cmd.commands.set(name, {
    name,
    run: (msg) => msg.channel.send(res),
  });
}
