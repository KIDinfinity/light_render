import { sortBy, chain } from 'lodash';

export default ({ chartList, chartListMap, renderIndex = false }: any): any => {
  const list = sortBy(
    chartList,
    (dashboardCode: string) => chartListMap?.[dashboardCode]?.sequence
  );

  if (renderIndex) {
    return {
      chartListMap: (chain(list) as any)
        .reduce(
          (listMap: any, dashboardCode: string, index: number) => ({
            ...listMap,
            [dashboardCode]: {
              ...chartListMap[dashboardCode],
              sequence: index,
            },
          }),
          {}
        )
        .value(),
      chartListAll: list,
    };
  }

  return list;
};
