import React from 'react';
import styled from 'styled-components';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Hello = styled.div`
  font-size: 1.1429rem;
  margin-top: 1.0714rem;
  color: #898989;
`;

export default (userName: any) => (
  <Hello>
    {formatMessageApi({ Label_COM_WarningMessage: 'app.navigator.drawer.messager.title.good-day' })}{' '}
    <span>{userName.userName}</span>. ^-^
  </Hello>
);
