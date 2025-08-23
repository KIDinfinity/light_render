import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import styles from './CaseInformation.less';

const layout = {
  fieldLayout: {
    xs: { span: 4 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 4 },
  },
};

@connect(({ dictionaryController, mjProcessController }) => ({
  dictsOfCaseCategory: dictionaryController.Label_BPM_CaseCategory,
  claimProcessData: mjProcessController.claimProcessData,
}))
@Form.create({
  onFieldsChange() {},
  mapPropsToFields(props) {
    return formUtils.mapObjectToFields(props.claimProcessData, {
      caseCategory: (value) => value,
    });
  },
})
class CaseInformation extends Component {
  render() {
    const { form, dictsOfCaseCategory } = this.props;

    return (
      <div className={styles.info}>
        <Card title="Case Information">
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemSelect
                form={form}
                disabled
                required
                formName="caseCategory"
                labelId="Type"
                dicts={dictsOfCaseCategory}
                dictCode="dictCode"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CaseInformation;
