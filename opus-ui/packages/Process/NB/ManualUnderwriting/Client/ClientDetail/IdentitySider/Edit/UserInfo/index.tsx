import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import {
  Fields,
  localConfig,
} from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';

const UserInfo = ({ form, id }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard:false });
  return (
    <Section
      form={form}
      localConfig={localConfig}
      section="CommonClientInfo-Field"
      gateway={gateway}
    >
      <Fields.Title id={id} />

      <Fields.Firstname />

      <Fields.Middlename />

      <Fields.Surname />

      <Fields.Extensionname />

      <Fields.Customerenextensionname id={id} />

      <Fields.Customerenmiddlename id={id} />

      <Fields.Customerensurname />

      <Fields.Entityname />

      <Fields.Customerenfirstname id={id} />

      <Fields.Companyname />
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
  })(UserInfo)
);
