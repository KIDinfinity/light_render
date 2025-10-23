import React from 'react';
import { Card } from 'antd';
import lodash from 'lodash';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Product from './Product';
import PolicyExclusion from './PolicyExclusion';
import Header from './Header';
import Info from './Info/Info';
import Info2 from './Info2/Info2';
import styles from './index.less';
import Loan from 'basic/components/Loan';
import Product2 from './Product2';

const Policy = ({ policyInfoList, businessCode }: any) => {
  const isBIZ001: boolean = businessCode === BusinessCode.claim;

  return (
    !lodash.isEmpty(policyInfoList) &&
    ((
      <Card
        headStyle={{ color: '#fff' }}
        title={formatMessageApi({ Label_BIZ_Policy: 'Policy' })}
        className={styles.policySection}
        bordered={false}
      >
        {lodash.map(policyInfoList, (item) => {
          const loanList = lodash.map(item.loanList || [], (el: any) => ({
            loanContractNumber: el.loanContractNo,
            newLoanAmount: el.loanProtectionAmount,
            ...el,
          }));
          return (
            <div className={styles.section} key={item?.policyId}>
              <div className={styles.heander}>
                <Header item={item} />
                {isBIZ001 && <Info info={item} beneficiaryLayout={12} />}
              </div>
              <div className={styles.content}>
                {!isBIZ001 && <Info2 info={item} />}
                {isBIZ001 && (
                  <Product
                    productInfoList={item?.productInfoList}
                    mainProductCode={item?.mainProductCode}
                  />
                )}
                {!isBIZ001 && (
                  <>
                    <Product2
                      productInfoList={item?.productInfoList}
                      mainProductCode={item?.mainProductCode}
                    />
                    {!lodash.isEmpty(loanList) && <Loan loanList={loanList} />}
                  </>
                )}
                <PolicyExclusion policyExclusionList={item?.policyExclusionList} />
              </div>
            </div>
          );
        })}
      </Card>
    ) ||
      null)
  );
};
export default Policy;
