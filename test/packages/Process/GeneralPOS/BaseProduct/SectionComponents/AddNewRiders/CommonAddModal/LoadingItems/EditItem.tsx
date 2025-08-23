import React from 'react';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

const Loadingfield = ({ form, addData, dependency, loadingId }: any) => {
  const editable = true;
  return (
    <Section
      formId="Reinstatement-Loading-Popup"
      form={form}
      editable={editable}
      coverageId={dependency?.coverageId}
      productId={dependency?.productId}
      loadingId={loadingId}
      section="Reinstatement-Loading-Popup"
    >
      <Fields.Code addData={addData} />
      <Fields.Pmloading addData={addData} />
      <Fields.Flatmortality addData={addData} />
    </Section>
  );
};

export default Form.create<any>({
  onFieldsChange(props, changedFields) {
    const { setAddData, id } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      setAddData((e) => ({
        ...e,
        list: lodash.map(e?.list, (item) => {
          if (item?.id === id) {
            const data = { ...item, ...changedFields };
            if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'pmLoading')) {
              data.flatMortality = null;
            }
            if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'flatMortality')) {
              data.pmLoading = null;
            }
            return data;
          }
          return item;
        }),
      }));
    }
  },
  mapPropsToFields(props) {
    return formUtils.mapObjectToFields(props.item);
  },
})(Loadingfield);
