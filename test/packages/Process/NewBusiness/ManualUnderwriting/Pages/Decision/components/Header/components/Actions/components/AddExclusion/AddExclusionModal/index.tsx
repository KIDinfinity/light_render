import React, { useCallback } from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ExclusionFieldSection from './components/ExclusionFieldSection/index';
import ExclusionPopupSection from './components/ExclusionPopupSection';
import styles from './index.less';

const AddExclusionModal = () => {
  const dispatch = useDispatch();

  const onDeleteExclusionItem = useCallback(
    ({ id }) => {
      dispatch({
        type: `${NAMESPACE}/deleteExclusionItem`,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );
  const isShowPopUpDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowPopUpDecision
  );
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList
  );
  const addPopExclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addPopExclusionList
  );
  const forms =
    useSelector(({ formCommonController }: any) => {
      const formList = [];
      const _forms = formCommonController?.forms ?? {};
      Object.keys(_forms).forEach((key) => {
        if (key.includes('addExclusion')) {
          formList.push(_forms[key]);
        }
      });
      return formList;
    }, shallowEqual) || [];
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
    dispatch({
      type: `${NAMESPACE}/supplyUwDecisionEditInd`,
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
      {isShowPopUpDecision && (
        <div className={styles.wrap}>
          <div className={styles.productDecision}>
            <ExclusionPopupSection coverageList={coverageList} />
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
                        id: item?.id,
                      })
                    }
                  />
                ) : null}
                <ExclusionFieldSection id={item?.id} item={item} />
              </div>
            );
          })}
          <div className={styles.add}>
            <Button icon="plus" onClick={addPopExclusion}>
              Exclusion
            </Button>
          </div>
        </div>
      )}
    </CommonResizeModal>
  );
};

export default AddExclusionModal;
