import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId, tableCollect }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section="Refund" tableCollect={tableCollect}>
        <Fields.SubAcBalance transactionId={transactionId} />
        <Fields.SubAcCurrency transactionId={transactionId} />
        <Fields.SubAccount transactionId={transactionId} />
        <Fields.PolicyNo transactionId={transactionId} />
        <Fields.RefundAmount transactionId={transactionId} />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    task: processTask?.getTask,

    refundAccountList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.refund?.refundAccountList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'refundUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { refundAccountList, task, id: index } = props;
      const item = refundAccountList?.[index] || {};
      return formUtils.mapObjectToFields({
        ...item,
        subAccount: `${item?.subAcCode} ${item?.subAcType}`,
      });
    },
  })(Item)
);
