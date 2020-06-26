const ms = require("ms");

module.exports = {
  name: "schedule",
  run: async (msg, args) => {
    const interval = parseInt(ms(args[0]));
    const response = args.slice(1).join(" ");
    if (!interval || !response)
      return msg.channel.send(
        `Incorrect usage! Usage: ${msg.client.prefix}${this.name} {interval} {message}`
      );

    setInterval(() => {
      msg.channel.send(response);
    }, interval);

    msg.channel.send(
      `Set an interval for ${ms(interval, { long: true })} in this channel`
    );
  },
};
