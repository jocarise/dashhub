//External Library
enum TEMPERATURES {
  FARENHEIT = 'F',
  CELSIUS = 'C',
}

const emitTemperatureTypeChange = (type: TEMPERATURES) => {
  const event = new CustomEvent('onTemperatureChange', {
    detail: { type },
  });
  window.dispatchEvent(event);
};

export { emitTemperatureTypeChange, TEMPERATURES };
