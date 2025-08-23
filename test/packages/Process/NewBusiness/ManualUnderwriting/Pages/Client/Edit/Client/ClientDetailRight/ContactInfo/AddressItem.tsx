import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import classnames from 'classnames';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { ReactComponent as CopyIcon } from '@/assets/copy.svg';

import { Section, Fields } from '../../../../_section/contactInfoField';

import styles from './index.less';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteAddressInfo`,
      payload: {
        id: clientId,
        addressId: id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [clientId, id] },
    });
  };
  const handleCopy = () => {
    dispatch({
      type: `${NAMESPACE}/copyAddressInfo`,
      payload: {
        id: clientId,
        addressId: id,
      },
    });
  };
  return (
    <div className={styles.btnWrap}>
      <div className={styles.icon} onClick={handleDelete}>
        <Icon type="close" />
      </div>
      <div className={classnames(styles.icon, styles.copy)} onClick={handleCopy}>
        <CopyIcon />
        <span className={styles.copyText}>Copy</span>
      </div>
    </div>
  );
};

const AddressItem = ({ clientId, form, id, addressItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      addressId={id}
      itemTable
      condition="proposal"
      actionComponent={<ActionComponent clientId={clientId} id={id} />}
    >
      <Fields.AddressType />
      <Fields.Address7 />
      <Fields.Address6 />
      <Fields.Address5 />
      <Fields.Address4 />
      <Fields.Address3 />
      <Fields.Address2 />
      <Fields.Address1 />
      <Fields.AddressHomenumber />
      <Fields.Zipcode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  addressItem: modelnamepsace.modalData.entities?.addressInfoMap?.[id],
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, id, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveAddressInfoList',
          payload: {
            changedFields,
            id: clientId,
            addressId: id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { addressItem } = props;
      return formUtils.mapObjectToFields(addressItem);
    },
  })(AddressItem)
);
