import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { Fields, localConfig } from './Section';
import styles from './edit.less';
import { v4 as uuidv4 } from 'uuid';

const Contactinfofield = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  const formId = uuidv4();
  return (
    <Section
      section="ContactInfo-Field"
      localConfig={localConfig}
      form={form}
      placeholder
      className={styles.sectionContainer}
      gateway={gateway}
      formId={formId}
    >
      <Fields.Telegram />

      <Fields.Whatsapp />

      <Fields.Phoneno />

      <Fields.Worknumber />

      <Fields.Language />

      <Fields.Homenumber />

      <Fields.Email id={id} />

      <Fields.CommunicationLane />

      <Fields.CorrespondenceViaEmail />
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
              target: 'handleChangeContactInfoField',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'handleChangeContactInfoField',
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
  })(Contactinfofield)
);
