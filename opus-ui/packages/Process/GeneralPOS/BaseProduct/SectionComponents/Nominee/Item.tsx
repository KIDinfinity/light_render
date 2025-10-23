import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import Section, { Fields } from './Section';

const Item = ({ form, transactionId, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return (
    <Section form={form} editable={editable} section="Nominee" tableCollect={tableCollect}>
      <Fields.FirstName />
      <Fields.MiddleName transactionId={transactionId} />
      <Fields.Surname />
      <Fields.Name />
      <Fields.Relationship />
      <Fields.BenefitPercentage />
    </Section>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { transactionId, id: index }: any
  ) => ({
    validating: formCommonController.validating,
    item: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.beneficiaryList?.[index],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId, id: index }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'nomineeUpdate',
              payload: {
                changedFields,
                transactionId,
                clientIndex: index,
                type: OperationTypeEnum.UPDATE,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'nomineeUpdate',
            payload: {
              changedFields,
              transactionId,
              clientIndex: index,
              type: OperationTypeEnum.UPDATE,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        name: [
          formUtils.queryValue(item?.firstName),
          formUtils.queryValue(item?.middleName),
          formUtils.queryValue(item?.surname),
        ].join(' '),
      });
    },
  })(Item)
);
