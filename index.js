const { Client } = require("discord.js");
const Endb = require("endb");
const CommandManager = require("./CommandManager");
const EventManager = require("./EventManager");
const Embed = require("./Embed");
const config = require("./config");

class Bot extends Client {
  constructor(args) {
    super(args);

    this.prefix = config.bot_prefix;
    this.token = config.bot_token;
    this.config = config;

    this.money = new Endb({
      uri: "sqlite://database/money.sqlite",
    });
    this.cc = new Endb({
      uri: "sqlite://database/custom-commands.sqlite",
    });

    this.cmd = new CommandManager(this.cc);
    this.evnt = new EventManager(this);
    this.embed = Embed;
  }

  init() {
    this.cmd.load();
    this.evnt.load();
    this.login(this.token);
  }
}

new Bot().init();

module.exports = {
  apps: [
    {
      name: "alpha-bot",
      script: "./index.js",
      watching: ["./index.js"],
    },
  ],
};
