import React from 'react';
import FormSection, { FormItemSelect, FormItemInput } from 'basic/components/Form/FormSection';
import layout from './layout';
import { Form } from 'antd';
import { FormId } from 'phowb/pages/BatchCreateProcess/Enums';
import { formUtils } from 'basic/components/Form';
import type { FormComponentProps } from 'antd/es/form';
import { useSelector } from 'dva';
import styles from './CaseInfo.less';

interface IProps {
  form: FormComponentProps;
}
const CaseInfo = ({ form }: IProps) => {
  const { dicts } = useSelector((state) => ({
    dicts: state.dictionaryController.findDictionaryByTypeCode_Label_BPM_CaseCategory,
  }));
  return (
    <FormSection
      layout={layout}
      formId={FormId.ProcessCaseInfo}
      form={form}
      className={styles.formSection}
      isMargin={false}
    >
      <FormItemSelect
        dicts={dicts}
        disabled
        formName="caseCategory"
        labelId="CaseCategory"
        labelTypeCode="Label_BPM_CaseInfo"
        form={form}
      />
      <FormItemInput
        form={form}
        disabled
        formName="slaDuration"
        labelId="SLA"
        labelTypeCode="Label_BPM_CaseInfo"
      />
    </FormSection>
  );
};

export default Form.create({
  mapPropsToFields(props) {
    const { item } = props;
    return formUtils.mapObjectToFields(
      {
        ...item,
      },
      {}
    );
  },
})(CaseInfo);
