import dmx from "./dmx";
import universes from "./stateManagement";

const triggerDMXUpdate = () => {
  Object.keys(universes).forEach(u => {
    dmx.update(u, universes[u]);
  });
  setTimeout(triggerDMXUpdate, 23);
};

triggerDMXUpdate();
