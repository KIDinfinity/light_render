import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const PPY = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return (
    <div className={styles.payBox}>
      <SectionDafault
        form={form}
        editable={editable}
        section="PaymentMethod"
        tableCollect={() => {}}
      >
        <Fields.PromptPayId transactionId={transactionId} />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  txPmPromptPayList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0]
      ?.txPmPromptPayList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentMethodUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.LISTINFOUPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { txPmPromptPayList } = props;
      const values = txPmPromptPayList?.[0] || {};
      return formUtils.mapObjectToFields({
        ...values,
      });
    },
  })(PPY)
);
