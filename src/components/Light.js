export default class Light {
  constructor(props) {
    this.props = props;
    this.children = [];
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
