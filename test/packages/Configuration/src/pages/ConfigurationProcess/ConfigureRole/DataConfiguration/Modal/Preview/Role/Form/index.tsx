import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import styles from './index.less';

export default Form.create({
  mapPropsToFields(props: any) {
    const { formData } = props;
    return formUtils.mapObjectToFields(formData, {});
  },
})(({ form }: any) => {
  return (
    <div className={styles.container}>
      <FormSection
        form={form}
        formId="configureRole"
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layConf={{
          default: 8,
        }}
      >
        <FormItemInput
          form={form}
          disabled
          formName="role_code"
          labelId="RoleCode"
          labelTypeCode="Label_COM_General"
        />
        <FormItemInput
          form={form}
          disabled
          formName="role_name"
          labelId="RoleName"
          labelTypeCode="Label_COM_General"
        />
        <FormItemInput
          form={form}
          disabled
          formName="role_desc"
          labelId="UserGroupDescription"
          labelTypeCode="Label_COM_General"
        />
      </FormSection>
    </div>
  );
});
