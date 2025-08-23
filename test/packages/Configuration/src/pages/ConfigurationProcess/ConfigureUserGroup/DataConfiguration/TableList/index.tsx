import React from 'react';
import { useSelector, useDispatch } from 'dva';
import type {
  CurrentMenuProps,
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import ConfigurationCommonTableList from 'configuration/components/TableList';
import type { Dispatch } from 'redux';
import Ellipsis from '@/components/Ellipsis';
import lodash from 'lodash';
import UserGroup from '../FormData/UserGroup';

function TableList() {
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector((state: any) => state.configureUserGroupController?.functionData);
  const listPage: any = useSelector((state: any) => state.configureUserGroupController.listPage);
  const currentMenu: CurrentMenuProps = useSelector((state: any) => state.configureUserGroupController.currentMenu);
  const searchDefault: any = useSelector((state: any) => state.configureUserGroupController.searchDefault);
  const searchParams: any = useSelector((state: any) => state.configureUserGroupController.searchParams);
  const taskNotEditable: any = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const isAdd: any = useSelector((state: any) => state.configureUserGroupController.isAdd);
  const changeData: any = useSelector((state: any) => state.configureUserGroupController.changeData);
  const isUpdate: any = useSelector((state: any) => state.configureUserGroupController.isUpdate);
  const formData: any = useSelector((state: any) => state.configureUserGroupController.formData);
  const TableSearch: any = useSelector((state: any) => state.configureUserGroupController.TableSearch);
  const isUpdateMultiple: any = useSelector((state: any) => state.configureUserGroupController.isUpdateMultiple);
  const tableProps={
    dispatch,functionData,listPage,currentMenu,searchDefault,searchParams,taskNotEditable,isAdd,changeData,isUpdate,formData,TableSearch,isUpdateMultiple,
  }

  const renderFormData = (record: any) => {
    return (
      <UserGroup
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

  const getRoleName = (record: any) => {
    return lodash
      .chain(record?.subSection)
      .map((item) => item?.data?.role_name)
      .compact()
      .value()
      .join(',');
  };
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
    if (col?.dataIndex === 'role_name') {
      extra = {
        render: (text: any, record: any) => {
          return (
            // @ts-ignore
            <Ellipsis tooltip lines={3}>
              {getRoleName(record)}
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
      type="configureUserGroupController"
      getExtraData={getExtraData}
      renderFormData={renderFormData}
    />
  );


}
export default TableList;
