import React, { Component } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { getColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import type {
  ResultDataProps,
  CurrentMenuProps,
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { getDataFieldList } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import { getObjectData } from 'configuration/utils';
import { Delete, Duplicate } from 'configuration/components/Operators';
import styles from './index.less';

interface ComponentProps {
  dispatch: Dispatch;
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
  menu: CurrentMenuProps[];
  current: any;
  title: string;
  expandedRows: string[];
  tableLoading: boolean;
  resultData: ResultDataProps;
  extraColumns?: any[];
  dataImageMenu: CurrentMenuProps;
  searchDefault: any;
  isTabSearch: boolean;
  filterMap: any;
  searchParams: any;
  sortOrderMap: any;
  formData: any;
  listPage: any;
  isAdd: boolean;
  isUpdate: boolean;
  taskNotEditable: boolean;
  isUpdateMultiple: boolean;
  type: string;
  getExtraData?: Function;
  renderFormData: any;
}

class ConfigurationCommonTableList extends Component<ComponentProps> {
  TableSearch: any;

  onSearch = async (values = {}, isAutoSearch: any) => {
    const { dispatch, functionData, listPage, isAdd, type } = this.props;
    if (!functionData.id || (functionData && isAutoSearch && !lodash.isEmpty(listPage))) {
      return;
    }
    await dispatch({
      type: `${type}/${isAdd && !lodash.isEmpty(listPage) ? 'updateListPage' : 'listPage'}`,
      payload: {
        ...values,
        TableSearch: this.TableSearch,
        isAutoSearch,
      },
    });
  };

  handleDelete = (record: any, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const { dispatch, listPage, type } = this.props;
    dispatch({
      type: `${type}/saveListPage`,
      payload: {
        listPage: {
          ...listPage,
          rows: listPage?.rows?.filter((el: any) => el.cc_key !== record?.cc_key),
        },
      },
    });
  };

  // 获取列
  getFieldColumns = () => {
    const {
      functionData,
      extraColumns = [],
      isAdd,
      taskNotEditable,
      formData,
      listPage,
      getExtraData,
      renderFormData,
    } = this.props;
    const { dataFieldList, defaultSort } = functionData;

    let fieldColumns: any =
      getColumns({
        dataFieldList: getDataFieldList(dataFieldList),
        columnsFilter: {},
        defaultSort,
      }) || [];
    fieldColumns = [
      ...fieldColumns,
      ...extraColumns,
      {
        title: '', // 处理占位
      },
    ];
    fieldColumns.unshift({
      title: formatMessageApi({ Label_BIZ_Claim: 'configuration.label.operation' }),
      width: 100,
      render: (el: any, record: any) =>
        lodash.toUpper(record['#operation'] || record?.data?.['#operation']), // 兼容 USER的数据
    });

    if (isAdd && !taskNotEditable) {
      fieldColumns.unshift({
        title: '',
        width: 40,
        render: (el: any, record: any) => {
          return (
            <div className={styles.buttonGroup}>
              {/**
              //@ts-ignore */}
              {(record?.isDuplicate || record?.isWarning) && (
                <Duplicate record={record?.duplicateData}>
                  {renderFormData(record?.duplicateData)}
                </Duplicate>
              )}
              {/**
              //@ts-ignore */}
              <Delete
                formData={formData}
                listPage={listPage}
                record={record}
                handleDelete={this.handleDelete}
              />
            </div>
          );
        },
      });
    }
    return lodash.map(fieldColumns, (col: any) => {
      const componentType = lodash
        .chain(dataFieldList)
        .find((el) => el.fieldName === col.key)
        .get('componentType')
        .value();
      const extra = /text/.test(componentType)
        ? {
            render: (text: any) => {
              return (
                // @ts-ignore
                <Ellipsis tooltip lines={3}>
                  {text}
                </Ellipsis>
              );
            },
          }
        : {};
      const extraCol = getExtraData ? getExtraData(componentType, col) : extra;
      return {
        ...col,
        onHeaderCell: (column: any) => ({
          width: column.width,
        }),
        ...extraCol,
      };
    });
  };

  // 重置选择和搜索
  UNSAFE_componentWillReceiveProps = async (nextProps: ComponentProps) => {
    const { id: nextId } = nextProps.functionData;
    const {
      functionData: { id },
    } = this.props;
    if (id !== nextId && this.TableSearch) {
      this.TableSearch.setSelectedRows?.([]);
      this.TableSearch.setStateOfSearch({
        params: {},
      });
    }
  };

  componentDidMount = () => {
    const { dispatch, type } = this.props;
    if (this.TableSearch) {
      dispatch({
        type: `${type}/saveTableSearch`,
        payload: {
          TableSearch: this.TableSearch,
        },
      });
    }
  };

  handleResize = (column: any) => async (e: any, { size }: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { dispatch, type } = this.props;
    await dispatch({
      type: `${type}/resizeCellWidth`,
      payload: {
        fieldName: column.key,
        width: size.width,
      },
    });
  };

  fnOnRowClick = (record: any) => {
    const { formData, taskNotEditable, isUpdateMultiple, dispatch, listPage, type } = this.props;
    const newFormData = getObjectData(formUtils.cleanValidateData(formData));
    if (
      taskNotEditable ||
      // @ts-ignore
      lodash.isEqual(record?.cc_key, newFormData?.cc_key) ||
      isUpdateMultiple
    ) {
      return;
    }

    const targetRecord = (lodash.chain(listPage) as any)
      .get('rows')
      .find({ cc_key: formData.cc_key })
      .value();
    if (
      !lodash.isEmpty(newFormData) &&
      (!targetRecord ||
        (targetRecord && !lodash.isEqual(formUtils.cleanValidateData(formData), targetRecord)))
    ) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'WRN_000027',
            }),
          },
        ],
        {
          okFn: () => {
            dispatch({
              type: `${type}/saveFormData`,
              payload: {
                formData: record,
              },
            });
          },
          cancelFn: () => {},
        }
      );
    } else {
      dispatch({
        type: `${type}/saveFormData`,
        payload: {
          formData: record,
        },
      });
    }
  };

  render() {
    const { listPage, tableLoading, searchDefault, isUpdate } = this.props;
    const { rows = [], ...pagination } = listPage;
    const tableProps = {
      rowKey: 'cc_key',
      selectable: false,
      columns: this.getFieldColumns(),
      scroll: { x: 'max-content' },
      loading: tableLoading,
      sortMore: true,
      // components: {
      //   header: {
      //     cell: ResizableColumns,
      //   },
      // },
      data: {
        list: rows || [],
        pagination: {
          page: pagination.currentPage,
          ...pagination,
        },
      },
      getSelectedRowClassName: (record: any) => {
        return record.isDuplicate ? styles.isDuplicate : '';
      },
      onRow: (record: any, rowKey: any) => ({
        index: rowKey,
        record,
        sourcetype: 3,
        onClick: () => {
          this.fnOnRowClick(record);
        },
      }),
    };
    return (
      <div
        className={classnames({
          // [styles.update]: isUpdate,
          [styles.tableSearch]: true,
        })}
      >
        <TableSearch
          // @ts-ignore
          onSearch={this.onSearch}
          searchDefault={searchDefault}
          wrappedComponentRef={(c: any) => {
            this.TableSearch = c;
          }}
        >
          <></>
          <></>
          {/**
          //@ts-ignore */}
          <Table {...tableProps} />
        </TableSearch>
      </div>
    );
  }
}

export default ConfigurationCommonTableList;
