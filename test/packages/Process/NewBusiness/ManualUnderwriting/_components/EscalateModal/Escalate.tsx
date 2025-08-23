import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';

const Escalate = ({ form, setEscalateForm }: any) => {
  useEffect(() => {
    setEscalateForm(form);
  }, []);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable} section="Escalate">
      <Fields.SelectTeamOrUser />
      <Fields.EscalationReason />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveEscalteCase`,
          payload: {
            changedFields,
          },
        });
      }
    },
  })(Escalate)
);
