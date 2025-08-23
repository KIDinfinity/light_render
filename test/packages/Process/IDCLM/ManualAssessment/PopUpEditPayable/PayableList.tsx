import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import Payable from './Payable';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { findBooster } from '../_models/functions/findBooster';
import styles from './index.less';

const PayableList = () => {
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const { children } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.PopUpEditPayable?.data || []
  );
  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.PopUpEditPayable?.data
  );

  const list = lodash.map(children, (item: any) => {
    const { booster, hasBooster } = findBooster(serviceItemPayableListMap, item, listPolicy);
    return {
      ...item,
      booster,
      hasBooster,
    };
  });

  return (
    <div
      className={classNames(
        styles.payableList,
        data?.benefitCategory === eBenefitCategory.Reimbursement
          ? styles.reimbursementList
          : styles.otherList
      )}
    >
      {lodash.isArray(list) &&
        list.map((item) => (
          <div className={styles.payableItem} key={item.id}>
            <Payable
              item={item}
              benefitCategory={data?.benefitCategory}
              booster={item?.booster}
              hasBooster={item?.hasBooster}
              policyBooster={item?.policyBooster}
            />
          </div>
        ))}
    </div>
  );
};

export default PayableList;
