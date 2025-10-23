import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Tooltip, Icon } from 'antd';
import lodash from 'lodash';
import AceEditor from 'react-ace';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ace-builds/src-noconflict/mode-text';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ace-builds/src-noconflict/theme-xcode';

import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import styles from './index.less';

export default ({ taskNotEditable }: any) => {
  const dispatch = useDispatch();

  const ruleContent = useSelector(
    ({ ruleEngineController }) => ruleEngineController.editData?.ruleContent
  );
  const advanceModeError = useSelector(
    ({ ruleEngineController }) => ruleEngineController.advanceModeError
  );

  const editChange = (e: string) => {
    dispatch({
      type: 'ruleEngineController/updateEditData',
      payload: {
        changedFields: { ruleContent: e },
      },
    });
  };

  return (
    <>
      <div className={styles.buttonAlpha}>
        {advanceModeError && (
          <Tooltip title={advanceModeError}>
            <Icon component={ErrorSvg} className={styles.alphaIcon} />
          </Tooltip>
        )}
        <AceEditor
          className={styles.ace}
          mode="text"
          editorProps={{ $blockScrolling: true }}
          readOnly={taskNotEditable}
          value={ruleContent}
          onChange={lodash.debounce(editChange, 150)}
          placeholder=""
          theme="xcode"
          name="blah2"
          width="100%"
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
            vScrollBarAlwaysVisible: true,
          }}
        />
      </div>
    </>
  );
};
