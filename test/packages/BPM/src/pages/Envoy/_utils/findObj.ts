import lodash from 'lodash';

const findObj = (obj: any, key: string) => {
  let target = {};
  const fn = (obj: any, key: string) => {
    if (lodash.includes(lodash.keys(obj), key)) {
      target = lodash.get(obj, key);
    } else {
      const notEmptyObjArr = lodash.filter(
        lodash.values(obj),
        (item: any) => !lodash.isEmpty(item) && lodash.isPlainObject(item)
      );
      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = notEmptyObjArr.length; i < len; i++) {
        if (!lodash.isEmpty(target)) {
          break;
        }
        fn(notEmptyObjArr[i], key);
      }
    }
  };
  fn(obj, key);
  return target;
};

export default findObj;
