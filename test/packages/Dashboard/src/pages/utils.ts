import type { ISubmissionData, IBusinessType } from './type.d';
import Config, {
  BusinessType,
  colors,
  getActivityColors,
  HealthCheckModuleName,
  BusinessConfig,
} from './config';
import { groupBy, toUpper, orderBy, sortBy } from 'lodash';

export const delay = (ms: number): Promise<void> => {
  let timeoutId: NodeJS.Timeout | null;
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      if (timeoutId) {
        clearTimeout(timeoutId); // 清理定时器引用
      }
      timeoutId = null;
      resolve();
    }, ms);
  });
};
export const findMaxIndex = (
  arr: ISubmissionData[],
  sortIndex: number,
  _orderBy: string
): { maxIndex: number; maxOrder: number } => {
  if (arr.length === 0) {
    throw new Error('findMaxIndex Array is empty');
  }
  const newArrs = [...arr].sort((a, b) => b?.[_orderBy] - a?.[_orderBy]);
  const maxOrder = newArrs[sortIndex]?.order;
  const maxIndex = arr.findIndex((el) => el.order === maxOrder);
  return { maxIndex, maxOrder };
};

export const transferSubmissionData = (parseData: ISubmissionData) => {
  return orderBy(
    parseData.map((item: any) => ({ ...item, region: toUpper(item?.region) })),
    ['region', 'total_count'],
    ['asc', 'desc']
  ).reduce((data: any[], item: any, index: number) => {
    const exitColor = data.find((d: any) => d.color && item.region === d.region);
    const existLen = Object.keys(groupBy(data, 'region')).length;
    return data.concat([
      {
        ...item,
        region: toUpper(item.region),
        color: exitColor?.color || colors[existLen],
        order: index,
      },
    ]);
  }, []);
};

export const transferIntegrationExecutionTimeData = (parseData: ISubmissionData) => {
  function processData(data) {
    const grouped = {};
    const over30Collection = [];
    const newData = data
      .filter((item) => item.integration_code)
      .map((item) => ({
        ...item,
        name: item.response_time,
        value: item.interval_time,
      }));
    // 分组并收集 interval_time > 30 的记录
    newData.forEach((item) => {
      const key = `${item.region}_${item.integration_code}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);

      if (item.interval_time > 30) {
        over30Collection.push(item);
      }
    });

    const result = [];
    const over30Stats = {};
    let thresholdGroupsCount = 0;

    // 处理每组数据
    for (const key in grouped) {
      const items = grouped[key];
      const countAbove30 = items.filter((item) => item.interval_time > 30).length;
      const isAboveThreshold = countAbove30 >= 20;

      if (isAboveThreshold) {
        thresholdGroupsCount += 1;
      }

      // 按 response_time 正序排序
      items.sort((a, b) => new Date(a.response_time) - new Date(b.response_time));

      result.push({
        region: items[0].region,
        integration_code: items[0].integration_code,
        count_above_30: countAbove30,
        is_above_threshold: isAboveThreshold,
        items: items,
      });
    }

    // 构建 over30 的统计集合
    over30Collection.forEach((item) => {
      const key = `${item.region}_${item.integration_code}`;
      if (!over30Stats[key]) {
        over30Stats[key] = {
          region: item.region,
          integration_code: item.integration_code,
          count: 0,
          items: [],
        };
      }
      over30Stats[key].count += 1;
      over30Stats[key].items.push(item);
    });

    // 转换为数组并按 count 降序排序
    const over30Sorted = Object.values(over30Stats).sort((a, b) => b.count - a.count);

    return [
      ...(result || []).sort((a, b) => b.count_above_30 - a.count_above_30),
      ...(over30Sorted || []).map((item) => ({
        ...item,
        originRegion: item.region,
        region: 'Disconnected',
      })),
    ];
  }

  return processData(parseData);
};

export const getBusinessType = (businessType: IBusinessType): any => {
  const upperBusinessType = toUpper(businessType);
  if (BusinessType[upperBusinessType]) {
    return BusinessType[upperBusinessType];
  }
  return BusinessType.NB;
};

export const prepareInprogressData = (
  inTarget: any,
  businessType: IBusinessType,
  region: string
) => {
  const allActivityKeyss = Object.keys(
    BusinessConfig?.[businessType]?.getActivityKeys?.(region) || {}
  );
  const inTargetMap: any = groupBy(inTarget, 'current_activity_key');
  const completedInTarget = allActivityKeyss.map((activityKey: any) => {
    const item = inTargetMap[activityKey]?.[0];
    return (
      item || {
        current_activity_key: activityKey,
        total_count: 0,
      }
    );
  });
  return completedInTarget;
};

export const getHealthCheckDatas = ({ businessType, ...monitorDatas }: any) => {
  return Object.values(HealthCheckModuleName).reduce((data: any, moduleName: string) => {
    const moduleData = monitorDatas[moduleName] || [];

    if (moduleName === HealthCheckModuleName.SysConnect) {
      const disConnect = moduleData.filter((item: any) => item?.status !== 'S')?.length;
      const groupDatas = moduleData.reduce((acc: any, item: any) => {
        const region = toUpper(item?.regionCode || item?.region);
        const datas = orderBy(
          (acc[region]?.datas || []).concat([{ ...item, region }]),
          ['status', 'category', 'system_code'],
          ['asc']
        );
        return {
          ...acc,
          [region]: {
            datas,
            region,
            total: datas.filter((el: any) => el?.status !== 'S')?.length,
          },
        };
      }, {});

      const newGroupDatas = {
        ...groupDatas,
        ...(disConnect > 0
          ? {
              Disconnected: {
                region: 'Disconnected',
                // datas sort by total for each region
                datas: orderBy(
                  Object.values(groupDatas),
                  ['total', 'region'],
                  ['desc', 'asc']
                ).reduce(
                  (_data: any, item: any) =>
                    _data.concat(item?.datas.filter((el: any) => !/S/i.test(el?.status))),
                  []
                ),
                total: disConnect,
              },
            }
          : {}),
      };

      return data.concat({
        category: moduleName,
        total: disConnect,
        status: disConnect > 0 ? 'Critical' : 'Healthy',
        groupDatas: newGroupDatas,
        connectDatas: orderBy(Object.values(newGroupDatas), ['total', 'region'], ['desc', 'asc']),
      });
    }
    const priorityOrder = ['Critical', 'Warning', 'Healthy'];
    const { total, isCritical, isWarning } = moduleData.reduce(
      (acc: any, item: any) => {
        return {
          total: acc.total + (item?.total_count || 0),
          isCritical: acc.isCritical || /Critical/i.test(item?.fail_level),
          isWarning: acc.isWarning || /Warning/i.test(item?.fail_level),
        };
      },
      { total: 0, isCritical: false, isWarning: false }
    );
    const groupDatas = groupBy(moduleData, 'region') || {};
    const datas = orderBy(
      Object.values(groupDatas).map((item: any) => ({
        region: item?.[0]?.region,
        total: item?.reduce((acc: number, el: any) => acc + (el?.total_count || 0), 0),
      })),
      ['total', 'region'],
      ['desc', 'asc']
    );
    const fields = datas?.map((item) => item?.region);
    return data
      .concat({
        category: moduleName,
        total,
        status: isCritical ? 'Critical' : isWarning ? 'Warning' : 'Healthy',
        groupDatas,
        chartDatas: {
          data: datas.map((item: any) => {
            return {
              value: item.total,
              name: item.region,
            };
          }),
          fields,
          colors: getActivityColors([], businessType, ''),
          name: 'name',
          x: 'current_activity_key',
        },
      })
      .sort((a, b) => {
        return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
      });
  }, []);
};

const toUpperRegion = (datas: any[]) => {
  return (
    datas?.map((item: any) => ({
      ...item,
      region: toUpper(item?.region),
    })) || []
  );
};

export const getChartDatas = ({ businessType, ...resProps }: any) => {
  if (businessType === BusinessType.HEALTHCHECK) {
    return getHealthCheckDatas({ ...resProps, businessType });
  }
  const { submission, underwriting, inprogress } = resProps;
  if (!underwriting?.length || !inprogress?.length) {
    return [];
  }
  const uwMap = groupBy(toUpperRegion(underwriting), 'region');
  const inMap = groupBy(toUpperRegion(inprogress), 'region');
  const subMap = groupBy(toUpperRegion(submission), 'region');
  const datas = orderBy(
    Object.keys(inMap).reduce((data: any, key: string) => {
      const inTarget = prepareInprogressData(inMap[key], businessType, key);
      const uwTarget = uwMap[key];
      const subTarget = subMap[toUpper(key)];
      const policyCount = subTarget?.reduce(
        (acc: number, item: any) => acc + item?.total_count || 0,
        0
      );
      const region = (Config as any)?.[toUpper(key)]?.title || toUpper(key);
      const fields = inTarget.map((item: any) => item.current_activity_key);
      return data.concat({
        region,
        policyCount,
        chartDatas: [
          {
            data: inTarget.map((item: any) => ({
              value: item.total_count,
              name: item.current_activity_key,
            })),
            fields,
            colors: getActivityColors(fields, businessType, region),
            name: 'name',
            x: 'current_activity_key',
          },
          {
            data: uwTarget
              ?.filter((item: any) => item.total_count)
              ?.map((item: any) => ({
                value: item.total_count || 0,
                status: item.status || item.STATUS || '',
              })),
            fields: [],
            name: 'status',
          },
        ],
      });
    }, []),
    ['policyCount', 'region'],
    ['desc', 'asc']
  );
  return datas;
};
