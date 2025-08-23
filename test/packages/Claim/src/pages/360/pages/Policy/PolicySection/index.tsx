import React from 'react';
import { Card, Collapse } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { BusinessCode } from 'claim/enum/BusinessCode';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Product from './Product';
import Product2 from './Product2';
import PolicyExclusion from './PolicyExclusion';
import Header from './Header';
import Info from './Info/Info';
import Info2 from './Info2/Info2';
import Loan from 'basic/components/Loan';
import PolicyNotes from './PolicyNotes';
import { getRolePolicyInfoList } from '../../../_model/functions';

import styles from './index.less';

const { Panel } = Collapse;

const Policy = () => {
  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  const isBIZ001: boolean = businessCode === BusinessCode.claim;
  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole);
  const activeClientId: string = useSelector(({ insured360 }: any) => insured360.activeClientId);
  const sideBarOverallList: string = useSelector(
    ({ insured360 }: any) => insured360.sideBarOverallList
  );
  const { isExpanderSwitchOn } = useExpanderController();

  const newPolicyInfoList = getRolePolicyInfoList({
    sideBarOverallList,
    activeClientId,
    activeRole,
  });

  return (
    !lodash.isEmpty(newPolicyInfoList) &&
    ((
      <Card
        headStyle={{ color: '#fff' }}
        title={formatMessageApi({ Label_BIZ_Policy: 'Policy' })}
        className={styles.policySection}
        bordered={false}
      >
        {lodash.map(newPolicyInfoList, (item) => {
          const loanList = lodash.map(item.loanList || [], (el: any) => ({
            loanContractNumber: el.loanContractNo,
            newLoanAmount: el.loanProtectionAmount,
            ...el,
          }));
          return (
            <div className={styles.section} key={item?.policyId}>
              <Collapse bordered={false}>
                <Panel
                  key={item?.policyId}
                  header={
                    <>
                      <Header item={item} />
                      {isBIZ001 && isExpanderSwitchOn && (
                        <Info info={item} beneficiaryLayout={12} />
                      )}
                    </>
                  }
                >
                  {isBIZ001 && !isExpanderSwitchOn && <Info info={item} layout={12} />}
                  {!isBIZ001 && !item?.onlyPolicyNote && <Info2 info={item} />}
                  {isBIZ001 && isExpanderSwitchOn && (
                    <Product
                      productInfoList={item?.productInfoList}
                      mainProductCode={item?.mainProductCode}
                    />
                  )}
                  {!isBIZ001 && isExpanderSwitchOn && !item?.onlyPolicyNote && (
                    <>
                      <Product2
                        productInfoList={item?.productInfoList}
                        mainProductCode={item?.mainProductCode}
                      />
                      {!lodash.isEmpty(loanList) && <Loan loanList={loanList} />}
                    </>
                  )}
                  {isExpanderSwitchOn && (
                    <PolicyExclusion policyExclusionList={item?.policyExclusionList} />
                  )}
                  {isExpanderSwitchOn && <PolicyNotes policyNoteList={item?.policyNoteList} />}
                </Panel>
              </Collapse>
            </div>
          );
        })}
      </Card>
    ) ||
      null)
  );
};
export default Policy;
