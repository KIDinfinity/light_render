import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import {
  useFilterAddrTypeDicts,
  useAllExistCodes,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useAddressType';
import { Section, Fields } from '../../../../_section/contactInfoField';

import styles from './index.less';

const AddressAdd = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  useEffect(() => {
    form.resetFields();
  }, [form]);

  const dicts = useFilterAddrTypeDicts({ readOnly: false, id: clientId });
  const existCodes = useAllExistCodes({ id: clientId, readOnly: false, field: 'addrType' });

  const hasAll = lodash.every(dicts, (item) => existCodes.includes(item.specifyInfoType));
  return hasAll ? null : (
    <div className={styles.item}>
      <Section
        form={form}
        editable={editable}
        clientId={clientId}
        readOnly={false}
        addressId={id}
        condition="proposal"
        register={false}
        itemTable
      >
        <Fields.AddressTypeAdd />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create({
    onValuesChange(props: any, changedValues: any) {
      const { dispatch, clientId } = props;
      dispatch({
        type: `${NAMESPACE}/addAddressInfo`,
        payload: {
          id: clientId,
          changedValues,
        },
      });
    },
  })(AddressAdd)
);
