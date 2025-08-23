import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field';
import transLoadingData from 'process/NewBusiness/ManualUnderwriting/_utils/transLoadingData';
import useGetPlanExtraPremiumLoadingRule from './_hooks/useGetPlanExtraPremiumLoadingRule';

const LoadingSection = ({
  isCopyLoading,
  form,
  coverageId,
  id,
  item,
  editableOfSustainability,
}: any) => {
  const regionCode = tenant.region();
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const loadEdiable = useGetPlanExtraPremiumLoadingRule({ coverageId });

  return (
    <Section
      form={form}
      editable={(isCopyLoading || !loadEdiable) && editable && editableOfSustainability}
      coverageId={coverageId}
      id={id}
    >
      <Fields.ReasonForLoading />
      <Fields.LoadingExtraMortality regionCode={regionCode} />
      <Fields.LoadingEMPeriod />
      <Fields.LoadingPMLoading />
      <Fields.LoadingPMPeriod />
      <Fields.LoadingFlatMortality />
      <Fields.LoadingFMPeriod />
      <Fields.Remark />
      <Fields.LoadingReason />
      <Fields.ReasonType />
      <Fields.ReasonTypeDetail />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFieldsOrigin) {
      const { dispatch, coverageId, id, handleChangeLoading }: any = props;
      if (formUtils.shouldUpdateState(changedFieldsOrigin)) {
        const changedFields = handleChangeLoading({
          changedFields: changedFieldsOrigin,
          reverse: false,
        });
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveLoading',
          payload: {
            changedFields,
            coverageId,
            id,
          },
        });
        if (lodash.size(changedFields) === 1 && changedFields.code) {
          dispatch({
            type: `${NAMESPACE}/supplyUwDecisionEditInd`,
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item, handleChangeLoading } = props;
      const queryItem = formUtils.mapObjectToFields(
        transLoadingData({
          item: handleChangeLoading({
            changedFields: item,
            reverse: true,
          }),
        })
      );
      return queryItem;
    },
  })(LoadingSection)
);
