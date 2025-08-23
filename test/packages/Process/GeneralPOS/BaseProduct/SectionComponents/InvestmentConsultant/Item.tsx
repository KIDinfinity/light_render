import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { StateSectionEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const InvestmentConsultant = ({
  form,
  transactionId,
  remark,
  investmentConsultant,
  personName,
}: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.InvestmentConsultant);
  const ICCode = formUtils.queryValue(investmentConsultant?.investmentConsultantsICCode);
  const fullName = formUtils.queryValue(investmentConsultant?.investmentConsultantsFullName);
  return (
    <Section form={form} editable={editable} section="InvestmentConsultant">
      <Fields.Requester
        transactionId={transactionId}
        remark={remark}
        ICCode={ICCode}
        fullName={fullName}
      />
      <Fields.ValidICInformation />
      <Fields.InvestmentConsultantsFullName fullName={fullName} personName={personName} />
      <Fields.InvestmentConsultantsICCode />
    </Section>
  );
};

export default connect(({ GeneralPOSController }: any, { transactionId }: any) => ({
  investmentConsultant:
    GeneralPOSController?.entities?.transactionTypesMap?.[transactionId]?.investmentConsultant,
  personName: GeneralPOSController?.personName,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'investmentConsultantUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { investmentConsultant }: any = props;

      return formUtils.mapObjectToFields({
        ...investmentConsultant,
        requester: investmentConsultant?.requester
          ? investmentConsultant?.requester
          : defaultOptionByRegion(StateSectionEnum.INVESTMENTCONSULTANT),
        validICInformation: investmentConsultant?.validICInformation === 'Y' ? 1 : 0,
      });
    },
  })(InvestmentConsultant)
);
