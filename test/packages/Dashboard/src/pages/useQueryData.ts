import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { centerProductionMonitor } from '@/services/monitorCenterControllerService';
import { isEmpty, some, orderBy as _orderBy, filter } from 'lodash';
import useTimer from './useTimer';
import {
  delay,
  getBusinessType,
  transferSubmissionData,
  getChartDatas,
  transferIntegrationExecutionTimeData,
} from './utils';
import { notification } from 'antd';
import { useParams } from 'umi';
import {
  BusinessType,
  BusinessConfig,
  ModuleName,
  defaultState,
  defaultLoadingState,
  BusinessArrays,
} from './config';
import type {
  ISubmissionData,
  ILoadingState,
  IMonitorDatas,
  IErrorMessage,
  IErrorResponse,
  IBusinessType,
  ICountType,
} from './type.d';

const searchParams = new URL(document.location as any).searchParams;

// loading去掉， 一次性重置

/**
 * sort logic
 * 1. submission sort by [region, total_count] as default , sort by total_count and stp_rate every xx ssecond
 * 2. inprogress sort by [total_count, region]
 */

const defaultConf = {
  isMock: 0, // 是否使用mock数据, 0 = false, 1 = true
  reCallAPI: 10 * 60, //10 * 60, // 10 min 定时刷新数据 , 用于单独业务页面 /nb /claim
  autoScroll: 10, // 定时右侧滚动
  orderChangeDelay: 10, // 动画执行完后，等待10s切换orderBy
  startSortAnimation: 5, // 初始，或切换完orderBy后，等待多少s执行动画
  changeBusinessType: 30, // 30s 自动切换业务类型 claim, nb, pos
  reCallAPITypeChange: 20, // 切换多少次的时候call接口刷新数据, 20 * 30 = 10分钟
  sysConnectRegionChange: 5, // sysConnect 5s 切换一次region
  followUpScroll: 10, // follow Up 自动滚动
};

export const TimerConf = Object.keys(defaultConf).reduce(
  (acc: any, key: any) => ({
    ...acc,
    [key]: Number(searchParams.get(key) || (defaultConf as any)?.[key] || 0),
  }),
  {} as Record<string, number>
);

enum ORDERBY {
  total_count = 'total_count',
  stp_rate = 'stp_rate',
}

export default () => {
  const params: any = useParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeSortRef = useRef<NodeJS.Timeout | null>(null);
  const currentDatasRef = useRef<any>(null);
  const isAnimating = useRef(false);
  const abortControllersRef = useRef<Record<string, AbortController>>({});
  const [orderBy, setOrderBy] = useState<string>(ORDERBY.total_count); // total_count , stp_rate
  const [loading, setLoading] = useState<ILoadingState>(defaultLoadingState);
  const [monitorDatas, setMonitorDatas] = useState<IMonitorDatas>(defaultState);
  const [businessType, setBusinessType] = useState<IBusinessType>(
    getBusinessType(params?.businessType)
  );
  const [countType, setCountType] = useState<ICountType>({ [businessType]: 1 });
  const [errorMessage, setErrorMessage] = useState<IErrorMessage>(defaultState);
  const currBusinessTypeRef = useRef(businessType);
  const nextBusinessTypeRef = useRef(businessType);
  const submissionRef = useRef<ISubmissionData[]>([]);
  const currentLoading: any = loading?.[businessType] || {};
  const isHealthCheck = businessType === BusinessType.HEALTHCHECK;

  const currentDatas: any = useMemo(
    () => monitorDatas?.[businessType],
    [monitorDatas, businessType]
  );
  const submission: IBusinessType[] | any = useMemo(
    () => currentDatas[ModuleName.Submission] || [],
    [currentDatas]
  );
  useEffect(() => {
    currentDatasRef.current = currentDatas;
  }, [currentDatas]);

  const updateState = useCallback(
    (moduleName: string, setData: any, data: any, type: IBusinessType = businessType) => {
      setData((prevData: any) => ({
        ...prevData,
        [type]: {
          ...prevData[type],
          [moduleName]: data,
        },
      }));
    },
    [businessType]
  );

  useEffect(() => {
    // @ts-ignore
    submissionRef.current = submission;
  }, [submission]);

  useEffect(() => {
    const businessTypes = BusinessArrays;
    const nextIndex = (businessTypes.indexOf(businessType) + 1) % businessTypes.length;
    const newBusinessType = businessTypes[nextIndex] as IBusinessType;
    currBusinessTypeRef.current = businessType;
    nextBusinessTypeRef.current = newBusinessType;
  }, [businessType]);

  const queryMonitor = useCallback(
    async (moduleName: string, type: IBusinessType = businessType) => {
      // 如果有上一次的 controller，先 abort
      abortControllersRef.current[moduleName]?.abort();

      console.log('queryMonitor', { moduleName, type });
      const controller = new AbortController();
      abortControllersRef.current[moduleName] = controller;
      const signal = controller.signal;
      updateState(moduleName, setLoading, true, type);
      updateState(moduleName, setErrorMessage, null, type);

      await delay(3000);
      const monitorCategory = BusinessConfig?.[type]?.MonitorCode?.[moduleName];
      const firstLoad = !currentDatasRef?.current?.[moduleName];
      const response =
        TimerConf.isMock && !(BusinessConfig[type] as any)?.skipMock?.[moduleName]
          ? (BusinessConfig[type].mockData as any)?.[monitorCategory]
          : await centerProductionMonitor(
              {
                monitorCategory: monitorCategory,
              },
              {
                signal,
                useRegionHeader: true,
              }
            );

      if (response && response.success) {
        let parseData = response?.responseData?.dataList || [];
        if (/monitor_submission/.test(monitorCategory)) {
          parseData = transferSubmissionData(parseData);
          isAnimating.current = true;
        }
        if (/monitor_sysConnect_sum/.test(monitorCategory)) {
          parseData = filter(parseData, (item) => item.integration_code);
        }
        if (/monitor_integration_executionTime_sum/.test(monitorCategory)) {
          parseData = transferIntegrationExecutionTimeData(parseData);
        }
        updateState(moduleName, setMonitorDatas, parseData, type);
        updateState(moduleName, setLoading, false, type);
      } else {
        console.error(`Get ${monitorCategory} error:`, response);
        updateState(moduleName, setLoading, false, type);
        if (firstLoad) {
          const errors = !isEmpty(response)
            ? response
            : {
                messageList: [
                  {
                    content: `Failed to call ${monitorCategory}`,
                  },
                ],
              };
          updateState(moduleName, setErrorMessage, errors, type);
        } else if (response?.messageList?.[0]?.content) {
          notification.error({
            message: response?.messageList?.[0]?.content,
          });
        }
      }
    },
    [businessType]
  );

  const queryData = (type: IBusinessType = businessType) => {
    isAnimating.current = false;
    Object.keys(BusinessConfig?.[type]?.MonitorCode || {}).forEach((moduleName) => {
      queryMonitor(moduleName, type);
    });
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (timeSortRef.current) {
      clearTimeout(timeSortRef.current);
      timeSortRef.current = null;
    }
  };

  useEffect(() => {
    // 当切换type的时候，如果当前已经有数据，不需要call, 而是等待
    // 初始是1， 所以等到下个1的时候刷新数据
    if ((countType?.[currBusinessTypeRef.current] || 1) % TimerConf.reCallAPITypeChange === 1) {
      queryData(currBusinessTypeRef.current);
    }
  }, [countType]);

  const autoSwichBusinessType = useCallback(async () => {
    if (currBusinessTypeRef.current === nextBusinessTypeRef.current) {
      console.log('No need to switch business type');
      return;
    }
    resetTimer();

    if (currBusinessTypeRef.current === BusinessType.HEALTHCHECK) {
      document.getElementsByClassName('animate-overall')?.[0]?.classList?.add('hide-overall');
      document.getElementsByClassName('animate-followUp')?.[0]?.classList?.add('hide-followUp');
      document.getElementsByClassName('animate-sysConnect')?.[0]?.classList?.add('hide-sysConnect');
    } else {
      const chartItems = document.getElementsByClassName('chart-item');
      Array.from(chartItems).forEach((el) => {
        el.classList.add('hideChart');
      });
      document.getElementsByClassName('submission-container')?.[0]?.classList?.add('hideContainer');
    }

    await delay(600);
    setBusinessType(nextBusinessTypeRef.current);

    setCountType((prevCountType) => ({
      ...prevCountType,
      [nextBusinessTypeRef.current]: (prevCountType?.[nextBusinessTypeRef.current] || 0) + 1,
    }));
  }, []);

  // 重新取数由切换bisunessType, /nb 的时候不切tab，才定时取数
  useTimer(queryData, { frequency: TimerConf.reCallAPI, base: 'sec', off: !params?.businessType });

  // 定时更新businessType, 关掉定时挂在触发，应该是数据加载后再触发定时
  const { startTimer: startAutoType, clearTimer: resetAutoType }: any = useTimer(
    autoSwichBusinessType,
    {
      frequency: TimerConf.changeBusinessType,
      base: 'sec',
      off: true, // 关闭挂载定时，需要数据显示后再手动开启
    }
  );

  const chartDatas = useMemo(
    () => getChartDatas({ ...currentDatas, businessType }),
    [currentDatas, businessType]
  );

  const sortAnimation = useCallback(() => {
    const submissionsCopy = [...submissionRef.current] as ISubmissionData[];
    if (submissionsCopy.length < 4 || !isAnimating.current) {
      resetTimer();
      return;
    }

    const sortStep = async () => {
      if (!isAnimating.current) return;
      const submissionBox = document.getElementsByClassName('chart-submissionBox');
      const newList = _orderBy(
        Array.from(submissionBox).map((doc: any) => ({
          doc,
          dataset: {
            ...doc.dataset,
            [orderBy]: Number(doc?.dataset?.[orderBy] || 0),
          },
        })),
        [`dataset.${orderBy}`, 'dataset.region'],
        ['desc', 'asc']
      );
      newList.forEach((item: any, index: number) => {
        if (!isAnimating.current) return;
        item.doc.style.setProperty('--order', index.toString());
      });
      await delay(TimerConf.orderChangeDelay * 1000);
      setOrderBy(orderBy === ORDERBY.stp_rate ? ORDERBY.total_count : ORDERBY.stp_rate);
    };
    sortStep();
  }, [orderBy, resetTimer, updateState, submissionRef.current, currBusinessTypeRef.current]);

  useEffect(() => {
    let isMounted = true;
    // 加载完，全部有数据，显示出来才做动画
    if (!isMounted || !isAnimating.current || !submission.length || !chartDatas.length) {
      resetTimer();
      return;
    }
    resetTimer();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timeSortRef.current) clearTimeout(timeSortRef.current);

    // 开启左边submission动画
    timeoutRef.current = setTimeout(() => {
      sortAnimation();
    }, TimerConf.startSortAnimation * 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAnimating.current, submission.length, chartDatas.length, orderBy]);

  // start switch type
  useEffect(() => {
    // 没数据（没显示出来，不要倒计时）
    if ((!submission.length && businessType !== BusinessType.HEALTHCHECK) || !chartDatas.length) {
      resetAutoType();
      return;
    }

    // /dashboard 才切type，切type后重新计时
    if (!params?.businessType) {
      startAutoType();
    }
  }, [businessType, submission.length, chartDatas.length]);

  const isLoading = useMemo(
    () => some(Object.values(currentLoading), (item) => !!item),
    [currentLoading]
  );

  const isSomeEmptyDatas = useMemo(() => {
    return (
      isEmpty(currentDatas) ||
      Object.keys(currentLoading).some(
        (key: any) =>
          isEmpty(currentDatas?.[key]) ||
          (Array.isArray(currentDatas?.[key]) && currentDatas?.[key].length === 0)
      )
    );
  }, [currentDatas, currentLoading]);

  const errors = useMemo(() => {
    return Object.values(errorMessage?.[businessType] || {}).filter(
      (error: IErrorResponse | any) => !!error?.messageList?.[0]?.content
    )?.[0]?.messageList?.[0]?.content;
  }, [errorMessage, businessType]);

  // 在组件卸载时统一 abort
  useEffect(() => {
    return () => {
      Object.values(abortControllersRef.current).forEach((controller) => controller.abort());
    };
  }, []);

  const isShowLoading =
    !errors && (isSomeEmptyDatas || (isEmpty(submission) && !isHealthCheck)) && isLoading;
  const isShowError =
    (!!errors || isSomeEmptyDatas || (isEmpty(submission) && !isHealthCheck)) && !isLoading;

  return {
    isShowLoading,
    isShowError,
    businessType,
    chartDatas,
    submission,
    errorMessage: errors,
  };
};
