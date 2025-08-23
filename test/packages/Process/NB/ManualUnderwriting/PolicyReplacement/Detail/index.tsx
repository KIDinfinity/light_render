import React, { useMemo } from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Table, Icon } from 'antd';
import classnames from 'classnames';
import {v5 as uuidv5 } from 'uuid';
import { tenant, Region } from '@/components/Tenant';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import useGetPolicyReplacementFlag from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyReplacementFlag';
import useGetReplacementInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementInfoList';
import useGetShowReplacementTableReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetShowReplacementTableReadOnly';
import useGetReplacementFieldInfo from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementFieldInfo';
import useGetStatement from 'process/NB/ManualUnderwriting/_hooks/useGetStatement';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import PolicyReplacementInfoFirst from './PolicyReplacementInfoFirst';
import PolicyReplacementInfoLast from './PolicyReplacementInfoLast';
import styles from './index.less';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';
import { localConfig } from '../PolicyReplacement-Table/EditSection';

const Detail = ({ expendStatus, setExpendStatus }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Table',
    localConfig,
  });
  const newConfig = useMemo(() => {
    return lodash
      .chain(config)
      .filter(
        (item) =>
          item?.['field-props']?.visible === 'Y' && lodash.get(item, 'field') !== 'insuredSeqNo'
      )
      .value();
  }, [config]);
  const regionCode = tenant.region();
  const replacementInfoList = useGetReplacementInfoList();
  const showReplacementTable = useGetShowReplacementTableReadOnly();
  const statement = useGetStatement();
  const ownReplacementInfoList = lodash
    .chain(replacementInfoList)
    .map((item: any) => {
      return {
        ...item,
        sumAssured: getFieldDisplayAmount(
          item?.sumAssured,
          'nb.policyList.replacementInfoList.sumAssured'
        ),
      };
    })
    .value();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const policyReplacementFlag = useGetPolicyReplacementFlag();
  const fundVisible = useJudgeDisplayFundSection();
  const gsIndicator = lodash.get(businessData, 'policyList[0].gsIndicator');
  const columns = useMemo(() => {
    return transTableRowsConfig({
      config: newConfig,
    });
  }, [newConfig]);
  const replacementInfoData = useGetReplacementFieldInfo();

  return (
    <div className={styles.wrap}>
      <div
        className={classnames(
          styles.head,
          { [styles.hidden]: expendStatus },
          { [styles.fundVisible]: fundVisible }
        )}
      >
        <span className={styles.title}>
          {formatMessageApi({ Label_BIZ_Policy: 'ReplacementofPolicy' })}
        </span>
        <span className={styles.info}>
          {formatMessageApi({
            Dropdown_COM_YN: policyReplacementFlag,
          })}
        </span>
        <div className={styles.actions}>
          <Icon
            type={!expendStatus ? 'down' : 'up'}
            onClick={() => setExpendStatus(!expendStatus)}
          />
        </div>
      </div>
      {expendStatus ? (
        <div className={styles.content}>
          <PolicyReplacementInfoFirst data={replacementInfoData} />
          {showReplacementTable && (
            <Table
              rowKey={(r: any) => uuidv5(JSON.stringify(r), uuidv5.URL)}
              dataSource={ownReplacementInfoList}
              columns={columns}
              pagination={false}
            />
          )}

          <PolicyReplacementInfoLast data={replacementInfoData} />
          {regionCode === Region.MY && gsIndicator === 'GIO' && (
            <div className={styles.GIOStatement}>
              {formatMessageApi({ Label_BIZ_Policy: 'GIOStatement' })}
              <div className={styles.agree}>
                {formatMessageApi({
                  Dropdown_POL_Statement: statement,
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="policyReplacement">
      <Detail />
    </ExpandableContainer>
  );
};
