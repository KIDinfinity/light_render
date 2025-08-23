import { tenant } from '@/components/Tenant';
import { SS, SSKey } from '@/utils/cache';

export default ({ taskDefKey, caseCategory }: any) => {
  const regionCode = tenant.region();
  const ELEMENT_CONFIG_MAP = `${SSKey.ELEMENT_CONFIG_MAP}_${caseCategory}_${taskDefKey}_${regionCode}`;

  const localConfig = SS.getItem(ELEMENT_CONFIG_MAP, true);

  console.log('localConfig111', localConfig);

  // const newMap = lodash
  //   .chain(localConfig)
  //   .reduce((obj: any, item: any) => {
  //     const hasObj = lodash.includes(lodash.keys(obj), item.section);

  //     return {
  //       ...obj,
  //       [item.section]: hasObj ? [...obj, item] : [item],
  //     };
  //   }, {})
  //   .value();
  // console.log('newMap', newMap);
};
