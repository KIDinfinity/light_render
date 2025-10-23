import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

const setClaimEditableHocHook = (WrappedComponent: any) => {
  return (props: any) => {
    const { taskDetail } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: 'claimEditable/set',
        payload: lodash.pick(taskDetail, [
          'taskStatus',
          'taskDefKey',
          'submissionChannel',
          'procActOrder',
          'editFlag',
          'isEditPage',
        ]),
      });
    }, [taskDetail]);

    return <WrappedComponent {...(props || {})} />;
  };
};

export default setClaimEditableHocHook;
