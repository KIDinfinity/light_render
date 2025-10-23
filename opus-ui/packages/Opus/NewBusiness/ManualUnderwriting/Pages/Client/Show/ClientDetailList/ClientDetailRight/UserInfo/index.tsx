import React from 'react';
import { Form } from 'antd';
import { connect  } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/commonClientInfoField';

const UserInfo = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} spanMode="double" />;
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  laClientId: modelnamepsace.entities?.clientMap?.[clientId]?.laClientId,
  loadingStatus: login.loadingStatus,
  personalInfoData: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo,
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
          target: 'saveCommonClientInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { laClientId, personalInfoData  } = props;
      return formUtils.mapObjectToFields({
        ...personalInfoData,
        laClientId,
      });
    },
  })(UserInfo)
);
