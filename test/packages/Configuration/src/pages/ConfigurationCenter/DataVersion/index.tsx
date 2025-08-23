import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import type { Dispatch } from 'redux';
import TableSearch, { Table } from '@/components/TableSearch';
import {v5 as uuidv5 } from 'uuid';
import lodash from 'lodash';
import Search from './Search';
import Operator from '../TableList/OperationBtn';
import { SubmitModal } from '../Modal';
import type {
  DataFieldProps,
  FunctionDataProps,
  CurrentMenuProps,
  ResultDataProps,
} from '../Utils/Typings';
import { getVersionColumns, handlerVersionData } from '../Utils/DataVersion';

interface SearchValue {
  currentPage: number;
  pageSize: number;
  sortName: string;
  sortOrder: string;
  params: any;
}


function DataVersionList() {
  const [TableSearchRef, setTableSearchRef] = useState(null);
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector((state: any) => state.configurationCenter.functionData);
  const currentMenu: CurrentMenuProps = useSelector((state: any) => state.configurationMenu.currentMenu);
  const searchDefault: any = useSelector((state: any) => state.configurationDataImage.searchDefault);
  const resultData: ResultDataProps = useSelector((state: any) => state.configurationDataImage.resultData);
  const filterMap: any = useSelector((state: any) => state.configurationDataField.filterMap) || {};
  const searchParams: any = useSelector((state: any) => state.configurationDataImage.searchParams);
  const dataImageFunction: FunctionDataProps = useSelector((state: any) => state.configurationDataImage.dataImageFunction);
  const dataImageMenu: CurrentMenuProps = useSelector((state: any) => state.configurationDataImage.dataImageMenu);
  const tableLoading: boolean = useSelector((state: any) => state.loading.effects['configurationDataImage/listPage']);
  const functionLoading: boolean = useSelector((state: any) => state.loading.effects['configurationCenter/findFunction']);
  const {  id: functionId } = currentMenu;
  const { id: dataImageId, functionCode }=dataImageFunction;
  const columnsFilter = lodash.get(filterMap, functionCode);
  const { rows = [], ...pagination }=resultData;
  const { dataFieldList }: {dataFieldList: DataFieldProps[]} = dataImageFunction;

  const onSearch = async (values: SearchValue) => {
    const { params, ...valueRes } = values;
    await dispatch({
      type: 'configurationDataImage/listPage',
      payload: {
        functionId: dataImageId,
        functionCode,
        ...valueRes,
        params: {
          ...params,
          function_id: functionId,
        },
      },
    });
  };

  useEffect(() => {
    if (TableSearchRef) {
      TableSearchRef.setSelectedRows?.([]);
      TableSearchRef.setStateOfSearch({
        params: {},
      });
    }
  }, [functionData.id,TableSearchRef])



  return (
    <>
      {!functionLoading ? (
        <>
          <TableSearch
            onSearch={onSearch}
            searchDefault={searchDefault}
            wrappedComponentRef={(c: any) => {
              setTableSearchRef(c) ;
            }}
          >
            <Search />
            <Operator
              TableSearch={TableSearchRef}
              functionData={dataImageFunction}
              currentMenu={dataImageMenu}
              searchParams={searchParams}
            />
            <Table
              rowKey={(r: any) => uuidv5(JSON.stringify(r), uuidv5.URL)}
              selectable
              loading={tableLoading}
              sortMore
              columns={getVersionColumns({
                dataFieldList,
                columnsFilter,
                isVersionTable: true,
                isNeedEdit: true,
                isRenderTitle: false,
              })}
              scroll={{ x: 'max-content' }}
              data={{
                list: handlerVersionData(rows) || [],
                pagination: {
                  page: pagination.currentPage,
                  ...pagination,
                },
              }}
            />
          </TableSearch>
          {/*
            //@ts-ignore */}
          <SubmitModal TableSearch={TableSearch} />
        </>
      ) : (
        <></>
      )}
    </>
  );

}
export default DataVersionList;
