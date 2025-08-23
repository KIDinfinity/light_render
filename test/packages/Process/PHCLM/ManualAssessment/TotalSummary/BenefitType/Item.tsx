import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { useSelector, useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import BenefitItemList from '../BenefitItem';
import AdjustBasic from './AdjustBasic';
import Basic from './Basic';
import Booster from './Booster';
import Remark from './Remark';
import LifePayableItem from './LifePayableItem';

import styles from './index.less';
import { VLD_000343 } from '../../validators';
import handleMessageModal from '@/utils/commonMessage';
import { useJudgeAppeal } from '../../_hooks';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Button } from 'antd';

const BenefitType = ({ benefitTypeItem, expand, existBenefitType, isLabel }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const { basic } = benefitTypeItem;
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
      type: `${NAMESPACE}/payableSeriesDelete`,
      payload: {
        deleteId: [basic?.id, ...(basic?.boosterId || [])],
        benefitCategory: basic?.benefitCategory,
      },
    });
  };

  const isAppeal = useJudgeAppeal();
  const isPayableEditable = !isAppeal || benefitTypeItem?.basic?.isNewPayable;

  const normalPayable = (
    <>
      <div className={styles.benefitTypeItem}>
        <div className={styles.benefitTypeForm}>
          <Basic
            basicItem={benefitTypeItem?.basic}
            existBenefitType={existBenefitType}
            isLabel={isLabel}
            isPayableEditable={isPayableEditable}
          />
          <Booster boosterItem={benefitTypeItem?.booster} isPayableEditable={isPayableEditable}/>
        </div>
        <Remark basicItem={benefitTypeItem?.basic} isLabel={isLabel} isPayableEditable={isPayableEditable}/>
      </div>
      <BenefitItemList benefitTypeItem={benefitTypeItem} expand={expand} isPayableEditable={isPayableEditable}/>
      {!!benefitTypeItem?.basic.lifePayable && (
        <div className={styles.lifePayableItem}>
          <LifePayableItem
            id={benefitTypeItem?.basic?.id}
            item={benefitTypeItem?.basic.lifePayable}
            isPayableEditable={isPayableEditable}
          />
        </div>
      )}
    </>
  );

  // 如果是appeal新建的payable或者是普通的claim流程，就允许编辑，且UI与原本的一致
  if(isPayableEditable) {
    return (
      <div className={styles.benefitTypeItemBox}>
        <FormBorderCard
          button={{
            visiable: editable && !benefitTypeItem?.hasCallExternalSystem,
            callback: handleDelete,
          }}
          className={styles.benefitType}
        >
          {normalPayable}
        </FormBorderCard>
      </div>
    );
  } else {
    const isAdjusted = !!benefitTypeItem?.basic?.isPayableAdjusted
    return (
      <div className={styles.benefitTypeItemBox}>
        <div className={styles.topRightButton}>
          {
            editable && (isAdjusted? (
              <Button className={styles.revokeButton} onClick={() => dispatch({
                type: `${NAMESPACE}/adjustClaimPayable`,
                payload: {
                  isPayableAdjusted: false,
                  claimPayableId: benefitTypeItem?.basic?.id
                }
              })}>
                {
                  formatMessageApi({
                    Label_BIZ_Claim: 'component.tableSearch.reset'
                  })
                }
              </Button>
            ) : (
              <Icon style={{marginRight: '5px'}} type="edit" onClick={() => dispatch({
                type: `${NAMESPACE}/adjustClaimPayable`,
                payload: {
                  isPayableAdjusted: true,
                  claimPayableId: benefitTypeItem?.basic?.id
                }
              })}/>
            ))
          }
        </div>
        <FormBorderCard
          className={styles.benefitType}
        >
          {
            isAdjusted && <AdjustBasic
              basicItem={benefitTypeItem?.basic}
              isLabel={isLabel}
            />
          }
          {normalPayable}
        </FormBorderCard>

      </div>
    )
  }

};

export default BenefitType;
