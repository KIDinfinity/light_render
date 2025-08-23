import React, { useCallback } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { ReactComponent as OtherIcon } from 'process/assets/other.svg';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import useGetOrderInfoFieldConfigFilterCallback from 'process/NB/ManualUnderwriting/_hooks/useGetOrderInfoFieldConfigFilterCallback';
const Otherinfofield = ({ form, id, isSubCard }: any) => {
  const filterByChannel = useGetOrderInfoFieldConfigFilterCallback();
  const filterByRoles = useHandleExtraConfigCallback({ id, isSubCard });
  const gateway = useCallback(
    ({ config }) => {
      return filterByRoles({
        config: filterByChannel(config),
      });
    },
    [filterByChannel, filterByRoles]
  );

  return (
    <Section
      localConfig={localConfig}
      section="OtherInfo-Field"
      form={form}
      icon={<OtherIcon />}
      gateway={gateway}
      id={id}
    >
      <Fields.Promotionsby />
      <Fields.Agreement />
      <Fields.Consentprocessing />
      <Fields.Specify />
      <Fields.PassionSurvey />
      <Fields.OtherPassionSurvey />
      <Fields.Rbascore />
      <Fields.Vulnerablecustomeroption />
      <Fields.Vulnerablecustomertag id={id} />
      <Fields.Mibcodelist />
      <Fields.OCRFlag />
      <Fields.Legalrepresentativeid />
      <Fields.Currentmibcode />
      <Fields.OtherContract />
      <Fields.NumberOfOtherCompany />
      <Fields.NumberOfPoliciesORClaimsInOtherComp />
      <Fields.FacialVerificationFlag />
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
      if (!lodash.chain(item).get('promotionsBy').isNil().value()) {
        return formUtils.mapObjectToFields(item, {
          promotionsBy: (value: any) => {
            if (lodash.isString(value) && lodash.includes(value, ',')) {
              return lodash.split(value, ',').map((promotionsByItem) => {
                return lodash.replace(promotionsByItem, ',', '');
              });
            }
            return value;
          },
        });
      }

      return formUtils.mapObjectToFields({
        ...item,
        promotionsBy: undefined,
      });
    },
  })(Otherinfofield)
);
