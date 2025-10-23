import { useDispatch, useSelector } from 'dva';
import { useEffect } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';
import useGetUBOInfoList from './useGetUBOInfoList';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm;
  });

  const uboList = useGetUBOInfoList({ mode: 'edit' });

  useEffect(() => {
    if (uboList.length < 1 && formUtils.queryValue(companyLegalForm) === BooleanEnum.No) {
      dispatch({
        type: `${NAMESPACE}/addUBOInfo`,
      });
    }
  }, [companyLegalForm, uboList]);
};
