const { Collection } = require("discord.js");
const cd = new Collection();
const axios = require("axios");

module.exports = {
  name: "message",
  run: async (client, msg) => {
    if (!msg.guild || msg.author.bot) return;

    const pc = client.config.paid_channels.find((c) => c.id === msg.channel.id);
    if (pc) {
      const bal =
        (await msg.client.money.get(`${msg.guild.id}_${msg.author.id}`)) || 0;
      if (bal < pc.price) {
        await msg
          .delete()
          .catch((_) =>
            msg.channel.send(
              "Failed to delete the message. Check if I have enough permissions!"
            )
          );

        msg.channel
          .send(
            "You do not have enough <:level_4_big:674793235972882467> to send a message here!"
          )
          .then((m) => m.delete({ timeout: 4000 }));
      } else {
        await client.money.set(
          `${msg.guild.id}_${msg.author.id}`,
          bal - pc.price
        );
      }
    }

    const now = Date.now();
    cd.set(`${msg.guild.id}_${now}`, msg.guild.id);
    setTimeout(async () => {
      await cd.delete(`${msg.guild.id}_${now}`);
      if (cd.size < 1) {
        const res = await axios.get("http://jservice.io/api/random");
        const randomQuestion = res.data[0].question;

        const m = await msg.channel.send(randomQuestion);

        setTimeout(() => {
          msg.channel.send(
            new msg.client.embed().setDescription(
              `The answer to [this question](${m.url}) is **${res.data[0].answer}**`
            )
          );
        }, 20 * 1000);
      }
    }, 30 * 60 * 60 * 1000);

    const [cmd, ...args] = msg.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/gi);

    const command = client.cmd.commands.get(cmd);
    if (command && msg.content.startsWith(client.prefix))
      command.run(msg, args);
    else {
      const bal =
        (await client.money.get(`${msg.guild.id}_${msg.author.id}`)) || 0;
      await client.money.set(
        `${msg.guild.id}_${msg.author.id}`,
        bal + client.config.amount_of_coins_per_message
      );
    }
  },
};
