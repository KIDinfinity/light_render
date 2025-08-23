import React from 'react';
import { Card } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ProductGroup from './productGroup';
import CoverageTypeGroup from './CoverageTypeGroup';
import { getRolePolicyInfoList } from '../../../_model/functions';
import styles from './index.less';

const Coverage = ({ policyInfoList }: any) => {
  const businessCode: string = useSelector(
    ({ insured360 }: any) => insured360.taskInfo?.businessCode
  );

  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole);
  const activeClientId: string = useSelector(({ insured360 }: any) => insured360.activeClientId);
  const sideBarOverallList: string = useSelector(
    ({ insured360 }: any) => insured360.sideBarOverallList
  );

  const isBIZ001: boolean = businessCode === BusinessCode.claim;

  const map = lodash
    .chain(
      getRolePolicyInfoList({ sideBarOverallList, policyInfoList, activeClientId, activeRole })
    )
    .groupBy('policySource')
    .map((policyInfoListOfCurSource, policySource) => {
      return {
        policySource,
        productInfoList: lodash
          .chain(policyInfoListOfCurSource)
          .map((policyInfo) =>
            lodash.map(policyInfo?.productInfoList, (item: any) => ({
              ...item,
              policyId: policyInfo?.policyId,
            }))
          )
          .flatten()
          .value(),
      };
    })
    .value();
  const hasNullCoverageType = lodash.some(map, (groupItem: any) =>
    lodash.some(groupItem?.productInfoList, (productInfo: any) =>
      lodash.isEmpty(productInfo?.coverageType)
    )
  );

  return (
    !lodash.isEmpty(policyInfoList) && (
      <Card
        headStyle={{ color: '#fff' }}
        title={formatMessageApi({ Label_BIZ_Policy: 'Coverage' })}
        className={styles.coverages}
        bordered={false}
      >
        <div className={styles.policySourceList}>
          {lodash.map(map, (item: any, index: number) => {
            const propsObj = {
              key: `${item.id}-${index}`,
              policySource: item?.policySource,
              productInfoList: item?.productInfoList,
            };
            return isBIZ001 || hasNullCoverageType ? (
              <ProductGroup {...propsObj} />
            ) : (
              <CoverageTypeGroup {...propsObj} />
            );
          })}
        </div>
      </Card>
    )
  );
};

export default connect(({ insured360 }: any) => ({
  policyInfoList: insured360?.policyInfoList,
}))(Coverage);
