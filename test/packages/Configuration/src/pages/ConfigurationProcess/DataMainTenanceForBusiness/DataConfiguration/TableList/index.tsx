import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import type {
  CurrentMenuProps,
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import ConfigurationCommonTableList from 'configuration/components/TableList';
import Ellipsis from '@/components/Ellipsis';
import FormData from '../FormData';

function TableList() {
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector((state: any) => state.dataConfigurationController?.functionData);
  const listPage: any = useSelector((state: any) => state.dataConfigurationController.listPage);
  const currentMenu: CurrentMenuProps = useSelector((state: any) => state.dataConfigurationController.currentMenu);
  const searchDefault: any = useSelector((state: any) => state.dataConfigurationController.searchDefault);
  const searchParams: any = useSelector((state: any) => state.dataConfigurationController.searchParams);
  const taskNotEditable: any = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const isAdd: any = useSelector((state: any) => state.dataConfigurationController.isAdd);
  const changeData: any = useSelector((state: any) => state.dataConfigurationController.changeData);
  const isUpdate: any = useSelector((state: any) => state.dataConfigurationController.isUpdate);
  const formData: any = useSelector((state: any) => state.dataConfigurationController.formData);
  const TableSearch: any = useSelector((state: any) => state.dataConfigurationController.TableSearch);
  const isUpdateMultiple: any = useSelector((state: any) => state.dataConfigurationController.isUpdateMultiple);
  const tableProps={
    dispatch,functionData,listPage,currentMenu,searchDefault,searchParams,taskNotEditable,isAdd,changeData,isUpdate,formData,TableSearch,isUpdateMultiple,
  }
  const getGroupName = (record: any) => {
    return lodash
      .chain(record?.subSection)
      .map((item) => item?.data?.group_name)
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
    return extra;
  };

  const renderFormData = (record: any) => {
    return (
      <FormData
        hideAdd
        taskNotEditable
        formData={record}
        // @ts-ignore
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    );
  };
  return (
    <ConfigurationCommonTableList
      {...tableProps}
      type="dataConfigurationController"
      getExtraData={getExtraData}
      renderFormData={renderFormData}
    />
  );
}
export default TableList;
