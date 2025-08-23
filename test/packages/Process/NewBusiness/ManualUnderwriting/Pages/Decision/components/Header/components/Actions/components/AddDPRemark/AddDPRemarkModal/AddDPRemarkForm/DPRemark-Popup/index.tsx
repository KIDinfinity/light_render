import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import {
  Fields,
  localConfig,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/PostponeDeclineRemark-Popup/index';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useSelectDPRemarkDefalutInsured from './_hooks/useSelectDPRemarkDefalutInsured';
import { v4 as uuidv4 } from 'uuid';

const DPRemarkpopup = ({ form }: any) => {
  useSelectDPRemarkDefalutInsured();
  return (
    <Section
      form={form}
      section="PostponeDeclineRemark-Popup"
      formId={`addDPRemark-Popup-${uuidv4()}`}
      localConfig={localConfig}
    >
      <Fields.Name />
      <Fields.ProductName />
    </Section>
  );
};

const ProductSelect = connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  addDPRemarkSelectedProduct: modelnamepsace.addDPRemarkSelectedProduct,
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
