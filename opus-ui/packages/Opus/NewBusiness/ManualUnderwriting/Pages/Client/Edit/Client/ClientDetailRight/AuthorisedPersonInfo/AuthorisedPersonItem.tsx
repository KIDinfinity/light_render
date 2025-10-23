import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
// import classnames from 'classnames';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';

import { Section, Fields } from '../../../../_section/AuthorisedPersonField';

import styles from './index.less';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteAuthorisedPerson`,
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

const AuthorisedPersonItem = ({ clientId, form, id }: any) => {
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
      <Fields.CustomerRole />
      <Fields.CustomerEnFirstName />
      <Fields.CustomerEnSurname />
      <Fields.IdentityNo />
      <Fields.DateOfBirth />
      <Fields.Nationality />
      <Fields.AddressType />
      <Fields.Address1 />
      <Fields.Address2 />
      <Fields.Address3 />
      <Fields.Address4 />
      <Fields.Address5 />
      <Fields.Address6 />
      <Fields.Country />
      <Fields.Zipcode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { id }: any) => ({
  authorisedPerson: modelnamepsace.modalData.entities?.clientMap?.[id],
  addressInfoMap: modelnamepsace.modalData.entities?.addressInfoMap,
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
          target: 'saveAuthorisedPersonList',
          payload: {
            changedFields,
            id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { authorisedPerson, addressInfoMap, taskDetail } = props;
      const { personalInfo, addressInfoList, nationalityInfo } = authorisedPerson;
      const addressItem = addressInfoMap[addressInfoList[0]];
      return formUtils.mapObjectToFields({
        ...personalInfo,
        ...addressItem,
        ...nationalityInfo,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(AuthorisedPersonItem)
);
