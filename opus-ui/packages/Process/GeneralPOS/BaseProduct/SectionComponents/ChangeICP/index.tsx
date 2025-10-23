import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const ChangePayment = ({ transactionId, form }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="ChangeICP">
      <Fields.IcpOption />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    changeIcp: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeIcp,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeICPUpdate',
              payload: {
                changedFields,
                transactionId,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeICPUpdate',
            payload: {
              changedFields,
              transactionId,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { changeIcp } = props;

      return formUtils.mapObjectToFields(changeIcp);
    },
  })(ChangePayment)
);
