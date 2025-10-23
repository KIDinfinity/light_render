import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { ReactComponent as CrsIcon } from 'opus/Assets/crsIcon.svg';
import SectionHeader from 'opus/NewBusiness/ManualUnderwriting/_components/SectionHeader';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section from './Section';
import FinancialSection from './FinancialSection';
import { useShowCrsInfo } from 'opus/NewBusiness/ManualUnderwriting/_hooks';

const AddButton = ({ clientId }: any) => {
  const dispatch = useDispatch();
  const newCrs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.newCrs
  );
  const isShow = formUtils.queryValue(newCrs) === 'Y';

  return (
    <SectionHeader
      icon={<CrsIcon />}
      addActions={
        isShow
          ? [
              {
                buttonCode: 'add',
                title: formatMessageApi({
                  Label_BPM_Button: 'AddCRS',
                }),
                action: () => {
                  dispatch({
                    type: `${NAMESPACE}/saveFormData`,
                    target: 'addFinancialInfo',
                    payload: {
                      id: clientId,
                    },
                  });
                },
              },
            ]
          : []
      }
    />
  );
};

export default ({ clientId }: any) => {
  const isShow = useShowCrsInfo(clientId, 'edit');

  return isShow ? (
    <>
      <AddButton clientId={clientId} />
      <Section clientId={clientId} />
      <FinancialSection clientId={clientId} />
    </>
  ) : null;
};
