import dmx from "../util/dmx";
import state from "../util/stateManagement";
import Universe from "./Universe";

export default class Root {
  children = [];
  addUniverse = ({ name, mode = "null", port, children }) => {
    const universe = dmx.addUniverse(name, mode, port);
    console.log("Added Universe:", name);
    state.universes.push({
      name,
      children: children.map(c => Object.assign({}, c.props))
    });
  };
  appendChild(child) {
    this.children.push(child);
    if (child instanceof Universe) {
      const { name = "default-universe", mode = "null", port } = child.props;
      this.addUniverse({ name, mode, port, children: child.children });
    }
  }
  render() {
    return state.universes;
  }
}
