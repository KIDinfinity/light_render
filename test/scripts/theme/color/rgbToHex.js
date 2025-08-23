const rgbToHex = (text) => {
  const rgbReg = /(background-color|color|border-color)(:)(\srgb\([0-9]{1,3},\s[0-9]{1,3},\s[0-9]{1,3}\))/ig;
  if (rgbReg.test(text)) {
    const splitResult = text.split(rgbReg);
    const r = splitResult.map(item => {
      const colorValueReg = /(rgb\()([0-9]{1,3})(,\s)([0-9]{1,3})(,\s)([0-9]{1,3})\)/
      if (colorValueReg.test(item)) {
        const colorValueSplint = item.split(colorValueReg);
        const changeResult = colorValueSplint
        .filter(i => /[0-9]{1,3}/.test(i))
        .map(i => eval(i).toString(16))
        .join('')
        return ` #${changeResult}`;
      }
      return item;
    })
    return r.join('');
  }
  return text;
}
module.exports = { rgbToHex }
