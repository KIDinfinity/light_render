import React from 'react';
import { useSelector } from 'dva';
import Section, { ServiceFields as Fields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { boosterNotEdible } = data;

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Service">
      <Fields.PolicyYear />
      <Fields.ServicePayableAmount />
      <Fields.ServicePayableDays />
      <Fields.BoosterPayableAmount boosterNotEdible={boosterNotEdible} />
      <Fields.BoosterPayableDays boosterNotEdible={boosterNotEdible} />
    </Section>
  );
};
