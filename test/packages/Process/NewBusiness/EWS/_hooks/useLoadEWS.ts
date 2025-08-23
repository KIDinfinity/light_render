import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const ewsVersions = useSelector(
    ({ [NAMESPACE]: modulenamespace }: any) => modulenamespace?.ewsVersions,
    shallowEqual
  );

  useEffect(() => {
    (async () => {
      if (ewsVersions?.length) {
        setLoading(true);
        const { id, applicationNo } = lodash
          .chain(ewsVersions)
          .first()
          .pick(['id', 'applicationNo'])
          .value();
        const response: any = await dispatch({
          type: `${NAMESPACE}/loadSingleVersionEWS`,
          payload: {
            applicationNo,
            id,
          },
        });
        if (response?.success) {
          await dispatch({
            type: `${NAMESPACE}/setCurrentVersionEWS`,
            payload: {
              currentVersionEWS: response?.resultData,
            },
          });
          dispatch({
            type: `${NAMESPACE}/saveSingleVersionEWS`,
            payload: {
              version: id,
              sigleVersionData: response?.resultData,
              originEWSData: response?.originEWSData,
            },
          });
          window.requestIdleCallback(async () => {
            const [, ...otherVersions] = ewsVersions;
            const requestListSet = new Set();
            lodash.forEach(otherVersions, (item: any) => {
              requestListSet.add(
                new Promise((resolve) => {
                  resolve(
                    dispatch({
                      type: `${NAMESPACE}/loadSingleVersionEWS`,
                      payload: {
                        applicationNo: item?.applicationNo,
                        id: item?.id,
                      },
                    })
                  );
                })
              );
            });

            Promise.all(Array.from(requestListSet)).then((results) => {
              const mutipleEWSData = lodash
                .chain(results)
                .filter((res: any) => {
                  return res?.success;
                })
                .value();
              dispatch({
                type: `${NAMESPACE}/saveMutipleVersionEWS`,
                payload: {
                  mutipleEWSData,
                },
              });
            });
          });
        }
        setLoading(false);
      }
    })();
  }, [dispatch, setLoading, ewsVersions]);
};
