import dmx from "../util/dmx";
import universes from "../util/stateManagement";
export default class Universe {
  // Store all the children here
  children = [];

  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.children = [];
    const { name = "default-universe", mode = "null", port } = props;
    this.addUniverse({ name, mode, port });
  }

  addUniverse = ({ name, mode = "null", port }) => {
    universes[name] = {};
    this.universe = dmx.addUniverse(name, mode, port);
    console.log("Added Universe:", name);
    /*state.universes.push({
      name,
      children: children.map(c => Object.assign({}, c.props))
    });*/
  };
  // Add children
  appendChild(child) {
    child.root = this.props.name;
    this.children.push(child);
  }

  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  renderChildren() {
    if (Array.isArray(this.children)) {
      return this.children.map(c => c.render()).reduce((prev, next) => {
        return { ...prev, [Object.keys(next)[0]]: Object.values(next)[0] };
      }, {});
    }
    return this.children.render();
  }

  render() {
    return { name: this.props.name, channels: this.renderChildren() };
  }
}
