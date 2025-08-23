import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { Fields } from './Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useSelectDefaultLoadingInsured from 'process/NB/ManualUnderwriting/_hooks/useSelectDefaultLoadingInsured';

const Loadingpopup = ({ form }: any) => {
  useSelectDefaultLoadingInsured();
  return (
    <Section form={form} section="Loading-Popup">
      <Fields.Name />

      <Fields.Productname />
    </Section>
  );
};

const ProductSelect = connect(({ manualUnderwriting }: any) => ({
  addingLoadingSelectedProduct: manualUnderwriting.addingLoadingSelectedProduct,
}))(
  Form.create<any>({
    onValuesChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({
        type: `${NAMESPACE}/changeSelectedProductFields`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { addingLoadingSelectedProduct } = props;
      return formUtils.mapObjectToFields(addingLoadingSelectedProduct);
    },
  })(Loadingpopup)
);

ProductSelect.displayName = 'productSelect';

export default ProductSelect;
