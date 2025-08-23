import React, { useContext, useState, useEffect, useMemo } from 'react';
import context from '../Context/context';
import HeaderUI from '../Header/Header';
import getAndSetSlaTime from '../Header/getAndSetSlaTime';
import HeaderDefault from '../Header/HeaderDefault';

const C = ({ title, taskDetail, headerInfoRender, overdueTimeRender }: any) => {
  const [slaTime, setSlaTime] = useState(0);

  useEffect(() => {
    getAndSetSlaTime({ taskDetail, setSlaTime });
  }, [taskDetail]);

  return (
    <HeaderUI
      title={title}
      status={taskDetail?.taskStatus}
      urgent={taskDetail?.urgent}
      slaTime={slaTime}
      headerInfoRender={headerInfoRender}
      overdueTimeRender={overdueTimeRender}
      defaultHeader={HeaderDefault(taskDetail)}
    />
  );
};

const Header = () => {
  const { state } = useContext(context);
  const { title, taskDetail, headerInfoRender, overdueTimeRender } = state;
  return useMemo(() => {
    return <C title={title} taskDetail={taskDetail} headerInfoRender={headerInfoRender} overdueTimeRender={overdueTimeRender} />;
  }, [title, taskDetail, headerInfoRender, overdueTimeRender]);
};

Header.displayName = 'Header';

export default Header;
