import React, { useRef, useState, useMemo } from 'react';
import { Table, Input, Button, Icon, notification, Popover } from 'antd';
import { useDispatch, useSelector } from 'umi';
import JSONView from 'react-json-view';
import XMLViewer from 'react-xml-viewer';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

// @ts-ignore
import Highlighter from 'react-highlight-words';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';

enum DataType {
  XML = 'XML',
  JSON = 'JSON',
  TEXT = 'TEXT',
}

interface dataTypeJudeProps {
  resultData?: any;
  success: boolean;
  resultType?: string;
}

const toJson = (text: string) => {
  let contextJson = safeParseUtil(text);
  if (typeof contextJson === 'string') {
    contextJson = safeParseUtil(contextJson);
  }
  return contextJson;
};

const toXML = (data: dataTypeJudeProps) => {
  const xmlDoc = data.resultData;
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDoc);

  // 格式化 XML 字符串
  const formatted = xmlStr
    .replace(/(>)(<)(\/*)/g, '$1\r\n$2$3')
    .replace(/(<\w+)(\s.*?>)/g, (match, nodeName, attributes) => {
      return nodeName + attributes.replace(/\s+(\w+=)/g, '\r\n$1');
    })
    .replace(/>\s*</g, '>\r\n<');

  return formatted;
};

export const dataTypeJude = (text: string) => {
  const isXMLv2 = (str: string) => {
    if (typeof str !== 'string' || str.trim() === '') {
      return { success: false };
    }
    const contextJson = safeParseUtil(str);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(contextJson, 'text/xml');
    const parserErrors = xmlDoc.getElementsByTagName('parsererror');

    if (parserErrors.length === 0) {
      return { resultData: xmlDoc, resultType: DataType.XML, success: true };
    }
    return { success: false };
  };

  const isJson = (str: string) => {
    const contextJson = toJson(str);
    if (!lodash.isEmpty(contextJson)) {
      return { success: true };
    }
    return { success: false };
  };
  const theme = LS.getItem(LSKey.THEME, false);
  const xmlResult: dataTypeJudeProps = isXMLv2(text);

  if (xmlResult.success) {
    return { resultType: DataType.XML, component: <XMLViewer xml={toXML(xmlResult)} /> };
  } else if (isJson(text).success) {
    return {
      resultType: DataType.JSON,
      component: (
        <JSONView src={toJson(text)} theme={theme === 'dark' ? 'railscasts' : 'rjv-default'} />
      ),
    };
  } else {
    return { resultType: DataType.TEXT, component: text };
  }
};

const ResultTable = ({ item = {}, index, showSQL }: any) => {
  const { resultSet } = item;
  const dispatch = useDispatch();
  const searchInput: any = useRef();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const exportLoading: boolean = useSelector(
    (state: any) => state.loading.effects['sqlController/print']
  );

  const copy = (text) => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
    notification.success({ message: 'Copy Success' });
  };

  const setPageFn = (e: any) => {
    setPage(e.current);
  };

  const exportCur = () => {
    dispatch({ type: 'sqlController/print', payload: { index, type: 'current', page } });
  };

  const exportAll = () => {
    dispatch({ type: 'sqlController/print', payload: { index, type: 'all', page } });
  };

  const handleSearch = (selectedKeys: string, confirm: Function, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: Function) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? '#ffc069' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select());
      }
    },
    render: (text: any = '-') => {
      let newText = text;
      if (/{/.test(text) || /.java:/.test(text) || newText?.length > 800 || /xml/.test(text)) {
        const title = (
          <Button
            style={{ textAlign: 'center' }}
            type="primary"
            onClick={() => {
              copy(text);
            }}
          >
            copy
          </Button>
        );

        const context = dataTypeJude(text);
        newText = (
          <Popover
            className={styles.ellipsis}
            content={<div className={styles.content}>{context.component}</div>}
            title={title}
          >
            {text}
          </Popover>
        );
      }

      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={newText?.toString() || newText}
        />
      ) : (
        newText || '-'
      );
    },
  });

  const columns = useMemo(
    () =>
      Object.keys(resultSet?.[0])?.map((key: string) => ({
        title: key,
        name: key,
        sorter: (a: any, b: any) => `${a?.[key] || ''}`?.localeCompare(`${b?.[key] || ''}`),
        dataIndex: key,
        width: 160,
        ...getColumnSearchProps(key),
      })),
    [resultSet, searchedColumn, searchText]
  );

  const dataSource = useMemo(
    () => resultSet?.map((el: any, idx: number) => ({ ...el, cc_id: idx })),
    [resultSet]
  );

  return (
    <div className={styles.tableResult}>
      <div className={styles.export}>
        <Button className={styles.exportBtn} onClick={exportCur} loading={exportLoading}>
          Export Current Page
        </Button>
        <Button className={styles.exportBtn} onClick={exportAll} loading={exportLoading}>
          Export All
        </Button>
      </div>
      <Table
        onChange={setPageFn}
        scroll={{
          x: 'max-content',
          y: showSQL ? 'calc(100vh - 50rem)' : 'calc(100vh - 30rem)',
          scrollToFirstRowOnChange: true,
        }}
        rowKey="cc_id"
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default ResultTable;
