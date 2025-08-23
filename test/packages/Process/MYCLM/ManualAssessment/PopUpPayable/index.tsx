import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import Basic from './Basic';
import BenefitItemList from './BenefitItemList';
import Add from './Add';
import styles from './index.less';

const PopUpPayable = () => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isShowPopUpPayable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowPopUpPayable
  );
  const forms = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.forms);

  const basic = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable.basic
  );
  const benefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable.benefitListMap
  );

  const popUpPablePoint = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.popUpPablePoint || {}
  );
  
  const onClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/popUpPableDelete`,
    });
  };

  const onConfirm = async () => {
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(forms),
      force: true,
    });

    if (errors?.length > 0) {
      return;
    }
    if (!lodash.isEmpty(benefitListMap)) {
      await dispatch({
        type: `${NAMESPACE}/addPayableItem`,
      });
    } else {
      await dispatch({ type: `${NAMESPACE}/addClaimPayableItem` });
    }
    await dispatch({
      type: 'formCommonController/addPayableItemBGColor',
      payload: { policyNo: formUtils.queryValue(basic.policyNo) },
    });
    await onClose();
  };
  const top = Number(popUpPablePoint?.top) + 32;
  const left = Number(popUpPablePoint?.left) - 820;

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={isShowPopUpPayable}
      className={styles.PopUpPayable}
      onReturn={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      returnAuth
      moveTop={top}
      moveLeft={left}
      width={820}
      authHeight
    >
      {isShowPopUpPayable && (
        <>
          <Basic />
          <BenefitItemList />
          <Add />
        </>
      )}
    </CommonResizeModal>
  );
};

export default PopUpPayable;
