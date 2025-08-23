import React from 'react';
import { history } from 'umi';
import Item from '../Item';

export default ({ typeCode, dictCode }: any) => {
  const goUrl = () => {
    history.push('/navigator/reportCenter');
  };
  return <Item key="ReportCenter" typeCode={typeCode} dictCode={dictCode} onClick={goUrl} />;
};
