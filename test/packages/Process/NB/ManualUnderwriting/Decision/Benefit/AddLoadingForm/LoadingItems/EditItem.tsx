import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import transLoadingData from 'process/NB/ManualUnderwriting/utils/transLoadingData';

const Loadingfield = ({ form, dependency, loadingId }: any) => {
  const editable = true;
  return (
    <Section
      layoutName="add-loading-layout"
      form={form}
      editable={editable}
      coverageId={dependency?.coverageId}
      productId={dependency?.productId}
      loadingId={loadingId}
    >
      <Fields.Pmloading />

      {/* <Fields.Pmperiod /> */}

      <Fields.Flatmortality />

      <Fields.Extramortality />

      <Fields.Code />

      <Fields.ReasonType />

      <Fields.ReasonTypeDetail />

      {/* <Fields.Fmperiod /> */}

      {/* <Fields.Emperiod /> */}
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onValuesChange(props: any, changedFieldsOrigin: any) {
      const { loadingId, dispatch, handleChangeLoading } = props;
      const changedFields = handleChangeLoading({
        changedFields: changedFieldsOrigin,
        reverse: false,
      });
      dispatch({
        type: `${NAMESPACE}/handleChangeAddingLoadingItem`,
        payload: {
          id: loadingId,
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { item, handleChangeLoading } = props;
      const regionCode = tenant.region();
      return formUtils.mapObjectToFields(
        transLoadingData({
          item: handleChangeLoading({
            changedFields: item,
            reverse: true,
          }),
          regionCode,
        })
      );
    },
  })(Loadingfield)
);
