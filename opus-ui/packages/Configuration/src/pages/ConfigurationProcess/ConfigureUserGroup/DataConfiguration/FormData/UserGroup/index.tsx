import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import { connect } from 'dva';
import { VLD_000267 } from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/Validator';
import styles from './index.less';

export default connect(
  ({ configureUserGroupController }: any, { formData, taskNotEditable, hideAdd }: any) => ({
    isUpdateMultiple: configureUserGroupController.isUpdateMultiple,
    isUpdate: configureUserGroupController.isUpdate,
    functionData: configureUserGroupController?.functionData,
    rows: configureUserGroupController?.listPage?.rows,
    formData: formData || configureUserGroupController?.formData,
    taskNotEditable: taskNotEditable || configureUserGroupController?.taskNotEditable,
    isAdd: hideAdd || configureUserGroupController?.isAdd,
  })
)(
  Form.create({
    onValuesChange(props, changeValues) {
      const { formData, dispatch }: any = props;
      dispatch({
        type: 'configureUserGroupController/updateFormData',
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
          formId="configureUserGroup"
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
            formName="group_code"
            labelId="UserGroupCode"
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
                        key: 'group_code',
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
            formName="group_name"
            labelId="UserGroupName"
            required
            labelTypeCode="Label_COM_General"
            className={styles.userInput}
          />
          {!isDuplicateShow && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="group_desc"
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
