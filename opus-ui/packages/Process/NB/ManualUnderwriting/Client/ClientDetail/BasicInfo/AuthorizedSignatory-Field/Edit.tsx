import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { ReactComponent as CountryIcon } from 'process/assets/country.svg';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const Authorizedsignatoryfield = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  return (
    <Section
      section="Authorized signatory-Field"
      localConfig={localConfig}
      form={form}
      icon={<CountryIcon />}
      gateway={gateway}
    >
      <Fields.Authorizedrepresentative />

      <Fields.Representativeidtype />

      <Fields.Representativeidno />

      <Fields.Representativeidexpirydate />

      <Fields.Representativeposition />

      <Fields.Artitle />

      <Fields.Arfirstname />

      <Fields.Armiddlename />

      <Fields.Arsurname />

      <Fields.Arextensionname />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeBasicInfoFields',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeBasicInfoFields',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Authorizedsignatoryfield)
);
