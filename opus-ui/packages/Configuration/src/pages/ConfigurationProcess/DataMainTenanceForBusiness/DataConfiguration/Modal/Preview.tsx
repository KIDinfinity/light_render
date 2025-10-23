import React from 'react';
import { Form } from 'antd';
import { getDataFieldSection } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';
import FormLayout from '../FormData/FormLayout';
import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { formUtils } from 'basic/components/Form';

export default Form.create({
  mapPropsToFields(props: any) {
    const { formData, dataFieldList } = props;
    const result = tranferResult(dataFieldList, formData);
    return formUtils.mapObjectToFields({ ...result }, {});
  },
})(({ form, dataFieldList, functionCode }: any) => {
  return (
    <FormLayout
      sectionProps={{
        form,
        formId: functionCode,
        disableLayout: true,
        isHideBgColor: true,
        isMargin: false,
      }}
      dataFieldList={getDataFieldSection(dataFieldList, true)}
    />
  );
});
