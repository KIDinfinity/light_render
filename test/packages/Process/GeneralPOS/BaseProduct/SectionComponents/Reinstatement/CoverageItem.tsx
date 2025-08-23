import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section/CoverageSection';
import styles from './index.less';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

const Item = ({ form, transactionId, tableCollect }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Reinstatement);
  return (
    <div className={styles.coverageItem}>
      <SectionDafault
        form={form}
        editable={editable}
        section="Reinstatement-Coverage"
        tableCollect={tableCollect}
      >
        <Fields.Decision transactionId={transactionId} />
        <Fields.ClientId transactionId={transactionId} />
        <Fields.ProductCode transactionId={transactionId} />
        <Fields.SumAssured transactionId={transactionId} />
        <Fields.IndemnifyPeriod transactionId={transactionId} />
        <Fields.IndemnifyAgePeriod transactionId={transactionId} />
        <Fields.PayPeriod transactionId={transactionId} />
        <Fields.PayAgePeriod transactionId={transactionId} />
        <Fields.BasePremium transactionId={transactionId} />
        <Fields.LoadingPremium transactionId={transactionId} />
        <Fields.InstalmentPremiumWithTax transactionId={transactionId} />
      </SectionDafault>
    </div>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, coverageIndex }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'reinstatementUpdate',
          payload: {
            type: OperationTypeEnum.LISTINFOUPDATE,
            modalType: 'coverage',
            changedFields,
            transactionId,
            coverageIndex,
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
