import React from 'react';
import { useDispatch } from 'dva';
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

const Header = ({ value = '', onChange, disabled = false }: any) => {
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

  const onChangeDefault = (sql: string) => {
    dispatch({
      type: 'sqlController/saveSQL',
      payload: {
        sql,
      },
    });
  };

  return (
    <div className={styles.content}>
      <AceEditor
        readOnly={disabled}
        placeholder=""
        mode="mysql"
        theme="xcode"
        name="blah2"
        width="100%"
        height="240px"
        value={value}
        onLoad={onLoad}
        onChange={onChange || onChangeDefault}
        fontSize={14}
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
      />
    </div>
  );
};

export default Header;
