import React from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import styles from './index.less';

const Add = ({ form, transactionId, dispatch }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Reinstatement);

  return (
    <div className={styles.header}>
      <div className={styles.flex1}>
        <Section form={form} editable={editable} section="Reinstatement-UWPolicyDecision">
          <Fields.Decision transactionId={transactionId} />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  uwPolicyDecision:
    modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwPolicyDecision,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'reinstatementUpdate',
          payload: {
            type: OperationTypeEnum.UPDATE,
            changedFields,
            transactionId,
            updateKey: 'uwPolicyDecision',
          },
        });
      }
    },
    mapPropsToFields(props) {
      return formUtils.mapObjectToFields(props.uwPolicyDecision);
    },
  })(Add)
);
