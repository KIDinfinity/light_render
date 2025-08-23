import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard } from 'basic/components/Form';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import Basic from './Basic';
import Booster from './Booster';
import styles from './index.less';
import { VLD_000343 } from '../../validators';
import handleMessageModal from '@/utils/commonMessage';

const BenefitItem = ({ benefitItemItem }: any) => {
  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const handleDelete = () => {
    const { basic } = benefitItemItem;
    const error = VLD_000343(basic);
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

  const isAdjustMent = benefitItemItem?.isAdjustment === IsAdjustment.Yes;
  return (
    <FormBorderCard
      borderColor={
        policyBackgrounds?.[`${benefitItemItem?.policyNo}${getPolicyYearValue(benefitItemItem)}`]
      }
      type="weight"
      className={classNames(isAdjustMent && styles.isAdjustment, styles.benefitItem)}
      button={{ visiable: taskNotEditable, callback: handleDelete }}
      childClassName={styles.benefitItemForm}
    >
      <Basic basicItem={benefitItemItem?.basic} />
      <Booster boosterItem={benefitItemItem?.booster} />
    </FormBorderCard>
  );
};

export default BenefitItem;
