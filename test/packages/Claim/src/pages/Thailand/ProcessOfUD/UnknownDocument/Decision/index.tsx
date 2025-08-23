import React from 'react';
import SectionTitle from 'claim/components/SectionTitle';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Form from './Form';
import Table from './Table';

export default () => (
  <div>
    <SectionTitle
      title={formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.label.documentMappingDecision',
      })}
    />
    <Form />
    <Table />
  </div>
);
