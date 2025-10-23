// 随机色
const getRandomColor = () => {
  const colorArray = ['#6ECEB2', '#0097A9', '#FED141', '#B6E6D8', '#7FCBD4'];
  const idx = Math.floor(Math.random() * colorArray.length);

  return colorArray[idx];
};

export default getRandomColor;
