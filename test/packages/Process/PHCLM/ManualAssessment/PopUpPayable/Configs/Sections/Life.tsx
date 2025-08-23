import React from 'react';
import { useSelector } from 'dva';
import Section, { LifeFields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Life">
      {/* <LifeFields.Chooise /> */}
      <LifeFields.payableAmount />
      {/* <LifeFields.PayableDays /> */}
    </Section>
  );
};
