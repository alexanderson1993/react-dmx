export default class Light {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    const { channel, intensity } = props;
    if (state.universes[0]) {
      state.updateUniverse(state.universes[0].name, { channel, intensity });
    }
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  render() {
    const { channel, intensity } = this.props;
    return { [channel]: Math.round(intensity * 255) };
  }
}
