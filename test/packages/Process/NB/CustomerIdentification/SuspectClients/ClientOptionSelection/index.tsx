import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import Section, { Fields } from './Section/index';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { ActivityStatus } from 'bpm/pages/Information/enum';
import styles from './index.less';

const ClientOptionSelection = connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { clientItem, policy }: any) => ({
    validating: formCommonController.validating,
    policyId: policy?.id,
    clientItem,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, policyId, clientItem } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'selectUpdateClientOption',
          payload: {
            policyId: policyId,
            clientId: clientItem?.id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { clientItem } = props;
      return formUtils.mapObjectToFields(clientItem);
    },
  })((formProps) => {
    const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);

    const isNoneEdit =
      lodash.chain(taskDetail).get('taskStatus').toLower().value() === ActivityStatus.Completed;

    const taskNotEditable: boolean = useSelector(
      ({ claimEditable }: any) => claimEditable.taskNotEditable
    );

    const disabled = !!formProps?.clientItem?.syncSuccessfully || isNoneEdit || taskNotEditable;

    return (
      <FormAntCard className={styles.container}>
        <Section
          form={formProps.form}
          editable={!disabled}
          section="ClientOption-Fields"
          clientId={formProps?.clientItem?.id}
        >
          <Fields.ClientOptionDropdown />
        </Section>
      </FormAntCard>
    );
  })
);

export default ClientOptionSelection;
