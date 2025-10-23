import { find } from 'lodash';

export default (insuredName: string) => {
  const transNeed = [
    { code: '01', name: '被保険者' },
    { code: '02', name: '配偶者' },
    { code: '03', name: 'こども' },
    { code: '04', name: 'こども保険契約者' },
    { code: '05', name: '家族型配偶者' },
    { code: '06', name: '家族型こども' },
  ];
  const current = find(
    transNeed,
    (item: any) => item.name === insuredName || item.code === insuredName
  );

  return current ? current.code : insuredName;
};
