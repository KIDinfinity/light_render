import lodash from 'lodash';

const hasOwn = Object.prototype.hasOwnProperty;

function is(x: any, y: any) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
}

function shallowEqualNative(objA: any, objB: any) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

const dataItemKeys = [
  'bankAccountItem',
  'payeeItem',
  'contactItem',
  'payeeItem',
  'beneficiaryItem',
  'benefitItem',
  'policyItem',
];

const exceptArray = (data: any) => {
  return lodash.reduce(
    data,
    (collect: any, val: any, key: string) => {
      const output = { ...collect };
      if (lodash.isArray(val)) {
        output[key] = null;
      } else {
        output[key] = val;
      }

      return output;
    },
    {}
  );
};

const compareData = (objA: any, objB: any) => {
  const propsKeys = lodash.keys(objA);
  const intersetionKey = lodash.intersection(dataItemKeys, propsKeys)[0];
  if (!lodash.isString(intersetionKey)) return true;

  return !lodash.isEqual(exceptArray(objA[intersetionKey]), exceptArray(objB[intersetionKey]));
};

export default function shallowEqual(objA: any, objB: any) {
  const { validating: validatingA } = objA;
  const { validating: validatingB } = objB;

  return !validatingB && !validatingA && compareData(objA, objB) && shallowEqualNative(objA, objB);
}
