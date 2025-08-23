import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field/index';
import transLoadingData from 'process/NewBusiness/ManualUnderwriting/_utils/transLoadingData';

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
