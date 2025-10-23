import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { Table, Input } from 'antd';
import type { Dispatch } from 'dva';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { searchContent } from '@/utils/constant/SearchContent';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import styles from './index.less';

// const { RangePicker } = TimePicker;
const { Search } = Input;

function SearchTable(props: any) {
  const {
    columns,
    dataSource,
    api,
    group,
    pagination,
    searchParams,
    searchIndexList,
    visible,
    activeGroup,
    scroll,
    searchFiledsConfig,
  } = props;
  const [sortCache, setSortCache] = useState({});
  const [selectedKey, setSelectedKey] = useState({});
  const dispatch: Dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const searchLoading = loading.effects['medicalSearch/search'];
  const handleChangeTable = (pageParams, filterParams, sortParams) => {
    setSortCache(sortParams);
    let newPagination = pageParams;
    // sort 值有变化说明用户点击了排序, 分页重置为1
    if (!lodash.isEqual(sortParams, sortCache)) {
      newPagination = {
        ...pageParams,
        current: 1,
      };
    }
    dispatch({
      type: 'medicalSearch/search',
      payload: {
        api,
        group,
        pagination: newPagination,
        searchParams,
        sorter: sortParams,
      },
    });
  };
  useEffect(() => {
    if (visible && activeGroup === group) {
      dispatch({
        type: 'medicalSearch/search',
        payload: {
          api,
          group,
          searchParams,
          pagination,
          sorter: {},
        },
      });
    }
  }, [visible, activeGroup]);
  const handleSearch = () => {
    dispatch({
      type: 'medicalSearch/search',
      payload: {
        api,
        group,
        searchParams,
        pagination: {
          ...pagination,
          current: 1,
        },
      },
    });
  };

  const addSearchColumns = lodash.map(columns, (column) => {
    if (lodash.includes(searchIndexList, column?.dataIndex)) {
      const config = lodash.get(searchFiledsConfig, column?.dataIndex);
      const { type, format, action } = lodash.pick(config, ['type', 'format', 'action']);
      return {
        ...column,
        render: (text, item) => {
          if (text === searchContent) {
            switch (type) {
              case 'RangePicker':
                return (
                  <RangePicker
                    format="L"
                    value={searchParams[column.dataIndex]}
                    onChange={(value) => {
                      dispatch({
                        type: 'medicalSearch/updateSearchParams',
                        payload: {
                          dataIndex: column?.dataIndex,
                          value,
                          group,
                        },
                      });
                      let result = value;
                      if (lodash.isFunction(format)) {
                        result = format(result);
                      }
                      if (lodash.isString(action)) {
                        dispatch({
                          type: action,
                          payload: {
                            ...result,
                            api,
                            group,
                            searchParams,
                            pagination,
                            sorter: {},
                          },
                        });
                      }
                    }}
                  />
                );
              default:
                return (
                  <Search
                    placeholder={`${formatMessageApi({
                      Label_BIZ_Claim: `venus_bpm.label.medicalSearch.${column?.dataIndex}`,
                    })}`}
                    onSearch={handleSearch}
                    value={searchParams[column.dataIndex]}
                    onChange={(e) => {
                      const value = e?.target?.value;
                      dispatch({
                        type: 'medicalSearch/updateSearchParams',
                        payload: {
                          dataIndex: column?.dataIndex,
                          value,
                          group,
                        },
                      });
                    }}
                  />
                );
            }
          }
          return (column?.render && column.render(text, item)) || text;
        },
      };
    }
    return column;
  });
  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <Table
        className={classNames(styles.searchTable, styles[group])}
        columns={addSearchColumns}
        dataSource={dataSource}
        onChange={handleChangeTable}
        pagination={{
          ...pagination,
          style: {
            width: document.querySelector('#tblSearhModal .ant-tabs')?.clientWidth,
          },
        }}
        rowKey="id"
        loading={searchLoading}
        scroll={scroll}
        rowClassName={(record: any) => {
          return record?.id === selectedKey ? 'selected' : '';
        }}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (index === 0) {
                return;
              }
              setSelectedKey(record?.id);
            },
          };
        }}
      />
    </div>
  );
}

export default React.memo(SearchTable);
