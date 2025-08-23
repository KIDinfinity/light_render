import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section/CoverageSection';
import styles from './index.less';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

const Item = ({ form, transactionId, tableCollect, readyOnly, id }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.AddNewRiders) && !readyOnly;
  const sclale = 0.88;
  const deleteItemHandle = () => {
    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'addNewRidersUpdate',
      payload: {
        type: OperationTypeEnum.DELETE,
        modalType: 'coverage',
        id,
        transactionId,
      },
    });
  };
  return (
    <div className={styles.coverageItem}>
      <SectionDafault
        form={form}
        editable={editable}
        section="AddNewRiders-Coverage"
        tableCollect={tableCollect}
        sclale={sclale}
      >
        <Fields.Decision transactionId={transactionId} sclale={sclale} />
        <Fields.ClientId transactionId={transactionId} sclale={sclale} />
        <Fields.ProductCode transactionId={transactionId} sclale={sclale} id={id} />
        <Fields.SumAssured transactionId={transactionId} sclale={sclale} />
        <Fields.IndemnifyPeriod transactionId={transactionId} sclale={sclale} />
        <Fields.IndemnifyAgePeriod transactionId={transactionId} sclale={sclale} />
        <Fields.PayPeriod transactionId={transactionId} sclale={sclale} />
        <Fields.PayAgePeriod transactionId={transactionId} sclale={sclale} />
        <Fields.BasePremium transactionId={transactionId} sclale={sclale} />
        <Fields.LoadingPremium transactionId={transactionId} sclale={sclale} />
        <Fields.InstalmentPremiumWithTax transactionId={transactionId} sclale={sclale} />
      </SectionDafault>
      <div className={styles.btn}>
        <div className={styles.icon} onClick={() => deleteItemHandle()}>
          <Icon type="close" />
        </div>
      </div>
    </div>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, coverageIndex, id }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'addNewRidersUpdate',
          payload: {
            type: OperationTypeEnum.LISTINFOUPDATE,
            modalType: 'coverage',
            changedFields,
            transactionId,
            coverageIndex,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        decision: item?.uwCoverageDecision?.decision,
        loadingPremium: item?.loadingPremium || 0,
      });
    },
  })(Item)
);
