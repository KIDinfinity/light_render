import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Icon } from 'antd';
import AceEditor from 'react-ace';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ace-builds/src-noconflict/mode-mysql';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ace-builds/src-noconflict/theme-xcode';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ace-builds/src-min-noconflict/ext-language_tools';
import tableConfig from './table.config';
import fieldConfig from './field.config';
import styles from './index.less';

const Header = ({ showSQL, showSQLfn }) => {
  const sql = useSelector(({ sqlController }: any) => sqlController.sql);
  const dispatch = useDispatch();
  const onLoad = (editor: any) => {
    editor.completers.push({
      // @ts-ignore
      getCompletions(_editors, _session, _pos, _prefix, callback) {
        callback(null, [
          ...tableConfig.map((el) => ({
            name: 'name',
            value: el,
            meta: 'owb table',
          })),
          ...fieldConfig.map((el) => ({
            name: 'name',
            value: el,
            meta: 'owb field',
          })),
        ]);
      },
    });
  };

  const onChange = (sql: string) => {
    dispatch({
      type: 'sqlController/saveSQL',
      payload: {
        sql,
      },
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.sql} onClick={showSQLfn}>
        <span>SQL</span>
        <span>{showSQL ? <Icon type="up" /> : <Icon type="down" />}</span>
      </div>
      <AceEditor
        placeholder=""
        mode="mysql"
        theme="xcode"
        name="blah2"
        width="100%"
        height={showSQL ? '20rem' : '0px'}
        onLoad={onLoad}
        onChange={onChange}
        fontSize={'1.1rem'}
        highlightActiveLine
        showGutter={false}
        showPrintMargin={false}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: false,
          tabSize: 2,
        }}
        value={sql}
      />
    </div>
  );
};

export default Header;
