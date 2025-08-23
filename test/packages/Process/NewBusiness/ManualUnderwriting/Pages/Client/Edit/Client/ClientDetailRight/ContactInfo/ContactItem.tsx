import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import classnames from 'classnames';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { ReactComponent as CopyIcon } from '@/assets/copy.svg';

import { Section, Fields } from '../../../../_section/contactInfoTable';

import styles from './index.less';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteContactInfo`,
      payload: {
        id: clientId,
        contactId: id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [clientId, id] },
    });
  };
  const handleCopy = () => {
    dispatch({
      type: `${NAMESPACE}/copyContactInfo`,
      payload: {
        id: clientId,
        contactId: id,
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

const ContactItem = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      contactId={id}
      condition="proposal"
      itemTable
      actionComponent={<ActionComponent clientId={clientId} id={id} />}
    >
      <Fields.Contacttype />
      <Fields.CountryName />
      <Fields.Countrycode />
      <Fields.Contactno />
      <Fields.AreaCode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  item: modelnamepsace.modalData.entities.contactInfoMap?.[id],
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
          target: 'saveContactInfoList',
          payload: {
            changedFields,
            id: clientId,
            contactId: id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ContactItem)
);
