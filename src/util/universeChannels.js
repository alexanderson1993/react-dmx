export default function universeChannels(universes) {
  return universes.map(({ name, children }) => ({
    name,
    channels: children.reduce(
      (prev, { channel, intensity }) =>
        Object.assign(prev, { [channel]: Math.round(intensity * 255) }),
      {}
    )
  }));
}
