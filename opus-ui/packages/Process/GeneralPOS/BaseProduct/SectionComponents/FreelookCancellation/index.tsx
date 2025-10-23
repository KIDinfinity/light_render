import React from 'react';
import { Form } from 'antd';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';
import { useDispatch, connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';

const FreelookCancellation = ({ transactionId, form }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  return (
    <Section form={form} editable={editable} section="FreelookCancellation">
      <Fields.CancelReasonCode id={transactionId} />
      <Fields.OtherReason />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    freelookCancellation:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.freelookCancellation,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'freelookCancellationUpdate',
              payload: {
                changedFields,
                transactionId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'freelookCancellationUpdate',
            payload: {
              changedFields,
              transactionId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { freelookCancellation } = props;
      return formUtils.mapObjectToFields(freelookCancellation);
    },
  })(FreelookCancellation)
);
