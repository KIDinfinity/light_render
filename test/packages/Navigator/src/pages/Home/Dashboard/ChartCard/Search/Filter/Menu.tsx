import React from 'react';
import { Menu } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { getFormat } from 'navigator/pages/ReportCenter/_utils/getFormatField';

export default ({ menus, dashboardCode, dashboardSearchFieldList }: any) => {
  const dispatch = useDispatch();

  // 已选择的菜单
  const selectKeys = lodash
    .chain(menus)
    ?.filter((item: any) => !!item.visible)
    ?.map((item: any) => item.fieldName)
    .value();

  const onClick = async ({ key }: any) => {
    const { visible, defaultValue } =
      lodash.chain(dashboardSearchFieldList).find({ fieldName: key }).value() || {};
    dispatch({
      type: 'dashboardController/toggleSearchVisible',
      payload: {
        dashboardCode,
        fieldName: key,
      },
    });
    // 隐藏时清除搜索条件， 展开时赋值默认条件
    if (key) {
      dispatch({
        type: 'dashboardController/saveSearchDatas',
        payload: {
          dashboardCode,
          changedFields: {
            [key]: !visible ? defaultValue : null,
            defaultCondition: 'N',
          },
        },
      });
    }
  };

  return (
    <Menu onClick={onClick} selectedKeys={selectKeys}>
      {lodash?.map(menus, (item: any) => (
        <Menu.Item key={item.fieldName} disabled={item.required}>
          {getFormat(item.fieldName, dashboardCode)}
        </Menu.Item>
      ))}
    </Menu>
  );
};
