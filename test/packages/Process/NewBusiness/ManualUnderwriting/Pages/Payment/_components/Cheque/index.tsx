import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { useGetSectionConfigObject } from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useJudgeChequeNumberDuplicateWarningDisplay from './_hooks/useJudgeChequeNumberDuplicateWarningDisplay';

import Table from './Table';
import Buttons from './Buttons';

import styles from '../../index.less';
import useAttachWarningIntoFieldsConfig from './_hooks/useAttachWarningIntoFieldsConfig';

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  chequeInfoList: any;
  activitykey: string;
}

// TODO:这里需要单独写
export default ({ showOnly, planInfoData = {}, chequeInfoList }: IParams) => {
  const dispatch = useDispatch();

  const { policyId = '', payType }: any = planInfoData;

  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const defaultChequeInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.chequeInfoList
    ) || [];

  // TODO:这个配置应该用section的方式去写
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());

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

  const list = useMemo(() => {
    return showOnly ? defaultChequeInfoList : chequeInfoList;
  }, [defaultChequeInfoList, chequeInfoList, showOnly]);

  const displayWarning = useJudgeChequeNumberDuplicateWarningDisplay({
    chequeInfoList: list,
    policyId,
  });
  const configWithWarning = useAttachWarningIntoFieldsConfig({
    config,
    displayWarning,
  });
  return (
    <>
      <div className={styles.paymentItemWrap}>
        {!taskNotEditable && (
          <Buttons chequeInfoList={list} payType={payType} showOnly={showOnly} />
        )}
        <div className={classNames(styles.content, styles.chequeContent)}>
          <div className={styles.chequeWrap}>
            <ConfigurableReadOnlySection
              config={configWithWarning}
              data={chequeInfoItem}
              NAMESPACE={NAMESPACE}
            />
            <Table showOnly={showOnly} chequeInfoList={list} payType={payType} />
          </div>
        </div>
      </div>
    </>
  );
};
