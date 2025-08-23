import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import{ v4 as  uuidv4 } from 'uuid';
import { SERVICEITEM } from '@/utils/claimConstant';
import MultipleServiceItems from 'claim/components/MultipleServiceItems';
import FormLayout from 'basic/components/Form/FormLayout';
import type { IDictionary } from '@/dtos/dicts';
import { AddMultipleServiceItemsLayout } from '../FormLayout.json';
import styles from './AddMultipleServiceItems.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  serviceItemId: string;
  invoiceId: string;
  existServiceItems: string[];
  submited: boolean;
  serviceItemDropdown: IDictionary[];
  loadingOfserviceItem: boolean;
}

@connect()
// @ts-ignore
@Form.create<IProps>()
class AddMultipleServiceItems extends Component<IProps> {
  handleAdd = () => {
    const { form, dispatch, invoiceId } = this.props;

    const serviceItemIds = form.getFieldValue('serviceItems');
    const serviceItems = lodash.map(serviceItemIds, (item: string) => ({
      ...SERVICEITEM,
      id: uuidv4(),
      serviceItem: item,
      expense: null,
      unit: null,
    }));

    dispatch({
      type: 'daProcessController/addServiceItems',
      payload: {
        invoiceId,
        serviceItems,
      },
    });
    form.resetFields(['serviceItems']);
  };

  render() {
    const { form, serviceItemDropdown, existServiceItems } = this.props;

    return (
      <div className={styles.serviceItemCard}>
        <Form layout="vertical">
          <FormLayout json={AddMultipleServiceItemsLayout}>
            <MultipleServiceItems
              form={form}
              dicts={serviceItemDropdown}
              existServiceItems={existServiceItems}
              handleAdd={this.handleAdd}
            />
          </FormLayout>
        </Form>
      </div>
    );
  }
}

export default AddMultipleServiceItems;
