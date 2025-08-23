import React from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formUtils } from 'basic/components/Form';
import useHandleDeleteAddingExclusionItem from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteAddingExclusionItem';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import ExclusionSection from './ExclusionSection';
import ProductSection from './Exclusion-Popup';
import styles from './index.less';

const AddExclusionModal = () => {
  const onDeleteExclusionItem = useHandleDeleteAddingExclusionItem();
  const dispatch = useDispatch();
  const isShowPopUpDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowPopUpDecision
  );
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const addPopExclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addPopExclusionList
  );
  const forms = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.forms);
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList', []);
  const editable = true;

  const addPopExclusion = () => {
    dispatch({
      type: `${NAMESPACE}/addPopExclusionList`,
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
    dispatch({
      type: `${NAMESPACE}/addExclusionList`,
      payload: {
        addPopExclusionList: lodash.cloneDeep(addPopExclusionList),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/saveShowPopUpDecision`,
      payload: {
        isShowPopUpDecision: false,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/clearPopExclusionList`,
    });
  };

  const onClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/saveShowPopUpDecision`,
      payload: {
        isShowPopUpDecision: false,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/clearBenefitRecord`,
    });
    await dispatch({
      type: `${NAMESPACE}/clearPopExclusionList`,
    });
  };

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={isShowPopUpDecision}
      onReturn={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      returnAuth
      width={820}
      height={500}
    >
      <div className={styles.wrap}>
        <div className={styles.productDecision}>
          <ProductSection coverageList={coverageList} />
        </div>
        {lodash.map(addPopExclusionList, (item: any, index: any) => {
          return (
            <div key={item?.id} className={styles.exclusionDecision}>
              {index > 0 ? (
                <Icon
                  type="close"
                  className={styles.close}
                  onClick={() =>
                    onDeleteExclusionItem({
                      exclusionItemId: item?.id,
                    })
                  }
                />
              ) : null}
              <ExclusionSection id={item?.id} item={item} />
            </div>
          );
        })}
        <div className={styles.add}>
          <Button icon="plus" onClick={addPopExclusion}>
            Exclusion
          </Button>
        </div>
      </div>
    </CommonResizeModal>
  );
};

export default AddExclusionModal;
