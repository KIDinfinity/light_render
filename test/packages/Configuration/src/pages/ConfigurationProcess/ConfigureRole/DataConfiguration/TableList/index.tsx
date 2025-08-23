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
import Form from '../FormData/Role/Form';

function TableList() {
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector((state: any) => state.configureRoleController?.functionData);
  const listPage: any = useSelector((state: any) => state.configureRoleController.listPage);
  const currentMenu: CurrentMenuProps = useSelector((state: any) => state.configureRoleController.currentMenu);
  const searchDefault: any = useSelector((state: any) => state.configureRoleController.searchDefault);
  const searchParams: any = useSelector((state: any) => state.configureRoleController.searchParams);
  const taskNotEditable: boolean = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const isAdd: boolean = useSelector((state: any) => state.configureRoleController.isAdd);
  const changeData: any = useSelector((state: any) => state.configureRoleController.changeData);
  const isUpdate: boolean = useSelector((state: any) => state.configureRoleController.isUpdate);
  const formData: any = useSelector((state: any) => state.configureRoleController.formData);
  const TableSearch: any = useSelector((state: any) => state.configureRoleController.TableSearch);
  const isUpdateMultiple: boolean = useSelector((state: any) => state.configureRoleController.isUpdateMultiple);
  const tableProps = {
    dispatch, functionData, listPage, currentMenu, searchDefault, searchParams, taskNotEditable, isAdd, changeData, isUpdate, formData, TableSearch, isUpdateMultiple,
  }
  const getName = (record: any) => {
    return lodash.chain(record?.subSection).map(item => item?.data?.name).compact().value().join(',')
  };

  const renderFormData = (record: any) => {
    return (<Form
      hideAdd
      taskNotEditable
      formData={record}
      isDuplicateShow
      // @ts-ignore
      onClick={(e) => {
        e.stopPropagation();
      }} />)

  }

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
    if (col?.dataIndex === "name") {
      extra = {
        render: (text: any, record: any) => {
          return (
            // @ts-ignore
            <Ellipsis tooltip lines={3}>
              {getName(record)}
            </Ellipsis>
          );
        },
      }
    }
    return extra
  };

  return (
    <ConfigurationCommonTableList {...tableProps} type='configureRoleController' getExtraData={getExtraData} renderFormData={renderFormData} />
  );
}
export default TableList;
