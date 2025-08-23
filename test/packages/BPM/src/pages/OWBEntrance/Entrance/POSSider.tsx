import React from 'react';
import SiderUI from '../Sider/Sider';

const Sider = ({ buttonList }: any) => {
  return (
    <div>
      <SiderUI buttonList={buttonList} />
    </div>
  );
};

Sider.displayName = 'Sider';

export default Sider;
