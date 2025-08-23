import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <>
      <Section form={form} editable={editable} section="ChangeRenewalMethod">
        <Fields.BankAccountName />
        <Fields.BankAccountNo />
        <Fields.BankCode />
        <Fields.BranchCode />
      </Section>
    </>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  changeRenewalMethod:
    modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.paymentInMethodList?.[0]
      ?.paymentBankList?.[0],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/ChangeRenewalMethodUpdate`,
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { changeRenewalMethod } = props;
      return formUtils.mapObjectToFields(changeRenewalMethod);
    },
  })(Item)
);
