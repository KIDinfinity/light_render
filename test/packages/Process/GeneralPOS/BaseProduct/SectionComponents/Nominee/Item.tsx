import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import Section, { Fields } from './Section';
import lodash from 'lodash';

const Item = ({ form, transactionId, tableCollect }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return (
    <Section form={form} editable={editable} section="Nominee" tableCollect={tableCollect}>
      <Fields.FirstName />
      <Fields.MiddleName transactionId={transactionId} />
      <Fields.Surname />
      <Fields.Name />
      <Fields.BeneficiaryType />
      <Fields.Relationship />
      <Fields.BenefitPercentage />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  beneficiaryList: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.beneficiaryList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, beneficiaryList, id }: any = props;
      const index = lodash.findIndex(beneficiaryList, { clientSeq: id });

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'nomineeUpdate',
          payload: {
            changedFields,
            transactionId,
            clientIndex: index,
            type: OperationTypeEnum.UPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { beneficiaryList, id } = props;
      const item = lodash.find(beneficiaryList, { clientSeq: id }) || {};

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
