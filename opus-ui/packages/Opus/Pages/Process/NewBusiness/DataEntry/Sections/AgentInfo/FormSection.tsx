import React, { useContext } from 'react';
import sectionContext from 'opus/Components/SectionComponents/Context';

import Section, { Fields } from './Section';

const Agent = ({ form, editable }: any) => {
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.SalesChannel />
      <Fields.SubChannel />
      <Fields.AgentCode />
      <Fields.AgentName />
      <Fields.Proportion />
      <Fields.CoagentCode />
      <Fields.CoagentName />
      <Fields.CoAgentProportion />
    </Section>
  );
};

export default Agent;
