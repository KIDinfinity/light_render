import React from 'react';
import { useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';

import { useGeParentCodes } from './_hooks';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import Edit from './_components/Edit';
import Show from './_components/Show';

import styles from './index.less';
import useLoadPlanProduct from '../../_hooks/useLoadPlanProduct';

export default () => {
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );

  useLoadPlanProduct();
  useGeParentCodes();

  const handleConfirm = async () => {
    const result = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.plan,
        formKeys: ['PlanInfo-Field'],
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

  return (
    <ExpandableCard
      title={formatMessageApi({
        Label_BIZ_Policy: 'PlanInfo',
      })}
      errorBoundaryName="PlanInfo"
      contentClassName={styles.cardContent}
      editModalProps={{
        onAfterConfirm: handleConfirm,
        onBeforeBack: handleCancel,
        onBeforeOpen: handleShow,
        children: <Edit />,
      }}
    >
      <div className={styles.planSection}>
        <Show />
      </div>
    </ExpandableCard>
  );
};
