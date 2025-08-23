import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ChequeInformationField from './ChequeInformationField';
import useJudgeChequeNumberDuplicateWarningDisplay from './_hooks/useJudgeChequeNumberDuplicateWarningDisplay';
import Table from './Table';
import Buttons from './Buttons';

import styles from '../../index.less';

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  chequeInfoList: any;
  activitykey: string;
}

export default ({ showOnly, planInfoData = {}, chequeInfoList }: IParams) => {
  const { policyId = '', payType }: any = planInfoData;
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const list =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData.processData?.chequeInfoList
    ) || [];

  const chequeInfoItem = useMemo(() => {
    return lodash.chain(chequeInfoList).find({ policyId }).value();
  }, [chequeInfoList]);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/loadChequeInfoList`,
      payload: {
        showOnly,
      },
    });
  }, []);
  const displayWarning = useJudgeChequeNumberDuplicateWarningDisplay({
    chequeInfoList: list,
    policyId,
  });
  return (
    <>
      <div className={styles.paymentItemWrap}>
        {!taskNotEditable && <Buttons chequeInfoList={list} payType={payType} showOnly={false} />}
        <div className={classNames(styles.content, styles.chequeContent)}>
          <div className={styles.chequeWrap}>
            <ChequeInformationField
              data={chequeInfoItem}
              showOnly={showOnly}
              policyId={policyId}
              displayWarning={displayWarning}
            />
            <Table showOnly={showOnly} chequeInfoList={list} payType={payType} />
          </div>
        </div>
      </div>
    </>
  );
};
