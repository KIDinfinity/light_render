import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { ReactComponent as AccountIcon } from 'opus/Assets/icon-account.svg';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import React, { useMemo } from 'react';
import ExpandableCard from '../../_components/ExpandableCard';
import useLoadPlanProduct from '../../_hooks/useLoadPlanProduct';
import styles from './index.less';
import Edit from './_components/Edit';
import Show from './_components/Show';
import { useGeParentCodes } from './_hooks';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );
  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData,
    shallowEqual
  );

  useLoadPlanProduct();
  useGeParentCodes();

  const handleConfirm = async () => {
    const result = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.plan,
        formKeys: ['PlanInfo-Field', 'DividendandICPInfo', 'DividendandICPInfo-Field'],
      },
    });

    setTimeout(() => {
      dispatch({
        type: `${NAMESPACE}/loadProposalFlags`,
        payload: {
          applicationNo,
        },
      });
    }, 5000);

    return result;
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
        type: 'plan',
      },
    });
  };

  const policyStatus = useMemo(() => {
    return lodash.get(planInfoData, 'policyStatus') || '-';
  }, [planInfoData]);
  const laPolicyStatus = useMemo(() => {
    return lodash.get(planInfoData, 'laPolicyStatus') || '-';
  }, [planInfoData]);

  const HeaderStatus = () => {
    return (
      <div className={styles.status}>
        <div className={styles.statusItem}>
          <div className={styles.label}>{formatMessageApi({ Label_BIZ_Policy: 'OPUSStatus' })}</div>
          <div className={styles.value}>
            {formatMessageApi({ Dropdown_POL_PolicyStatusCode: policyStatus })}
          </div>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.label}>{formatMessageApi({ Label_COM_Opus: 'LAStatus' })}</div>
          <div className={styles.value}>
            {formatMessageApi({ Dropdown_POL_PolicyStatusCode: laPolicyStatus })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ExpandableCard
      title={formatMessageApi({
        Label_BIZ_Policy: 'PlanInfo',
      })}
      icon={AccountIcon}
      errorBoundaryName="PlanInfo"
      contentClassName={styles.cardContent}
      editModalProps={{
        onAfterConfirm: handleConfirm,
        onBeforeBack: handleCancel,
        onBeforeOpen: handleShow,
        children: <Edit />,
      }}
      extraInfo={<HeaderStatus />}
    >
      <div className={styles.planSection}>
        <Show />
      </div>
    </ExpandableCard>
  );
};
