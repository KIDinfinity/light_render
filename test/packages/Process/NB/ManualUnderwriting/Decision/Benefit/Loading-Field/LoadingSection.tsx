import React from 'react';
import { Form } from 'antd';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';
import transLoadingData from 'process/NB/ManualUnderwriting/utils/transLoadingData';
import useGetPlanExtraPremiumLoadingRule from 'process/NB/ManualUnderwriting/_hooks/useGetPlanExtraPremiumLoadingRule';

const LoadingSection = ({ form, coverageId, id, editableOfSustainability }: any) => {
  const regionCode = tenant.region();
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const loadEdiable = useGetPlanExtraPremiumLoadingRule({ coverageId });

  return (
    <Section form={form} editable={editable && !loadEdiable && editableOfSustainability}>
      <Fields.ReasonForLoading coverageId={coverageId} id={id} />
      <Fields.LoadingExtraMortality regionCode={regionCode} coverageId={coverageId} id={id} />
      <Fields.LoadingEMPeriod coverageId={coverageId} id={id} />
      <Fields.LoadingPMLoading coverageId={coverageId} id={id} />
      <Fields.LoadingPMPeriod coverageId={coverageId} id={id} />
      <Fields.LoadingFlatMortality coverageId={coverageId} id={id} />
      <Fields.LoadingFMPeriod coverageId={coverageId} id={id} />
      <Fields.Remark />
      <Fields.LoadingReason />
      <Fields.ReasonType />
      <Fields.ReasonTypeDetail />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFieldsOrigin) {
      const { dispatch, validating, coverageId, id, handleChangeLoading }: any = props;
      if (formUtils.shouldUpdateState(changedFieldsOrigin)) {
        const changedFields = handleChangeLoading({
          changedFields: changedFieldsOrigin,
          reverse: false,
        });
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveLoading',
              payload: {
                changedFields,
                coverageId,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveLoading',
            payload: {
              changedFields,
              coverageId,
              id,
            },
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
