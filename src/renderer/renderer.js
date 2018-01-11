import ReactDMX from "./reconciler";
import parse from "./parse";
import { createElement } from "./createElement";
import dmx from '../util/dmx';

async function render(element) {
  // Create root container instance
  const container = createElement("ROOT");

  // Returns the current fiber (flushed fiber)
  const node = ReactDMX.createContainer(container);

  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  ReactDMX.updateContainer(element, node, null);

  // Parse the input component and return the output
  const output = parse(container);

  await new Promise((resolve, reject) => {
    // Update the DMX universes
    try {
      output.forEach(u => {
        dmx.update(u.name, u.channels);
      });      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export default render;
