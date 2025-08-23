import { useEffect } from 'react';
import lodash from 'lodash';
import useHandleConfigCallback from './useHandleConfigCallback';

export default ({
  buttonListFromServer,
  actionConfig,
  taskDetail,
  contextDispatch,
  setButtonList,
  customizationButtonConfig,
  commonActionLife,
}: any) => {
  const handleConfigCallback = useHandleConfigCallback({
    taskDetail,
    customizationButtonConfig,
    contextDispatch,
    commonActionLife,
  });
  // set buttonList
  useEffect(() => {
    (async () => {
      const list: any = await handleConfigCallback({ buttonListFromServer, actionConfig });
      if (list?.length) {
        contextDispatch({
          type: 'setButtonStatusAll',
          payload: {
            buttonStatus: lodash.reduce(
              list,
              (result, item) => {
                const temp = result;
                temp[item?.buttonCode] = {
                  status: item?.initStatus,
                  errorsCount: 0,
                };
                return temp;
              },
              {}
            ),
          },
        });
        contextDispatch({
          type: 'setFinalButtonList',
          payload: {
            finalButtonList: list || [],
          },
        });
        setButtonList(list || []);
      } else {
        setButtonList([]);
      }
    })();
    return () => {
      setButtonList([]);
    };
  }, [buttonListFromServer, actionConfig]);
};
