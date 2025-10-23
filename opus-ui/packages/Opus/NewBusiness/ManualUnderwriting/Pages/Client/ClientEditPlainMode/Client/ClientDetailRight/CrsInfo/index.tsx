import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { ReactComponent as CrsIcon } from 'opus/Assets/crsIcon.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionHeader from 'opus/NewBusiness/ManualUnderwriting/_components/SectionHeader';
import Section from './Section';
import FinancialSection from './FinancialSection';
import useGetBasicProductSkipSnapshot from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetBasicProductSkipSnapshot';

export default ({ clientId }: any) => {
  const customerRole = useSelector((state: any) =>
    lodash.get(
      state,
      `${NAMESPACE}.modalData.entities.clientMap.${clientId}.personalInfo.customerRole`
    )
  );
  const isExistRole = !lodash.isEmpty(formUtils.queryValue(customerRole));
  const dispatch = useDispatch();

  const basicProductData = useGetBasicProductSkipSnapshot();

  const isShow = isExistRole && basicProductData?.productCenterFeature?.crsInd !== 'No';

  return isShow ? (
    <div>
      <SectionHeader
        icon={<CrsIcon />}
        addActions={[
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
        ]}
      />
      <Section clientId={clientId} />
      <FinancialSection clientId={clientId} />
    </div>
  ) : null;
};
