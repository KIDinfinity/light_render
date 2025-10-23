import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import ExpandableCard from '../../_components/ExpandableCard';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'opus/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';
import { ReactComponent as BankIcon } from 'opus/Assets/icon-bank.svg';

import Edit from './Edit';
import Show from './Show';

import styles from './index.less';
import useClearAllFacultativeValues from './_hooks/useClearAllFacultativeValues';
import useLoadFacultativeInfo from './_hooks/useLoadFacultativeInfo';
import useUpdateFacultativeValue from './_hooks/useUpdateFacultativeValue';

export default () => {
  const dispatch = useDispatch();
  const fundSectionConfig = useGetSectionAtomConfig({ localConfig, section: 'Fund-Table' });
  const contractType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData?.caseType
  );
  useLoadFacultativeInfo();
  useClearAllFacultativeValues();
  useUpdateFacultativeValue();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getProductInfoByContractType`,
    });
  }, [contractType]);

  const formKeys =
    useSelector(({ formCommonController }: any) => {
      const keys: any = [];
      const forms = formCommonController?.forms ?? {};
      Object.keys(forms).forEach((key) => {
        if (key.includes('UWDecision-Table')) {
          keys.push(key);
        }
      });
      return keys;
    }, shallowEqual) || [];

  const handleConfirm = async () => {
    await dispatch({
      type: `${NAMESPACE}/handleUpdateDefaultPayType`,
    });
    await dispatch({
      type: `${NAMESPACE}/alignFund`,
      payload: {
        config: fundSectionConfig,
      },
    });
    const result: any = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.coverage,
        formKeys,
      },
    });

    await dispatch({
      type: `${NAMESPACE}/getFacultativeInfo`,
    });

    return result;
  };

  const handleCancel = async () => {
    dispatch({
      type: `${NAMESPACE}/saveHiddenModal`,
    });
  };
  const handleShow = async () => {
    dispatch({
      type: `${NAMESPACE}/clearError`,
    });
    dispatch({
      type: `${NAMESPACE}/saveShowModal`,
      payload: {
        type: 'decision',
      },
    });
  };

  return (
    <ExpandableCard
      title={'UW Decision'}
      errorBoundaryName="Decision"
      contentClassName={styles.cardContent}
      icon={BankIcon}
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
