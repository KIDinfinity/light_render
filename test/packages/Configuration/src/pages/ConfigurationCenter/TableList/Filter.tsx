import React, { useMemo, useState, useEffect } from 'react';
import { Dropdown, Menu, Icon, Button, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';

const MenuItem = Menu.Item;

interface IProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
}

function Filter({functionData,currentMenu}: IProps) {
  const dispatch: Dispatch= useDispatch();
  const filterMap: any = useSelector((state: any) => state.configurationDataField.filterMap);
  const { dataFieldList = [] }= functionData;
  const { functionCode }=currentMenu;
  const currentFilter = lodash.get(filterMap, functionCode) || {};
  const filterList = lodash.keys(currentFilter) || [];
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e: any) => {
    if (e.key === '3') {
      setVisible(false);
    }
  };
  const handleCheckChange = (event: any) => {
    const {
      target: { checked, name },
    } = event;
    dispatch({
      type: 'configurationDataField/changeColumnFilter',
      payload: {
        checked,
        name,
        functionCode,
      },
    });
  };
  const dropdownValue = useMemo(() => {
    return (
      <Menu onClick={handleMenuClick}>
        {lodash.map(filterList, (item: string) => (
          <MenuItem key={item}>
            <Checkbox checked={currentFilter[item]} name={item} onChange={handleCheckChange}>
              {item}
            </Checkbox>
          </MenuItem>
        ))}
      </Menu>
    );
  }, [filterList,currentFilter]);

  const handleVisibleChange = (flag: any) => {
    setVisible(flag);
  };
  useEffect(() => {
    dispatch({
      type: 'configurationDataField/getDataFieldFilter',
      payload: {
        functionCode,
        dataFieldList,
      },
    });
  }, []);

  return (
    <Dropdown
      overlay={dropdownValue}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
    >
      <Button>
        {formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.columnsFilters',
        })}
        <Icon type="down" />
      </Button>
    </Dropdown>
  );

}
export default Filter
