import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NB/ManualUnderwriting/Decision/Benefit/Loading-Field/Section';
import transLoadingData from 'process/NB/ManualUnderwriting/utils/transLoadingData';

const LoadingSection = ({ form, coverageId, id }: any) => {
  const regionCode = tenant.region();

  return (
    <Section form={form} editable={false}>
      <Fields.ReasonForLoading coverageId={coverageId} id={id} />
      <Fields.LoadingExtraMortality regionCode={regionCode} coverageId={coverageId} id={id} />
      <Fields.LoadingEMPeriod coverageId={coverageId} id={id} />
      <Fields.LoadingPMLoading coverageId={coverageId} id={id} />
      <Fields.LoadingPMPeriod coverageId={coverageId} id={id} />
      <Fields.LoadingFlatMortality coverageId={coverageId} id={id} />
      <Fields.LoadingFMPeriod coverageId={coverageId} id={id} />
      <Fields.LoadingReason />
      <Fields.WaiveTerm />
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
