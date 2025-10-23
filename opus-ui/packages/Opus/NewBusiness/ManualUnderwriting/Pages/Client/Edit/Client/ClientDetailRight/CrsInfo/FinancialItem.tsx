import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { Section, Fields } from '../../../../_section/financialInfoTable';
import styles from './index.less';
import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';

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
    <div className={styles.btnWrapa}>
      <div className={styles.icon} onClick={handleDelete}>
        <TrashIcon />
      </div>
    </div>
  );
};

const FinancialItem = ({ clientId, form, id, item, newCrs }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const conciseItem: any = formUtils.objectQueryValue(item);

  const isShow =
    conciseItem?.type === 'S' &&
    conciseItem?.ctfType === 'TN' &&
    conciseItem?.ctfCountryCode !== 'USA' &&
    newCrs === 'Y';

  return isShow ? (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
      itemTable
      actionComponent={<ActionComponent clientId={clientId} id={id} />}
      distinguishFormId="taxCountry"
    >
      <Fields.CtfCountryCode />
      <Fields.CtfId />
      <Fields.Reason />
      <Fields.AdditionalReason />
      <Fields.CtfStartDate />
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
  newCrs: formUtils.queryValue(modelnamepsace.modalData.entities?.clientMap?.[clientId]?.newCrs),
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
