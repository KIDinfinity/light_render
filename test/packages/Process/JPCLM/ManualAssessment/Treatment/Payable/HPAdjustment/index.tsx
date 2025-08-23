import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';
import { FormLayoutContext } from 'basic/components/Form';
import ShowHideButton from 'basic/components/Form/FormLayout/ShowHideButton';
import { getTotalHpTreatmentPayableList } from '../../_hooks';
import Header from './Header';
import ShrinkItem from './ShrinkItem';
import PayableItem from './PayableItem';
import styles from './index.less';

const HPAdjustment = ({ payableIds }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const [expand, setExpand] = useState(false);

  const treatmentPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap
  );

  const totalList = getTotalHpTreatmentPayableList({
    payableIds,
    treatmentPayableListMap,
  });

  const handleDelete = ({ totalItem }: any) => {
    const treatmentPayableList = totalItem?.treatmentPayableList || [];

    treatmentPayableList.forEach((item: any) => {
      dispatch({
        type: 'JPCLMOfClaimAssessment/removeTreatmentPayableItem',
        payload: {
          claimPayableItemId: item.payableId,
          treatmentPayableItemId: item.id,
        },
      });
    });
  };

  return (
    <>
      {lodash.map(totalList, (totalItem: any) => (
        <CardOfClaim
          key={totalItem.id}
          showButton={!!editable}
          handleClick={() => {
            handleDelete({ totalItem });
          }}
        >
          <span className={styles.flag} />
          <span className={styles.flagTitle}> 調整 </span>
          <Header totalItem={totalItem} />
          <div className={styles.expand}>
            <ShowHideButton
              show={expand}
              onChange={() => {
                setExpand(!expand);
              }}
            />
          </div>

          <FormLayoutContext.ExpandProvider>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(totalItem.treatmentPayableList || [], (treatmentPayable: any) => {
              const props = {
                key: treatmentPayable?.id,
                treatmentPayable,
                treatmentPayableList: totalItem.treatmentPayableList,
              };
              return <>{!expand ? <ShrinkItem {...props} /> : <PayableItem {...props} />}</>;
            })}
          </FormLayoutContext.ExpandProvider>
        </CardOfClaim>
      ))}
    </>
  );
};

export default HPAdjustment;
