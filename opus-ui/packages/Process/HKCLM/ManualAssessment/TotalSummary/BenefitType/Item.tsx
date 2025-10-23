import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { useSelector, useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import BenefitItemList from '../BenefitItem';
import Basic from './Basic';
import Booster from './Booster';
import Remark from './Remark';

import styles from './index.less';

const BenefitType = ({ benefitTypeItem, expand, existBenefitType, isLabel }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const { basic } = benefitTypeItem;
    dispatch({
      type: `${NAMESPACE}/payableSeriesDelete`,
      payload: {
        deleteId: [basic?.id, ...(basic?.boosterId || [])],
        benefitCategory: basic?.benefitCategory,
      },
    });
  };
  return (
    <>
      <div className={styles.benefitTypeItem}>
        <FormBorderCard
          button={{
            visiable: editable && !benefitTypeItem?.hasCallExternalSystem,
            callback: handleDelete,
          }}
          className={styles.benefitType}
          childClassName={styles.benefitTypeForm}
        >
          <Basic
            basicItem={benefitTypeItem?.basic}
            benefitTypeItem={benefitTypeItem}
            existBenefitType={existBenefitType}
            isLabel={isLabel}
          />
          <Booster boosterItem={benefitTypeItem?.booster} />
        </FormBorderCard>
        <Remark basicItem={benefitTypeItem?.basic} isLabel={isLabel} payableId={benefitTypeItem?.key} />
      </div>
      <BenefitItemList benefitTypeItem={benefitTypeItem} expand={expand} />
    </>
  );
};

export default BenefitType;
