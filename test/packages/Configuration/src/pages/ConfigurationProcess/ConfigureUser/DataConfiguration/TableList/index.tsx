import React from 'react';
import { useSelector, useDispatch } from 'dva';
import type {
  CurrentMenuProps,
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import ConfigurationCommonTableList from 'configuration/components/TableList';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { Dispatch } from 'redux';
import Ellipsis from '@/components/Ellipsis';
import lodash from 'lodash';
import User from '../FormData/User';

function TableList() {
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector(
    (state: any) => state.configureUserController?.functionData
  );
  const listPage: any = useSelector((state: any) => state.configureUserController.listPage);
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configureUserController.currentMenu
  );
  const searchDefault: any = useSelector(
    (state: any) => state.configureUserController.searchDefault
  );
  const searchParams: any = useSelector((state: any) => state.configureUserController.searchParams);
  const taskNotEditable: any = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const isAdd: any = useSelector((state: any) => state.configureUserController.isAdd);
  const changeData: any = useSelector((state: any) => state.configureUserController.changeData);
  const isUpdate: any = useSelector((state: any) => state.configureUserController.isUpdate);
  const formData: any = useSelector((state: any) => state.configureUserController.formData);
  const TableSearch: any = useSelector((state: any) => state.configureUserController.TableSearch);
  const isUpdateMultiple: any = useSelector(
    (state: any) => state.configureUserController.isUpdateMultiple
  );
  const tableProps = {
    dispatch,
    functionData,
    listPage,
    currentMenu,
    searchDefault,
    searchParams,
    taskNotEditable,
    isAdd,
    changeData,
    isUpdate,
    formData,
    TableSearch,
    isUpdateMultiple,
  };

  const getGroupName = (record: any) => {
    return lodash
      .chain(record?.subSection)
      .map((item) => item?.data?.group_name)
      .compact()
      .value()
      .join(',');
  };

  const renderFormData = (record: any) => {
    return (
      <User
        hideAdd
        taskNotEditable
        formData={record}
        isDuplicateShow
        // @ts-ignore
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    );
  };
  1;

  const getExtraData = (componentType: any, col: any) => {
    let extra = /text/.test(componentType)
      ? {
          render: (text: any, record: any) => {
            return (
              // @ts-ignore
              <Ellipsis tooltip lines={3}>
                {record?.data?.[col?.dataIndex]}
              </Ellipsis>
            );
          },
        }
      : {};
    if (col?.dataIndex === 'group_name') {
      extra = {
        render: (text: any, record: any) => {
          return (
            // @ts-ignore
            <Ellipsis tooltip lines={3}>
              {getGroupName(record)}
            </Ellipsis>
          );
        },
      };
    }
    if (col.dataIndex === 'account_status') {
      extra = {
        render: (text: any, record: any) => {
          return (
            // @ts-ignore
            <Ellipsis tooltip lines={3}>
              {formatMessageApi({
                Dropdown_CFG_UserStatus: lodash.toString(record?.data?.[col?.dataIndex]),
              })}
            </Ellipsis>
          );
        },
      };
    }
    return extra;
  };
  return (
    <ConfigurationCommonTableList
      {...tableProps}
      type="configureUserController"
      getExtraData={getExtraData}
      renderFormData={renderFormData}
    />
  );
}
export default TableList;
