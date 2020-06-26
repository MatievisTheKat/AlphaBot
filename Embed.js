const { MessageEmbed } = require("discord.js");

module.exports = class Embed extends MessageEmbed {
  constructor(...args) {
    super(...args);

    this.color = "BLUE";
  }
};
