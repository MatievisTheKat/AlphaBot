module.exports = {
  bname: "guildMemberRemove",
  run: async (client, member) => {
    const chans = member.guild.channels.cache.array();
    for (const chan of chans) {
      const msgs = await chan.messages.fetch({ limi: 100 });
      for (const msg of msgs.array()) {
        await msg.delete().catch(() => {});
      }
    }
  },
};
