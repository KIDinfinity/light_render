import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';

const Financialinfotable = ({ form, id, crtItemId, rowIndex }: any) => {
  const usTaxFlag = useGetClientInfoFieldValueByKey({ id, key: 'usTaxFlag' });
  return (
    <Section section="FinancialInfo-Table" form={form} localConfig={localConfig}>
      <Fields.CtfCountryCode id={id} crtItemId={crtItemId} />
      <Fields.CtfId crtItemId={crtItemId} id={id} />
      <Fields.Reasonflag crtItemId={crtItemId} />
      <Fields.Reason crtItemId={crtItemId} id={id} />
      <Fields.AdditionalReason crtItemId={crtItemId} id={id} />
      <Fields.CountryofTaxResidence
        id={id}
        crtItemId={crtItemId}
        requiredConditions={rowIndex === 0 && usTaxFlag === 'Y'}
      />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id, crtItemId } = props;
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'changeCrtInfoFields',
            payload: {
              changedFields,
              id,
              crtItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'changeCrtInfoFields',
          payload: {
            changedFields,
            id,
            crtItemId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Financialinfotable)
);
