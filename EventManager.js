const { findNested } = require("./Util");

module.exports = class EventManager {
  constructor(client) {
    this._client = client;
  }

  load() {
    const files = findNested("./events/", ".js");
    for (const file of files) {
      const evnt = require(file);
      if (!evnt || !evnt.run || !evnt.name) continue;

      this._client.on(evnt.name, evnt.run.bind(null, this._client));
    }
  }
};
