import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { ProcedureFields as Fields } from './Section';

const Procedure = ({ form, treatmentId, procedureId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpEditPayable.Procedure">
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.ProcedureCode procedureId={procedureId} />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { procedureId }: any) => ({
    item: modelnamepsace.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { item } = props;
      const therapiesType = lodash.has(item, 'therapiesType') ? item.therapiesType : 'Surgery';

      return formUtils.mapObjectToFields({ ...item, therapiesType });
    },
  })(Procedure)
);
