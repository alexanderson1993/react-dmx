import React, { Component } from "react";
import render from "../renderer/renderer";
import colorParse from "color";
class Pulse extends Component {
  state = { intensity: 0 };
  looping = true;
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop = () => {
    if (this.looping) {
      setTimeout(this.loop, 23);
      this.setState({
        intensity: Math.abs(
          Math.sin((Math.round(Date.now() / 10) % 360) * (1 / 180 * Math.PI))
        )
      });
    }
  };
  render() {
    return (
      <RGBLight intensity={this.state.intensity} red={0} green={1} blue={2} />
    );
  }
}

class Disco extends Component {
  state = { r: 0, g: 0, b: 0 };
  looping = true;
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop = () => {
    if (this.looping) {
      setTimeout(this.loop, 100);
      this.setState({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
      });
    }
  };
  render() {
    return (
      <RGBLight
        color={this.state}
        intensity={1}
        red={0}
        green={1}
        blue={2}
      />
    );
  }
}
class Strobe extends Component {
  state = { intensity: 0 };
  looping = true;
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop = () => {
    if (this.looping) {
      setTimeout(this.loop, 500);
      this.setState({
        intensity: this.state.intensity === 0 ? 1 : 0
      });
    }
  };
  render() {
    return (
      <RGBLight intensity={this.state.intensity} red={0} green={1} blue={2} />
    );
  }
}

class Demo extends Component {
  state = { which: 1 };
  looping = true;
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop = () => {
    if (this.looping) {
      setTimeout(this.loop, 1000 * 5);
      this.setState({
        which: this.state.which === 0 ? 1 : 0
      });
    }
  };
  render() {
    if (this.state.which === 0) return <Disco />;
    return <Pulse />;
  }
}
const RGBLight = ({
  color = "rebeccapurple",
  intensity = 1,
  red,
  green,
  blue
}) => {
  const [redPart, greenPart, bluePart] = colorParse(color).color;
  return [
    <light
      key={`channel-${red}`}
      channel={red}
      intensity={intensity * (redPart / 255)}
    />,
    <light
      key={`channel-${green}`}
      channel={green}
      intensity={intensity * (greenPart / 255)}
    />,
    <light
      key={`channel-${blue}`}
      channel={blue}
      intensity={intensity * (bluePart / 255)}
    />
  ];
};

render(
  <universe
    name="universe-1"
    mode="enttec-usb-dmx-pro"
    port="/dev/cu.usbserial-A7XSB63S"
  >
    <Demo />
    <RGBLight intensity={Math.random()} red={3} green={4} blue={5} />
  </universe>
);
