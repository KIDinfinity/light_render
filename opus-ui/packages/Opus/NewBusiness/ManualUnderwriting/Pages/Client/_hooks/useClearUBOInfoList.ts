import { formUtils } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useEffect } from 'react';
import useGetUBOInfoList from './useGetUBOInfoList';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return formUtils.queryValue(
      modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm
    );
  });
  const uboInfoList = useGetUBOInfoList({ mode: 'edit' });

  useEffect(() => {
    if (companyLegalForm !== BooleanEnum.No && uboInfoList.length > 0) {
      dispatch({ type: `${NAMESPACE}/clearAllUBOInfo`, payload: { clientId } });
    }
  }, [clientId, companyLegalForm, uboInfoList]);
};
