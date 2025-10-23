import { useEffect, useState } from 'react';
import lodash from 'lodash';
import addTimerList from 'bpm/pages/OWBEntrance/Sider/ButtonAction/timer/addTimerList';
import clearTimerList from 'bpm/pages/OWBEntrance/Sider/ButtonAction/timer/clearTimerList';
import useHandleAutoActionCallback from './useHandleAutoActionCallback';
import useHandleGetTimerKeyCallback from './useHandleGetTimerKeyCallback';

export default ({ buttonList, taskId, stopTimer, stopAutoSave }: any) => {
  // 设置timer
  const [autoActionDataCache, setActionDataCache] = useState(new Map());
  const setAutoActionDataCache = ({ cacheKey, data }: any) => {
    autoActionDataCache.set(cacheKey, data);
    setActionDataCache(autoActionDataCache);
  };
  // 设置timer
  const [timers, setTimers] = useState(new Map());
  const handleAutoAction = useHandleAutoActionCallback({
    autoActionDataCache,
    setAutoActionDataCache,
  });
  const handleGetTimerKey = useHandleGetTimerKeyCallback({ taskId });
  useEffect(() => {
    if (lodash.isArray(buttonList) && buttonList.length) {
      if (stopTimer || stopAutoSave) {
        clearTimerList({
          timers,
          setTimers,
        });
        return;
      }

      const timerList = lodash
        .chain(buttonList)
        .filter((item: any) => item?.timer)
        .map((item: any) => {
          const { timer: timerConfig, action } = lodash.pick(item, ['timer', 'action']);

          let currentTimer = null;
          const func = () => {
            if (lodash.isNumber(timerConfig) && lodash.isFunction(action)) {
              const timerKey = handleGetTimerKey({
                buttonCode: item?.buttonCode,
              });
              currentTimer = setTimeout(async () => {
                if (!timerKey || !timers.has(timerKey)) {
                  return false;
                }
                await handleAutoAction(action);
                func();
              }, timerConfig);
              currentTimer = {
                timerKey,
                currentTimer,
              };
            }
          };
          func();

          return currentTimer;
        })
        .value();

      addTimerList({
        timers,
        timerList,
        setTimers,
      });

      return () => {
        clearTimerList({
          timers,
          setTimers,
        });
      };
    }
  }, [buttonList, stopTimer, stopAutoSave]);
  useEffect(() => {
    return () => {
      clearTimerList({
        timers,
        setTimers,
      });
    };
  }, []);
};
