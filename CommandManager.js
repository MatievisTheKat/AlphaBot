const { findNested } = require("./Util");
const { Collection } = require("discord.js");

module.exports = class CommandManager {
  constructor(database) {
    this.commands = new Collection();
    this.database = database;
  }

  load() {
    const files = findNested("./commands/", ".js");
    for (const file of files) {
      const cmd = require(file);
      if (!cmd.run || !cmd.name) continue;

      this.commands.set(cmd.name, cmd);
    }

    this.loadCustomCommands();
  }

  async loadCustomCommands() {
    const cmds = await this.database.all();
    for (const cmd of cmds) {
      this.commands.set(cmd.key, cmd.value);
    }
  }
};
