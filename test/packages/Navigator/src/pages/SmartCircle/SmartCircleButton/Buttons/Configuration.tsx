import React from 'react';
import { history } from 'umi';
import Item from '../Item';

export default ({ typeCode, dictCode }) => (
  <Item
    key="Configuration"
    typeCode={typeCode}
    dictCode={dictCode}
    onClick={() => {
      history.push('/navigator/configuration');
    }}
  />
);
