import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { GroupHeaderFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const NcdFlag = ({ form, policyYear, policyNo }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.SummaryPayablegroupHeader}>
      <Section
        form={form}
        editable={editable}
        section="SummaryPayable.groupHeader"
      >
        <GroupHeaderFields.NCDFlag
          policyYear={policyYear}
          policyNo={policyNo}
        />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { policyNo }: any )=>({
    claimPolicyPayableList: lodash.find(modelnamepsace.claimProcessData.claimPolicyPayableList,{'policyNo': policyNo }),
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { policyNo, dispatch } = props;
    
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveNcdFlag',
          payload: {
            changedFields,
            policyNo,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { claimPolicyPayableList } = props;
      return formUtils.mapObjectToFields({ ncdFlag: claimPolicyPayableList?.ncdFlag })
    },
  })(NcdFlag)
);