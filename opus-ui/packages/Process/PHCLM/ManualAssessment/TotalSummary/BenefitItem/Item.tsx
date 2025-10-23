import React from 'react';
import { NAMESPACE } from '../../activity.config';
import { useSelector, useDispatch } from 'dva';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import classNames from 'classnames';
import { FormBorderCard } from 'basic/components/Form';
import BasicBenefitItem from './Basic';
import BoosterBenefitItem from './Booster';
import styles from './index.less';
import { VLD_000343 } from '../../validators';
import handleMessageModal from '@/utils/commonMessage';

const BenefitItem = ({ benefitItem, isPayableEditable }: any) => {
  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;

  const dispatch = useDispatch();

  const handleDelete = () => {
    const { basic } = benefitItem;
    const error = VLD_000343(basic, true);
    if (error) {
      handleMessageModal([
        {
          content: error,
        },
      ]);
      return;
    }
    dispatch({
      type: `${NAMESPACE}/payableItemDelete`,
      payload: {
        benefitCategory: basic?.benefitCategory,
        sourceBoosterId: basic.sourceBoosterId,
        sourceId: basic.sourceId,
      },
    });
  };

  const isAdjustMent = benefitItem?.isAdjustment === IsAdjustment.Yes;
  return (
    <FormBorderCard
      type="weight"
      className={classNames(isAdjustMent && styles.isAdjustment, styles.benefitItem)}
      button={{ visiable: taskNotEditable, callback: handleDelete }}
      childClassName={styles.benefitItemForm}
    >
      <BasicBenefitItem basicItem={benefitItem?.basic} />
      <BoosterBenefitItem boosterItem={benefitItem?.booster} />
    </FormBorderCard>
  );
};

export default BenefitItem;
