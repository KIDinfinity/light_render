import lodash from 'lodash';

export const handleRowCombine = (dataSource: any[], key = 'benefitType') => {
  if (dataSource?.length < 1) return [];
  const arr: any[] = [...dataSource];

  let firstItem: any = arr[0];
  firstItem.rowSpan = 1;

  arr.forEach((item: any, index) => {
    const nextItem: any = arr[index + 1] || {};
    if (item[key] === nextItem[key]) {
      firstItem.rowSpan++;
    } else {
      firstItem = nextItem;
      firstItem.rowSpan = 1;
    }
  });

  return arr;
};

// 2nd table sort config
export const ASLSortArr = ['LIFE', 'TPD', 'ADD', 'CI', 'CANCER'];

// 1st table sort config
export const nonASLSortArr = ['FIN', 'LIFEABL', 'MED', 'MAX_PER_LIFE_BASE', 'MAX_PER_LIFE'];

export const LifeSubTypeOrder = ['IL', 'UL', 'CL', 'PB'];

export const TPDSubTypeOrder = ['TPD', 'WOP'];

export const ADDSubTypeOrder = ['ADD', 'ADB', 'RCC'];

export const CISubTypeOrder = ['CI', 'SCI', 'ESCI'];

export const getIndexOf = (arr: string[], v: string) => {
  let itemIndex = -1;
  arr.forEach((item, index) => {
    if (v.includes(item)) {
      itemIndex = index;
    }
  });

  return itemIndex;
};

/**
 * Sort table data by benefitSubType
 * @param curr
 * @param next
 * @param key
 * @returns
 */
const subTypeOrder = (curr: any, next: any, key: string) => {
  switch (curr[key].toUpperCase()) {
    case 'LIFE':
      return (
        getIndexOf(LifeSubTypeOrder, curr.benefitSubType?.toUpperCase()) -
        getIndexOf(LifeSubTypeOrder, next.benefitSubType?.toUpperCase())
      );
    case 'TPD':
      return (
        getIndexOf(TPDSubTypeOrder, curr.benefitSubType?.toUpperCase()) -
        getIndexOf(TPDSubTypeOrder, next.benefitSubType?.toUpperCase())
      );
    case 'ADD':
      return (
        getIndexOf(ADDSubTypeOrder, curr.benefitSubType?.toUpperCase()) -
        getIndexOf(ADDSubTypeOrder, next.benefitSubType?.toUpperCase())
      );
    case 'CI':
      return (
        getIndexOf(CISubTypeOrder, curr.benefitSubType?.toUpperCase()) -
        getIndexOf(CISubTypeOrder, next.benefitSubType?.toUpperCase())
      );
    default:
      return 0;
  }
};

/**
 * Sort data array by local config
 * @param baseArr
 * @param filterArr
 * @param key
 * @returns
 */
export const localSortProcess = (baseArr: any[], filterArr: any[], key: string) => {
  const pendingSortArr = baseArr.filter((i: any) => filterArr.includes(i?.[key]?.toUpperCase()));
  const nonSortArr = baseArr.filter((i: any) => !filterArr.includes(i?.[key]?.toUpperCase()));
  return pendingSortArr
    .sort((a: any, b: any) => {
      const firstOrder = filterArr.indexOf(a[key]) - filterArr.indexOf(b[key]);

      return firstOrder === 0
        ? subTypeOrder(a, b, key)
        : filterArr.indexOf(a[key]) - filterArr.indexOf(b[key]);
    })
    .concat(nonSortArr);
};

export const sortProcessV2 = (baseArr: any[]) => {
  return baseArr.sort((a: any, b: any) => Number(a?.order) - Number(b?.order));
};

/**
 * Sort table data via benefitType, combine row data when need
 * @param dataSource original data array
 * @param filterArr sort config array
 * @param key sorting key
 * @param isComplexGrid boolean or do not fill in when not need
 * @returns TableData[]
 */
export const dataPreProcess = (
  dataSource: any[],
  filterArr: string[],
  key: string,
  isComplexGrid?: boolean
) => {
  if (!dataSource || dataSource.length < 1) {
    return [];
  }

  let newArr = JSON.parse(JSON.stringify(dataSource));
  // check if order param exist
  const noOrder = lodash.every(newArr, (i) => lodash.isNil(i?.order));
  newArr = noOrder ? localSortProcess(newArr, filterArr, key) : sortProcessV2(newArr);

  if (!isComplexGrid) return newArr;

  return handleRowCombine(newArr);
};
