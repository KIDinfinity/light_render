import lodash from 'lodash';
import { useSelector } from 'umi';

const handleData = ({ list, filterCallBack }: any) => {
  return lodash
    .chain(list)
    .filter(filterCallBack)
    .flatMap((item: any) => {
      return lodash.flatMap(item?.informationList, (informationItem: any) => {
        const { informationDOList, ...rest } = informationItem;
        return informationDOList.map((informationDOItem: any) => ({
          ...informationDOItem,
          informationItem: rest,
        }));
      });
    })
    .orderBy('gmtCreate', 'desc')
    .value();
};

export default function ({ infoGroupCode, infoCategoryCode }: Record<string, string>) {
  const { infoHistory, informationGroups } = useSelector((state) => state.infoController);

  switch (true) {
    case !!infoCategoryCode: {
      return handleData({
        list: infoHistory,
        filterCallBack: (i: any) =>
          lodash.toUpper(i.categoryCode) === lodash.toUpper(infoCategoryCode),
      });
    }

    case !!infoGroupCode: {
      const infoCategoryCodes = informationGroups[infoGroupCode]?.caseCategorylist?.map((i) =>
        lodash.toUpper(i.infoCategoryCode)
      );

      return handleData({
        list: infoHistory,
        filterCallBack: (i: any) =>
          lodash.includes(infoCategoryCodes, lodash.toUpper(i.categoryCode)),
      });
    }
    default: {
      return [];
    }
  }

  if (!!infoGroupCode) {
    const infoCategoryCodes = informationGroups[infoGroupCode]?.caseCategorylist?.map(
      (i) => i.infoCategoryCode
    );

    return lodash
      .chain(infoHistory)
      .filter((i) => lodash.includes(infoCategoryCodes, i.categoryCode))
      .reduce((res, i) => lodash.concat(res, i.informationList), [])
      .value();
  }

  return [];
}
