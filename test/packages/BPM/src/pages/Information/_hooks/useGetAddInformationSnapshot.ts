import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';

export default () => {
  const dispatch = useDispatch();
  const { informationData, addInformationBuffer } = useSelector(
    (state: any) => ({
      informationData: state?.navigatorInformationController?.informationData,
      addInformationBuffer: state?.navigatorInformationController?.addInformationBuffer,
    }),
    shallowEqual
  );
  const caseNo = formUtils.queryValue(informationData?.caseNo);

  useEffect(() => {
    (async () => {
      if (caseNo && !addInformationBuffer?.aleadySave) {
        const result = await dispatch({
          type: 'navigatorInformationController/getSnapshot',
          payload: {
            taskId: caseNo,
          },
        });
        if (!lodash.isEmpty(addInformationBuffer)) {
          if (lodash.isEmpty(result)) {
            dispatch({
              type: 'navigatorInformationController/addInformationRecord',
              payload: addInformationBuffer,
            });
          } else {
            const firstItem: any = lodash.first(result);
            dispatch({
              type: 'navigatorInformationController/addInformationChange',
              payload: {
                id: firstItem?.id,
                changedFields: addInformationBuffer,
              },
            });
            dispatch({
              type: 'navigatorInformationController/setActiveEditTabs',
              payload: {
                activeEditTabs: [firstItem?.id],
              },
            });
          }
        }
      }
    })();
    return () => {
      dispatch({
        type: 'navigatorInformationController/setAddInformations',
        payload: {
          record: [],
        },
      });
    };
  }, [caseNo, addInformationBuffer]);
};
