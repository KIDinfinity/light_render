import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { ReactComponent as CountryIcon } from 'process/assets/country.svg';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import styles from './edit.less';

const Nationalityinfofield = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id });

  return (
    <Section
      section="NationalityInfo-Field"
      form={form}
      localConfig={localConfig}
      icon={isTargetRelationOfInsured || <CountryIcon />}
      gateway={gateway}
      className={styles.sectionContainer}
    >
      <Fields.Usresidenceaddress7 id={id} />

      <Fields.Usresidenceaddress6 id={id} />

      <Fields.Usresidenceaddress5 id={id} />

      <Fields.Usresidenceaddress4 id={id} />

      <Fields.Usresidenceaddress3 id={id} />

      <Fields.Usresidenceaddress2 id={id} />

      <Fields.Usresidenceaddress1 id={id} />

      <Fields.Usresidencezipcode id={id} />

      <Fields.Usresidenceaddress />

      <Fields.Nationality id={id} />

      <Fields.Malaysianpr />

      <Fields.Usaflag />

      <Fields.Countryofresident />

      <Fields.Ctfcountrycode id={id} />

      <Fields.Greencard />

      <Fields.Fulladdress />
      <Fields.Ustn id={id} />

      <Fields.CtfPlace id={id} />

      <Fields.Nationality2 />

      <Fields.Nationality3 />
    </Section>
  );
};

const NationalityinfofieldWrapper = (props) => {
  return <Nationalityinfofield {...props} />;
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
  })(NationalityinfofieldWrapper)
);
