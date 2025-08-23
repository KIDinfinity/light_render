import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import { connect } from 'dva';
import { VLD_000267 } from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/Validator';
import styles from './index.less';

export default connect(
  ({ configureRoleController }: any, { formData, taskNotEditable, hideAdd }: any) => ({
    allOrganization: configureRoleController?.allOrganization,
    isUpdateMultiple: configureRoleController?.isUpdateMultiple,
    isUpdate: configureRoleController?.isUpdate,
    functionData: configureRoleController?.functionData,
    rows: configureRoleController?.listPage?.rows,
    formData: formData || configureRoleController?.formData,
    taskNotEditable: taskNotEditable || configureRoleController?.taskNotEditable,
    isAdd: hideAdd || configureRoleController?.isAdd,
  })
)(
  Form.create({
    onValuesChange(props, changeValues) {
      const { formData, dispatch }: any = props;
      dispatch({
        type: 'configureRoleController/updateFormData',
        payload: {
          formData: {
            ...formData,
            data: {
              ...formData?.data,
              ...changeValues,
            },
          },
        },
      });
    },
    mapPropsToFields(props: any) {
      const { formData: { data = {} } = {} } = props;
      return formUtils.mapObjectToFields(data);
    },
  })((props) => {
    const {
      form,
      rows,
      functionData,
      formData,
      isAdd,
      taskNotEditable,
      isUpdateMultiple,
      isUpdate,
      isDuplicateShow = false,
    }: any = props;
    const isNotEditable = isUpdateMultiple || isUpdate;
    return (
      <div className={styles.user}>
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
            disabled={taskNotEditable || isNotEditable}
            formName="role_code"
            labelId="RoleCode"
            required
            labelTypeCode="Label_COM_General"
            className={styles.userInput}
            rules={
              isAdd
                ? [
                    {
                      validator: VLD_000267({
                        formData,
                        rows,
                        functionData,
                        key: 'role_code',
                        transfer: false,
                      }),
                    },
                  ]
                : []
            }
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="role_name"
            labelId="RoleName"
            required
            labelTypeCode="Label_COM_General"
            className={styles.userInput}
          />
          {!isDuplicateShow && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="role_desc"
              labelId="UserGroupDescription"
              labelTypeCode="Label_COM_General"
              className={styles.userInput}
            />
          )}
        </FormSection>
      </div>
    );
  })
);
