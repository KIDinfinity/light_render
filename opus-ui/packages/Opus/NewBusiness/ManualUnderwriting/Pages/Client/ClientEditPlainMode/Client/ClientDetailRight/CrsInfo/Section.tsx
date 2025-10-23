import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/crsInfoField';

const FinancialInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return <Section form={form} editable={editable} clientId={clientId} readOnly={false} />;
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  newCrs: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.newCrs,
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
          target: 'saveCrsInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { newCrs } = props;
      return formUtils.mapObjectToFields({
        newCrs,
      });
    },
  })(FinancialInfo)
);
