import { chain, some, isEmpty } from 'lodash';
import { Status } from 'configuration/constant';

export default (versionList: any[]) =>
  chain(versionList)
    .reduce(
      (dataMap: any, item: any) => {
        const isActive = some(item?.list, (el: any) => el.status === Status.Active);
        if (isActive && isEmpty(dataMap?.defaultTimeList)) {
          return {
            ...dataMap,
            defaultVersion: item?.date,
            defaultTimeList: item?.list,
          };
        }
        return dataMap;
      },
      {
        defaultTimeList: [],
        defaultVersion: versionList?.[0]?.date,
      }
    )
    .value();
