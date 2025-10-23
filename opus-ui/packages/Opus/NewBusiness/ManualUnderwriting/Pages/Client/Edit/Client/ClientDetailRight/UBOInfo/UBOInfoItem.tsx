import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
// import classnames from 'classnames';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
// import { ReactComponent as CopyIcon } from '@/assets/copy.svg';
import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';

import { Section, Fields } from '../../../../_section/UBOInfoField';

import styles from './index.less';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteUBOInfo`,
      payload: {
        id,
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

const UBOInfoItem = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.uboItemWrap}>
      <div className={styles.uboItemWrapLeft} />
      <Section
        form={form}
        editable={editable}
        clientId={clientId}
        readOnly={false}
        uboId={id}
        itemTable
        condition="proposal"
        actionComponent={<ActionComponent clientId={clientId} id={id} />}
      >
        <Fields.CustomerType />
        <Fields.CustomerEnFirstName />
        <Fields.CustomerEnSurname />
        <Fields.IdentityNo />
        <Fields.DateOfBirth />
        <Fields.Gender />
        <Fields.CustomerRole />
        <Fields.Percentage />
        <Fields.Nationality />
        <Fields.Country />
      </Section>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  uboInfo: modelnamepsace.modalData.entities?.clientMap?.[id],
  addressInfoMap: modelnamepsace.modalData.entities?.addressInfoMap,
  companyLegalForm: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm,
  loadingStatus: login.loadingStatus,
  taskDetail: modelnamepsace.taskDetail,
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
          target: 'saveUBOInfoList',
          payload: {
            changedFields,
            id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { uboInfo, companyLegalForm, addressInfoMap, taskDetail } = props;
      const { personalInfo, nationalityInfo, backgroundInfo, addressInfoList } = uboInfo;
      const addressItem = addressInfoMap[addressInfoList?.[0]] ?? {};
      return formUtils.mapObjectToFields({
        companyLegalForm,
        ...personalInfo,
        ...nationalityInfo,
        ...backgroundInfo,
        ...addressItem,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(UBOInfoItem)
);
