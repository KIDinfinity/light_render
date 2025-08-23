import React, { Component } from 'react';
import { Form, Checkbox } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormId } from '../../Enum';
import { namespace } from '../../_models';
import ItemList from './ItemList';
import styles from './index.less';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
  applyToPolicies: any[][object];
}
class ApplyToPoliciesList extends Component<IProps> {
  onChange = (e) => {
    const { dispatch }: any = this.props;
    const selectAll = e.target.checked;
    dispatch({
      type: `${namespace}/toggleApplyToPolicies`,
      payload: {
        selectAll,
      },
    });
  };

  render() {
    const { form, policies, isNotEditable, taskNotEditable } = this.props;
    const selectAll = lodash.every(policies, (item) => item.applyTo);

    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId={FormId.MailingAddress}
          title="ApplyToPolicies"
          layConf={{
            default: 24,
          }}
          isMargin
          formatType="Label_BIZ_POS"
          vertical={false}
        >
          <Form.Item
            className={styles.ApplyTo}
            label={formatMessageApi({ Label_BIZ_POS: 'SelectAllPolicies' })}
          >
            <Checkbox
              disabled={isNotEditable || taskNotEditable}
              checked={selectAll}
              onChange={(e) => this.onChange(e)}
            />
          </Form.Item>

          <ItemList {...this.props} form={form} policyList={policies} />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ phowbDataCaptureController, claimEditable }: any) => ({
  policies:
    phowbDataCaptureController.claimProcessData.posDataDetail?.applyToPolicies.policies || {},
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { policies } = props;
      return formUtils.mapObjectToFields(
        {
          policies,
        },
        {}
      );
    },
  })(ApplyToPoliciesList)
);
