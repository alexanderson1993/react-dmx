import Root from "../components/Root";
import Universe from "../components/Universe";
import Light from "../components/Light";

function createElement(type, props = {}) {
  const COMPONENTS = {
    ROOT: () => new Root(),
    light: () => new Light(props),
    universe: () => new Universe(null, props),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement };
