import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import { get } from 'lodash';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import styles from './CaseInformation.less';

const layout = {
  fieldLayout: {
    xs: { span: 4 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 4 },
  },
};

@connect((state) => ({
  APDAClaimType: get(state, 'dictionaryController.APDAClaimType'),
  billing: get(state, 'hbProcessController.billing'),
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    props.dispatch({
      type: 'hbProcessController/saveBilling',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    return formUtils.mapObjectToFields(props.billing, {
      coverPageNo: (value) => value,
      type: (value) => value,
    });
  },
})
class CaseInformation extends Component {
  render() {
    const { form, APDAClaimType } = this.props;

    return (
      <div className={styles.info}>
        <Card title="Case Information">
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemInput
                form={form}
                required
                formName="coverPageNo"
                labelId="app.navigator.hospitalDetail.table-column.cover-page-no"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="type"
                labelId="Type"
                dicts={APDAClaimType}
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
