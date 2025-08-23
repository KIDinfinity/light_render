import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { OptionType } from '../../_enum';
import pageConfig from 'process/NewBusiness/ManualUnderwriting/page.config';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';

import Edit from './Edit';
import Show from './Show';

import styles from './index.less';

export default ({ caseCategory }: any) => {
  const dispatch = useDispatch();
  const [renderTooltipKey, setRenderTooltipKey] = useState(0);
  const list =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData.processData?.charityOrganizationList
    ) || [];

  const handleConfirm = async () => {
    const totalError = lodash.reduce(
      list,
      (totals: number, { donationPercentage }: any) =>
        totals + Number(formUtils.queryValue(donationPercentage) || 0),

      0
    );
    if (Number(totalError) > 100) {
      setRenderTooltipKey(renderTooltipKey + 1);
      return;
    }
    const isSuccess = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.other,
      },
    });
    return isSuccess as unknown as boolean;
  };
  const handleCancel = async () => {
    dispatch({
      type: `${NAMESPACE}/saveHiddenModal`,
    });
  };
  const handleShow = async () => {
    dispatch({
      type: `${NAMESPACE}/saveShowModal`,
      payload: {
        type: 'charityOrganization',
      },
    });
  };

  return (
    <>
      {tenant.region({
        [Region.MY]: () =>
          caseCategory === pageConfig.caseCategory ? (
            <ExpandableCard
              title={formatMessageApi({
                Label_BIZ_Policy: 'CharityOrganization',
              })}
              errorBoundaryName="Charity Organization"
              contentClassName={styles.cardContent}
              editModalProps={{
                onAfterConfirm: handleConfirm,
                onBeforeBack: handleCancel,
                onBeforeOpen: handleShow,
                children: <Edit renderTooltipKey={renderTooltipKey} />,
              }}
            >
              <div className={styles.charityOrganizationSection}>
                <Show />
              </div>
            </ExpandableCard>
          ) : null,
      })}
    </>
  );
};
