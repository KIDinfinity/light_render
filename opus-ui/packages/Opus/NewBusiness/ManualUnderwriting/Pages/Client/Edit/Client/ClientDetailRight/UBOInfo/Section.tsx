import React from 'react';
import { Form } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { ReactComponent as BackgroundInfoIcon } from 'opus/Assets/background.svg';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/UBOInfoField';
import styles from './index.less';
import { Icon } from 'antd';
import useGetUBOInfoList from '../../../../_hooks/useGetUBOInfoList';
import useClearUBOInfoList from '../../../../_hooks/useClearUBOInfoList';
import BooleanEnum from 'basic/enum/BooleanEnum';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const AddButton = ({ clientId }: any) => {
  const dispatch = useDispatch();
  const uboInfoList = useGetUBOInfoList({ mode: 'edit' });
  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm;
  });

  const addBUOInfo = () => {
    dispatch({
      type: `${NAMESPACE}/addUBOInfo`,
    });
  };

  return (
    <>
      {formUtils.queryValue(companyLegalForm) === BooleanEnum.No && uboInfoList.length < 5 && (
        <div className={styles.addButton}>
          <div className={styles.addItem} onClick={addBUOInfo}>
            <Icon type="plus" /> Add UBO List
          </div>
        </div>
      )}
    </>
  );
};

const UBOInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useClearUBOInfoList({ clientId });

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <BackgroundInfoIcon />
        </div>
        <AddButton clientId={clientId} />
      </div>
      <Section
        form={form}
        editable={editable}
        clientId={clientId}
        readOnly={false}
        condition="proposal"
      >
        <Fields.UBOShareholder />
      </Section>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace, login }: any, { clientId }: any) => ({
  companyLegalForm: modelnamespace.modalData.entities?.clientMap?.[clientId]?.companyLegalForm,
  loadingStatus: login.loadingStatus,
  taskDetail: modelnamespace.taskDetail,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveUBOInfo',
          payload: {
            changedFields,
            clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { companyLegalForm, taskDetail } = props;
      return formUtils.mapObjectToFields({
        companyLegalForm,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(UBOInfo)
);
