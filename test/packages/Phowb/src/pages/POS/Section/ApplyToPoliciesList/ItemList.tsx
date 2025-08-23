import React, { Component } from 'react';
import { FormLayout } from 'basic/components/Form/FormSection';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import Item from './Item';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
}
class ApplyToPoliciesItem extends Component<IProps> {
  render() {
    const { form, policyList } = this.props;
    const layout = {
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      xxl: { span: 8 },
    };
    return (
      <FormLayout
        layConf={{
          default: 8,
        }}
      >
        {lodash.map(lodash.compact(policyList), (item, index) => (
          <Item {...this.props} layout={layout} key={index} form={form} item={item} />
        ))}
      </FormLayout>
    );
  }
}

export default ApplyToPoliciesItem;
