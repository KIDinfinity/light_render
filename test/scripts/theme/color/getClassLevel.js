const getClassLevel = (className) => {
  const reg = /(\n)([\s]{0,})(\.\w*$)/;
  const result = className.split(reg);
  const nameIndex = result.findIndex(text => /\.\w*$/.test(text));
  const blankStringReg = /^\s{0,}$/;
  const blankString = result[nameIndex - 1];
  const level = Math.max((blankStringReg.test(blankString) && blankString.length), 1)
  return level;
}

module.exports = { getClassLevel };
