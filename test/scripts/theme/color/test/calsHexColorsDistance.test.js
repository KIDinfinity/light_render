const { calcHexColorsDistance } = require('../calcHexColorsDistance');

describe('test hex distance', () => {
  test('distance', () => {
    const distance = calcHexColorsDistance('#ffffff', '#000000');
    console.log('distance', distance);
    expect(distance).toBe(442);
  })
})
