import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { Fields } from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Popup/index.tsx';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useSelectDefaultLoadingInsured from './_hooks/useSelectDefaultLoadingInsured';
import { v4 as uuid } from 'uuid';

const Loadingpopup = (props: any) => {
  const { form } = props;

  useSelectDefaultLoadingInsured();
  return (
    <Section form={form} section="Loading-Popup" formId={`addLoading-Popup-${uuid()}`}>
      <Fields.Name />
      <Fields.Productname />
    </Section>
  );
};

const ProductSelect = connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  addingLoadingSelectedProduct: modelnamepsace.addingLoadingSelectedProduct,
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
