import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/financialInfoTable';

import styles from './index.less';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteFinancialInfo`,
      payload: {
        id: clientId,
        crtId: id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [clientId, id] },
    });
  };
  return (
    <div className={styles.btnWrap}>
      <div className={styles.icon} onClick={handleDelete}>
        <Icon type="close" />
      </div>
    </div>
  );
};

const FinancialItem = ({ clientId, form, id, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isShow = tenant.region({
    [Region.ID]:
      item?.ctfType === 'TN' &&
      item?.type === 'S' &&
      item.deleted !== 1 &&
      item.ctfCountryCode !== 'RI',
    notMatch: item?.ctfType === 'TN' && item?.type === 'S' && item.deleted !== 1,
  });
  return isShow ? (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
      itemTable
      actionComponent={<ActionComponent clientId={clientId} id={id} />}
      distinguishFormId='taxCountry'
    >
      <Fields.CtfCountryCode />
      <Fields.CtfId />
      <Fields.Reasonflag />
      <Fields.Reason />
      <Fields.AdditionalReason />
      <Fields.CountryofTaxResidence />
    </Section>
  ) : null;
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  item: modelnamepsace.modalData.entities?.crtInfoMap?.[id],
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
          target: 'saveCrtInfoList',
          payload: {
            changedFields,
            id: clientId,
            crtId: id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(FinancialItem)
);
