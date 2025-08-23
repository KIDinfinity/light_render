import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form, id, index }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/servicingRequestInfoInit`,
      payload: {
        id,
      },
    });
  }, [servicingInit]);

  return (
    <FormBorderCard marginBottom>
      <Section form={form} editable={editable} section="ServicingRequestInfo">
        <Fields.TransactionTypeCode index={index} />
        <Fields.Decision id={id} />
        <Fields.DeclineReason />
        <Fields.EditDeclineReason />
        <Fields.EffectiveDate />
        <Fields.ReferenceTransactionNo />
        <Fields.Remark />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    transcationType: modelnamepsace.entities?.transactionTypesMap?.[id],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'servicingRequestInfoUpdate',
              payload: {
                changedFields,
                transactionId: id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'servicingRequestInfoUpdate',
            payload: {
              changedFields,
              transactionId: id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType } = props;

      return formUtils.mapObjectToFields({
        ...transcationType,
        // remark不可编辑，只做国际化转换
        remark: formUtils
          .queryValue(transcationType?.remark)
          ?.replace?.(/(\w+)/g, (remark: string) =>
            formatMessageApi({
              Servicing_Deny_Reason: remark,
            })
          ),
      });
    },
  })(Item)
);
