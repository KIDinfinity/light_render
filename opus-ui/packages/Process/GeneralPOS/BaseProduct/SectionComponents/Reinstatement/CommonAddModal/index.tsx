import React, { useEffect, useState } from 'react';
import LoadingItems from './LoadingItems';
import ExclusionItems from './ExclusionItems';
import ProductSelect from './ProductSelect';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.less';
import { OperationTypeEnum, BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const Modal = ({ transactionId }) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { visible = false, type = 'loading' } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.commonAddModal) || {};
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const forms = useSelector(({ formCommonController }: any) => formCommonController.forms);
  const [addData, setAddData] = useState({});

  useEffect(() => {
    if (visible) {
      const nonStandardList = lodash.filter(
        uwCoverageList,
        (item) =>
          formUtils.queryValue(item?.uwCoverageDecision?.decision) ===
          BenefitLevelDecisionEnum.NonStandard
      );
      const productUniq = lodash.uniqBy(nonStandardList, 'productCode');
      const clientIdUniq = lodash.uniqBy(nonStandardList, 'clientId');
      setAddData({
        name: (lodash.size(clientIdUniq) === 1 && nonStandardList?.[0]?.clientId) || '',
        productCode: (lodash.size(productUniq) === 1 && nonStandardList?.[0]?.productCode) || '',
        list: [{ id: uuidv4() }],
      });
    }

    return () => {
      if (!visible) {
        setAddData({});
      }
    };
  }, [visible]);

  const handleAdd = () => {
    setAddData((e) => ({
      ...e,
      list: [
        ...(e?.list || []),
        {
          id: uuidv4(),
        },
      ],
    }));
  };

  const handleRemove = () => {
    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: false,
      },
    });
  };

  const handleConfirm = async () => {
    const modalForms = Object.fromEntries(
      Object.entries(forms).filter(([key, value]) =>
        [
          'Reinstatement-Popup',
          'Reinstatement-Exclusion-Popup',
          'Reinstatement-Loading-Popup',
        ].includes(key)
      )
    );

    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(modalForms),
      force: true,
    });

    if (!lodash.isEmpty(errors)) {
      return;
    }

    await dispatch({
      type: `${NAMESPACE}/reinstatementUpdate`,
      payload: {
        type: OperationTypeEnum.ADD,
        modalType: type,
        changedFields: addData,
        transactionId,
      },
    });

    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: false,
      },
    });
  };

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={visible}
      onCancel={handleRemove}
      onReturn={handleRemove}
      onConfirm={handleConfirm}
      returnAuth
      width={820}
      height={500}
    >
      {visible && (
        <div>
          <ProductSelect addData={addData} setAddData={setAddData} transactionId={transactionId} />
          {type === 'loading' && (
            <LoadingItems addData={addData} setAddData={setAddData} transactionId={transactionId} />
          )}
          {type === 'exclusion' && (
            <ExclusionItems
              addData={addData}
              setAddData={setAddData}
              transactionId={transactionId}
            />
          )}
          <div className={styles.addButton}>
            <Button icon="plus" onClick={handleAdd}>
              {`${type}`.toUpperCase()}
            </Button>
          </div>
        </div>
      )}
    </CommonResizeModal>
  );
};

export default ({ transactionId }) => {
  const { visible = false } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.commonAddModal) || {};

  return visible && <Modal transactionId={transactionId} />;
};
