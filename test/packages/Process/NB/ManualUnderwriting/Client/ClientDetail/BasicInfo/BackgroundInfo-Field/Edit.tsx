import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useLoadOccupationCodeDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadOccupationCodeDropdown';
import useAutoSetOccupationCodeValue from 'process/NB/ManualUnderwriting/_hooks/useAutoSetOccupationCodeValue';
import useLoadCfgOccupationRiskLevel from 'process/NB/ManualUnderwriting/_hooks/useLoadCfgOccupationRiskLevel';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import styles from './edit.less';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import lodash from 'lodash';
import OccupationRiskLevel from 'process/NB/ManualUnderwriting/Enum/OccupationRiskLevel';

const Backgroundinfofield = ({ form, id, isSubCard, item }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  useLoadOccupationCodeDropdown({ id });
  useAutoSetOccupationCodeValue({ id });
  useLoadCfgOccupationRiskLevel();
  const cfgOccupationRiskLevel = useSelector(
    ({ [NAMESPACE]: model }) => model.cfgOccupationRiskLevel
  );
  const natureofbusinessVisible = useMemo(() => {
    return tenant.region({
      [Region.VN]: () => {
        const cfg = lodash.find(
          cfgOccupationRiskLevel,
          (cfgItem) => cfgItem.code === formUtils.queryValue(item?.occupationCode)
        );
        return cfg ? cfg.riskLevel === OccupationRiskLevel.HighRisk : false;
      },
      notMatch: true,
    });
  }, [item?.occupationCode, cfgOccupationRiskLevel]);

  return (
    <Section
      section="BackgroundInfo-Field"
      localConfig={localConfig}
      form={form}
      className={styles.sectionContainer}
      icon="profile"
      gateway={gateway}
    >
      <Fields.Educationcode />
      <Fields.Englishproficiency />
      <Fields.Ckaflag />
      <Fields.Occupationclass id={id} />
      <Fields.Occupationgroup id={id} />
      <Fields.OccupationSubGroup id={id} />
      <Fields.Occupationcode id={id} />
      <Fields.Employmentstatus />
      <Fields.Position id={id} />
      <Fields.Positiondescription />
      <Fields.UnitsName id={id} />
      <Fields.Employercountry />
      <Fields.Employerzipcode />
      <Fields.Employeraddressline1 />
      <Fields.Employeraddressline2 />
      <Fields.Employeraddressline3 />
      <Fields.Employeraddressline4 />
      <Fields.Natureofbusiness visible={natureofbusinessVisible} />
      <Fields.Nameofbusinessemployer />
      <Fields.Occupation id={id} />
      <Fields.OccupationSector />
      <Fields.Nonincomeearnertype />
      <Fields.EntityAffiliation id={id} />
      <Fields.ExactAffiliation1 id={id} />
      <Fields.ExactAffiliation2 id={id} />
      <Fields.IndustryAffiliation1 id={id} />
      <Fields.IndustryAffiliation2 id={id} />
      <Fields.StaffId id={id} />
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
  })(Backgroundinfofield)
);
