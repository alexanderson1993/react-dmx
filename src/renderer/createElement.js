import Root from '../components/Root';
import Universe from '../components/Universe';
import Light from '../components/Light';
import state from '../util/stateManagement';

function createElement(type, props = {}) {
  const COMPONENTS = {
    ROOT: () => new Root(),
    light: () => new Light((state.universes.length > 0) ? state.universes[0].name : null, props),
    universe: () => new Universe(null, props),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement
};
