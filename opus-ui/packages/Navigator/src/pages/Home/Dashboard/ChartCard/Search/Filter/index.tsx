import React, { useState } from 'react';
import { Dropdown, Icon } from 'antd';
import lodash from 'lodash';
import Menu from './Menu';

export default ({ dashboardSearchFieldList, dashboardCode }: any) => {
  const [visible, setVisible] = useState(false);

  const menus = lodash.filter(dashboardSearchFieldList, (item: any) => item.visible !== 2);

  const onVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      overlay={Menu({ menus, dashboardCode })}
      onVisibleChange={onVisibleChange}
      visible={visible}
      getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
    >
      <Icon type="bars" />
    </Dropdown>
  );
};
