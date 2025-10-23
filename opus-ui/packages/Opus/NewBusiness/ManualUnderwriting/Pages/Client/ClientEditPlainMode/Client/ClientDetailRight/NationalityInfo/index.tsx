import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/nationalityInfoField';

const NationalityInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="cid"
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  nationalityInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.nationalityInfo,
  loadingStatus: login.loadingStatus,
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
          target: 'saveNationalityInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { nationalityInfoData } = props;
      return formUtils.mapObjectToFields(nationalityInfoData);
    },
  })(NationalityInfo)
);
