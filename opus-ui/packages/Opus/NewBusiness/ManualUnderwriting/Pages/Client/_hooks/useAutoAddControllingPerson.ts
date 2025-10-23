import { useDispatch, useSelector } from 'dva';
import { useEffect } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetControllingPersonList from './useGetControllingPersonList';
import { formUtils } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return formUtils.queryValue(
      modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm
    );
  });

  const controllingPersonList = useGetControllingPersonList({ mode: 'edit' });

  useEffect(() => {
    if (controllingPersonList.length < 1 && companyLegalForm === BooleanEnum.Yes) {
      dispatch({
        type: `${NAMESPACE}/addControllingPerson`,
      });
    }
  }, [companyLegalForm, controllingPersonList]);
};
