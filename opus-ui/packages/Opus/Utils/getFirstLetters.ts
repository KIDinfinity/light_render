// 截取单词首字母
const getFirstLetters = (str: string) => {
  if (!str) {
    return '';
  }
  const name = str
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase();
    })
    .join('');
  return name.length > 2 ? name.charAt(0) + name.charAt(name.length - 1) : name;
};

export default getFirstLetters;
