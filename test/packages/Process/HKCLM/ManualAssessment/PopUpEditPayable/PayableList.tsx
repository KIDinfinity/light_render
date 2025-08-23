import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import Payable from './Payable';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import styles from './index.less';

const PayableList = () => {
  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.PopUpEditPayable?.data
  );

  return (
    <div
      className={classNames(
        styles.payableList,
        data?.benefitCategory === eBenefitCategory.Reimbursement
          ? styles.reimbursementList
          : styles.otherList
      )}
    >
      {lodash.isArray(data.children) &&
        data.children.map((item: any) => (
          <div className={styles.payableItem} key={item.id}>
            <Payable
              item={item}
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
