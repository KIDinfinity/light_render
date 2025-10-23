import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { Fields } from './Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { localConfig } from './Section/index';
import useSelectDPRemarkDefalutInsured from 'process/NB/ManualUnderwriting/_hooks/useSelectDPRemarkDefalutInsured';

const DPRemarkpopup = ({ form }: any) => {
  useSelectDPRemarkDefalutInsured();
  return (
    <Section form={form} section="PostponeDeclineRemark-Popup" localConfig={localConfig}>
      <Fields.Name />
      <Fields.ProductName />
    </Section>
  );
};

const ProductSelect = connect(({ manualUnderwriting }: any) => ({
  addDPRemarkSelectedProduct: manualUnderwriting.addDPRemarkSelectedProduct,
}))(
  Form.create<any>({
    onValuesChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({
        type: `${NAMESPACE}/changeSelectedDPRemarkProductFields`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { addDPRemarkSelectedProduct } = props;
      return formUtils.mapObjectToFields(addDPRemarkSelectedProduct);
    },
  })(DPRemarkpopup)
);

ProductSelect.displayName = 'productSelect';

export default ProductSelect;
