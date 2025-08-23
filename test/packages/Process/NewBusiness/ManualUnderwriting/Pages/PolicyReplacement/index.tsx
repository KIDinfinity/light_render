import React, { useEffect } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';
import Show from './Show';
import Edit from './Edit';
import styles from './index.less';
import useProcessData from '../../_hooks/useProcessData';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Region } from '@/components/Tenant/constants';
import { tenant } from '@/components/Tenant';
import {
  usePolicyReplacementFlag,
  useReplacementFirstInfo,
  useReplacementInfoList,
  useReplacementLastInfo,
  useShowGsIndicator,
  useShowReplacementTable,
} from './hooks';
import { OptionType } from '../../_enum';

const PolicyReplacementShow = () => {
  const dispatch = useDispatch();
  const regionCode = tenant.region();
  const { applicationNo } = useProcessData();
  const policyReplacementFlag = usePolicyReplacementFlag();
  const replacementFirstInfo = useReplacementFirstInfo();
  const replacementLastInfo = useReplacementLastInfo();
  const replacementInfoList = useReplacementInfoList();
  const showGIOStatement = useShowGsIndicator();
  const showTable = useShowReplacementTable();
  useEffect(() => {
    if (!!applicationNo) {
      dispatch({
        type: `${NAMESPACE}/fetchClientNameDicts`,
        payload: {
          applicationNo,
        },
      });
    }
  }, [applicationNo, dispatch]);
  return regionCode !== Region.TH && regionCode !== Region.ID ? (
    <ExpandableCard
      title={formatMessageApi({ Label_BIZ_Policy: 'ReplacementofPolicy' })}
      info={formatMessageApi({
        Dropdown_COM_YN: policyReplacementFlag,
      })}
      errorBoundaryName="Replacement Policy"
      contentClassName={styles.content}
      editModalProps={{
        onAfterConfirm: async () => {
          dispatch({
            type: `${NAMESPACE}/setPolicyReplProcessData`,
          });
          const result: boolean = await dispatch<any>({
            type: `${NAMESPACE}/submit`,
            payload: {
              type: OptionType.other,
              formKeys: ['PolicyReplacement-Field', 'PolicyReplacement-Table'],
            },
          });
          return result;
        },
        onBeforeBack: async () => {},
        onBeforeOpen: async () => {
          dispatch({
            type: `${NAMESPACE}/resetPolicyReplModalData`,
          });
        },
        children: regionCode !== Region.TH && regionCode !== Region.ID ? <Edit /> : null,
      }}
    >
      <Show
        showTable={showTable}
        replacementLastInfo={replacementLastInfo}
        replacementFirstInfo={replacementFirstInfo}
        replacementInfoList={replacementInfoList}
        showGIOStatement={showGIOStatement}
      />
    </ExpandableCard>
  ) : null;
};

PolicyReplacementShow.displayName = 'policyReplacement';
export default PolicyReplacementShow;
