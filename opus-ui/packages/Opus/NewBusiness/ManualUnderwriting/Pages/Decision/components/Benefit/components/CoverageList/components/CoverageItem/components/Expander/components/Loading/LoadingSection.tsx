import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field';
import transLoadingData from 'opus/NewBusiness/ManualUnderwriting/_utils/transLoadingData';
import useJudgeIsCopyLoading from './_hooks/useJudgeIsCopyLoading';

const LoadingSection = ({
  form,
  coverageId,
  id,
  editableOfSustainability,
  loadingDisabled,
}: any) => {
  const regionCode = tenant.region();
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const isCopyLoading = useJudgeIsCopyLoading({ loadingId: id, coverageId });

  const loadingEditable = !loadingDisabled || isCopyLoading;

  return (
    <Section
      form={form}
      coverageId={coverageId}
      id={id}
      editable={editable && loadingEditable && editableOfSustainability}
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
      <Fields.ReasonInd />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  companyCode: modelnamepsace.businessData?.laCompanyCode || '2',
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
          // call接口应该在实际更新完数据之后，不过这里更新数据实际上是同步的，就不需要await（取决于saveFormData实现）
          if (lodash.size(changedFields) === 1 && changedFields.code) {
            dispatch({
              type: `${NAMESPACE}/supplyUwDecisionEditInd`,
            });
          }
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item, handleChangeLoading, companyCode } = props;
      const queryItem = formUtils.mapObjectToFields(
        transLoadingData({
          item: handleChangeLoading({
            changedFields: { ...item, companyCode },
            reverse: true,
          }),
        })
      );
      return queryItem;
    },
  })(LoadingSection)
);
