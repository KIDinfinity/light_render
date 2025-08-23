import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { calcAge } from '@/utils/utils';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import Section, { Fields } from './Section';
import styles from './Claimant.less';

const Claimant = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.claimant}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.claimant-information',
        })}
      >
        <Section form={form} editable={editable}>
          <Fields.RelationshipWithInsured />
          <Fields.Address />
          <Fields.DateOfBirth />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.PhoneNo />
          <Fields.PostCode />
          <Fields.Surname />
          <Fields.Age />
          <Fields.SMS />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, JPCLMOfDataCapture, processTask }: any) => ({
  validating: formCommonController.validating,
  claimant: JPCLMOfDataCapture.claimProcessData?.claimant,
  taskDetail: processTask.getTask,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, taskDetail } = props;
      // @ts-ignore
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'claimantUpdate',
              payload: {
                changedFields: finalChangedFields,
                taskDetail,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'claimantUpdate',
            payload: {
              changedFields: finalChangedFields,
              taskDetail,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { claimant, taskDetail = {} } = props;
      const { submissionDate } = taskDetail;
      const { dateOfBirth } = claimant || {};

      return formUtils.mapObjectToFields({
        ...claimant,
        age: calcAge(dateOfBirth, submissionDate),
      });
    },
  })(Claimant)
);
