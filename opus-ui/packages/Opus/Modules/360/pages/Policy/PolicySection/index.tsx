import React, { useState } from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { BusinessCode } from 'claim/enum/BusinessCode';
import Product from './Product';
import Header from './Header';
import PolicyOwner from './PolicyOwner';
import { getRolePolicyInfoList } from '../../../_functions';

const { Panel } = Collapse;

const PolicyItem = ({ item }: any) => {
  const [isActive, setActive] = useState(false);

  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  return (
    <Collapse onChange={() => setActive(!isActive)} bordered={false}>
      <Panel key={item?.policyId} header={<Header item={item} isActive={isActive} />}>
        {businessCode === BusinessCode.claim && <PolicyOwner policyOwner={item.policyOwner} />}
        <Product
          productInfoList={item?.productInfoList}
          mainProductCode={item?.mainProductCode}
          exclusionList={item?.policyExclusionList}
        />
      </Panel>
    </Collapse>
  );
};

const Policy = () => {
  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole);
  const activeClientId: string = useSelector(({ insured360 }: any) => insured360.activeClientId);
  const sideBarOverallList: string = useSelector(
    ({ insured360 }: any) => insured360.sideBarOverallList
  );

  const newPolicyInfoList = getRolePolicyInfoList({
    sideBarOverallList,
    activeClientId,
    activeRole,
  });

  return (
    !lodash.isEmpty(newPolicyInfoList) &&
    (lodash.map(newPolicyInfoList, (item, index) => {
      return <PolicyItem item={item} key={`${item.policyId}_${index}`} />;
    }) ||
      null)
  );
};

export default Policy;
