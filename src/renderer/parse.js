import universeChannels from '../util/universeChannels';

const parse = input => {
  function parseComponent(inputComponent) {
    const universe = inputComponent;
    // Render all the children and props
    return universeChannels(universe.render());
  }

  return parseComponent(input);
};

export default parse;
