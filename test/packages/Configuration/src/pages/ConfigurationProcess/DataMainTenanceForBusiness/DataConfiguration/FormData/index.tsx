import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import type { DataFieldProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { updateCurrentField } from 'configuration/pages/ConfigurationCenter/Utils/Handle';
import { getDataFieldSection } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';
import FormLayout from './FormLayout';
import { VLD_000267 } from '../Validator';
import styles from './index.less';

interface ComponentProps extends FormComponentProps {
  form: WrappedFormUtils;
  dataFieldList: DataFieldProps[];
  dispatch: Dispatch;
  formData: any;
  functionCode: string;
  isAdd: boolean;
  taskNotEditable: boolean;
  hideAdd?: boolean;
  functionData: any;
  rows: any;
  isUpdate: boolean;
  isUpdateMultiple: boolean;
}

function ConfigurationForm(props: ComponentProps) {
  const {
    form,
    functionCode,
    dataFieldList,
    taskNotEditable,
    isAdd,
    formData,
    rows,
    functionData,
    isUpdate,
    isUpdateMultiple,
  } = props;
  const dataFieldListResult = useMemo(() => {
    const newDataFieldList = lodash.map(dataFieldList, (item: any) => ({
      ...item,
      validateTrigger: 'onChange',
      editable: !(item.fieldName === 'medical_provider_code' && (isUpdate || isUpdateMultiple)),
      rules: isAdd
        ? [
            {
              validator: VLD_000267({
                formData,
                rows,
                functionData,
                key: item?.fieldName,
                transfer: false,
              }),
            },
          ]
        : null,
    }));
    return getDataFieldSection(newDataFieldList, taskNotEditable);
  }, [dataFieldList, formData, rows, functionData, taskNotEditable]);

  return (
    <div className={styles.taskForm}>
      <FormLayout
        sectionProps={{
          form,
          formId: functionCode,
          disableLayout: true,
          isHideBgColor: true,
          isMargin: false,
          isPadding: false,
        }}
        dataFieldList={dataFieldListResult}
        isAdd={isAdd}
        taskNotEditable={taskNotEditable}
        functionData={functionData}
        formData={formData}
      />
    </div>
  );
}

export default connect(
  (
    { dataConfigurationController, claimEditable }: any,
    { formData, taskNotEditable, hideAdd }: any
  ) => ({
    dataFieldList: dataConfigurationController?.functionData?.dataFieldList,
    functionCode: dataConfigurationController?.functionData?.functionCode,
    functionData: dataConfigurationController?.functionData,
    formData: formData || dataConfigurationController?.formData,
    isAdd: !hideAdd && dataConfigurationController?.isAdd,
    taskNotEditable: taskNotEditable || claimEditable.taskNotEditable,
    rows: dataConfigurationController?.listPage?.rows,
    isUpdateMultiple: dataConfigurationController?.isUpdateMultiple,
    isUpdate: dataConfigurationController?.isUpdate,
  })
)(
  Form.create({
    onFieldsChange(props: ComponentProps, changedValues) {
      const { dataFieldList, dispatch, formData } = props;
      const changeField = updateCurrentField(changedValues, dataFieldList);
      dispatch({
        type: 'dataConfigurationController/updateFormData',
        payload: {
          formData: {
            ...formData,
            data: {
              ...formData?.data,
              ...changeField,
              ...changedValues,
            },
          },
          changedValues,
        },
      });
    },
    mapPropsToFields(props) {
      const { formData: { data = {} } = {}, dataFieldList } = props;
      const result = tranferResult(dataFieldList, data);
      return formUtils.mapObjectToFields({ ...result }, {});
    },
  })(ConfigurationForm)
);
