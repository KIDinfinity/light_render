import React from 'react';
import { formUtils } from 'basic/components/Form';
import { Icon, Form } from 'antd';
import { connect } from 'dva';
import { NAMESPACE } from '../../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as TriangleIcon } from 'process/assets/triangle.svg';
import styles from './index.less';
import Section, { Fields } from './Section';
import TransactionInfoSection, {
  Fields as TransactionInfoFields,
} from '../TransactionInfo/Section';

const PolicyTitle = ({ policyForm, editable, form, isNotDataCapture }: any) => {
  return (
    <div className={styles.container}>
      <Icon component={TriangleIcon} className={styles.icon} />
      <span className={styles.info}>
        <span className={styles.policyNo}>
          {formatMessageApi({ Label_COM_General: 'PolicyNo' })}
        </span>
        <Section form={policyForm} editable={editable} section="PolicyInfo">
          <Fields.PolicyNo compact={true} />
        </Section>
        {isNotDataCapture && (
          <>
            <div className={styles.divider}>|</div>
            <TransactionInfoSection form={form} editable={editable} section="TransactionInfo">
              <TransactionInfoFields.TransactionTypeCode compact={true} />
            </TransactionInfoSection>
          </>
        )}
      </span>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    transcationType: modelnamepsace.entities?.transactionTypesMap?.[transactionId],
    caseCategory: processTask?.getTask?.caseCategory,
  })
)(
  Form.create({
    async onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        await dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'transactionInfoUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
        dispatch({
          type: `${NAMESPACE}/saveSnapshot`,
        });
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType } = props;
      return formUtils.mapObjectToFields(transcationType);
    },
  })(PolicyTitle)
);
