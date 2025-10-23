import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
// import classnames from 'classnames';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
// import { ReactComponent as CopyIcon } from '@/assets/copy.svg';
import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';

import { Section, Fields } from '../../../../_section/ControlPersonField';

import styles from './index.less';
import BooleanEnum from 'basic/enum/BooleanEnum';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const ActionComponent = ({ clientId, id }: any) => {
  const dispatch = useDispatch();

  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return formUtils.queryValue(
      modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm
    );
  });

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteControlPersonInfo`,
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
    <>
      {companyLegalForm !== BooleanEnum.Yes && (
        <div className={styles.btnWrapa}>
          <div className={styles.icon} onClick={handleDelete}>
            <TrashIcon />
          </div>
        </div>
      )}
    </>
  );
};

const ControlPersonItem = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
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
      <Fields.CustomerRole />
      <Fields.CustomerEnFirstName />
      <Fields.CustomerEnSurname />
      <Fields.IdentityNo />
      <Fields.Nationality />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { id }: any) => ({
  clientInfo: modelnamepsace.modalData.entities?.clientMap?.[id],
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
          target: 'saveControlPersonInfo',
          payload: {
            changedFields,
            id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { clientInfo, taskDetail } = props;
      const { personalInfo, nationalityInfo } = clientInfo;
      return formUtils.mapObjectToFields({
        ...personalInfo,
        ...nationalityInfo,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(ControlPersonItem)
);
