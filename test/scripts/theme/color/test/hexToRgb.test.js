const { hexToRgb } = require('../hexToRgb');

(() => {
  // const colors = [
  //   '#f6ffed',
  //   '#d9f7be',
  //   '#b7eb8f',
  //   '#95de64',
  //   '#73d13d',
  //   '#52c41a',
  //   '#389e0d'
  // ];
  const colors = [
    '#e6f7ff',
    '#bae7ff',
    '#91d5ff',
    '#69c0ff'
  ];
  colors.forEach(color => {
    const r = hexToRgb(color);
    console.log(r, 'r');
    const total = r.reduce((a, b) => Math.pow(a, 2) + Math.pow(b, 2));
    console.log('total', total);
    console.log('vv', Math.sqrt(total));
  })
})()
