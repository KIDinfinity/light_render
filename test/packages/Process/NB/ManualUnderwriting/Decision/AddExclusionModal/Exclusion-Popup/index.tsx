import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';
import useSelectExclusionDefaultInsured from 'process/NB/ManualUnderwriting/_hooks/useSelectExclusionDefaultInsured';

const ProductSection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  useSelectExclusionDefaultInsured();

  return (
    <Section form={form} editable={editable} section="Exclusion-Popup">
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
      const { dispatch, validating, coverageList }: any = props;
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
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setProductSection',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'setProductSection',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { productSection } = props;
      return formUtils.mapObjectToFields(productSection);
    },
  })(ProductSection)
);
