import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { OtherProcedureFields as Fields } from './Section';

const Procedure = ({ form, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpEditPayable.OtherProcedure">
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.ProcedureCode />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { otherProcedureId }: any) => ({
    item: modelnamepsace.claimEntities.otherProcedureListMap[otherProcedureId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { item } = props;
      const therapiesType = lodash.has(item, 'therapiesType') ? item.therapiesType : 'CI';

      return formUtils.mapObjectToFields({ ...item, therapiesType });
    },
  })(Procedure)
);
