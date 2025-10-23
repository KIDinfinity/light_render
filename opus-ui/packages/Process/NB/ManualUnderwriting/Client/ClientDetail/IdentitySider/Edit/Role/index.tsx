import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import {
  Fields,
  localConfig,
} from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useGetRoleDictByClientId from 'process/NB/ManualUnderwriting/_hooks/useGetRoleDictByClientId';
import styles from './index.less';

const Role = ({ form, id, isSubCard, roleFormFields = {} }: any) => {
  const { customerRole = [] } = roleFormFields;
  const roleDicts = useGetRoleDictByClientId({ id, isSubCard, customerRole });
  return (
    <Section
      form={form}
      localConfig={localConfig}
      section="CommonClientInfo-Field"
      className={styles.rolesContainer}
    >
      <Fields.Customerrole roleDicts={roleDicts} isSubCard={isSubCard} />
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
              target: 'changeRole',
              payload: {
                changedFields,
                clientId: id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeRole',
            payload: {
              changedFields,
              clientId: id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { roleFormFields } = props;
      return formUtils.mapObjectToFields(roleFormFields);
    },
  })(Role)
);
