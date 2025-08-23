import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Exclusion-Popup/index.tsx';
import useSelectExclusionDefaultInsured from './_hooks/useSelectExclusionDefaultInsured';
import { v4 as uuidv4 } from 'uuid';

const ProductSection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  useSelectExclusionDefaultInsured();

  return (
    <Section
      form={form}
      editable={editable}
      section="Exclusion-Popup"
      formId={`addExclusion-Popup-${uuidv4()}`}
    >
      <Fields.Name />
      <Fields.Productname />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  productSection: modelnamepsace.productSection,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, coverageList }: any = props;
      const productCodeList: any = [];
      lodash.map(formUtils.queryValue(changedFields.productName), (value: any) => {
        const product = lodash.find(coverageList, (item) => item.coreCode === value);
        const productCode = product ? value : 'All';

        productCodeList.push({
          id: '',
          productCode,
        });
      });

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setProductSection',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { productSection } = props;
      return formUtils.mapObjectToFields(productSection);
    },
  })(ProductSection)
);
