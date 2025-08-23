import { useEffect } from 'react';
import { useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';


export default ({ businessData, taskDetail,needUpdate }: any) => {
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch({
       type: `${NAMESPACE}/saveProcessData`,
       payload: {
         businessData,
         taskDetail,
       },
     });
 },[needUpdate])
};
