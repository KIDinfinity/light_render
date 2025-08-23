import React from 'react';
import { history } from 'umi';
import Item from '../Item';

export default ({ typeCode, dictCode }) => {
  const goUrl = () => {
    history.push('/navigator/ReportCenterOld');
  };
  return <Item key="ReportCenterOld" typeCode={typeCode} dictCode={dictCode} onClick={goUrl} />;
};
