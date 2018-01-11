import universeChannels from './universeChannels';
import dmx from './dmx';
 /* Since React-DMX doesn't have a DOM to compare the
    virtual DOM against, there needs to be some kind
    of State Management. That's what this file is for
  */
class State {
  constructor() {
    this.universes = [];
    this.triggerDMXUpdate();
  }
  triggerDMXUpdate = () => {
    const channels = universeChannels(this.universes);
    channels.forEach(u => {
      dmx.update(u.name, u.channels);
    });
    setTimeout(this.triggerDMXUpdate, 23);
  }
  updateUniverse = (universe, { channel, intensity }) => {
    const updatedUniverses = this.universes.map(u => {
      if (u.name === universe) {
        u.children = u.children.map(c => {
          if (c.channel === channel) {
            return { channel, intensity };
          }
          return c;
        });
      }
      return u;
    });
    this.universes = updatedUniverses;
  }
}

export default new State();
