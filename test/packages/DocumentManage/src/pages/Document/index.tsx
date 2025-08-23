import type { FunctionComponent} from 'react';
import React, { useEffect, useRef } from 'react';
import { Provider } from '@/components/_store';
import { EToolModules } from '../_dto/enums';
import type { CaseInfoModel, ToolsDataModel } from '../_dto/model';
import DocumentList from './DocumentList';
import ToolsGroup from '../ToolsGroup';
import { callReducer, actions } from '../_hooks';

import styles from './styles.less';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';

interface ICaseInfo {
  caseInfo?: CaseInfoModel;
  toolsData?: ToolsDataModel;
  documentList?: any;
}

const { FORCEUPDATE } = actions;

const Document: FunctionComponent<ICaseInfo> = () => {
  const [state, uDispatch] = callReducer({ force: false });
  const documentRef = useRef();
  const { documentList } = useGetData();

  const handleScrollTop = () => {
    if (documentRef.current) {
      // @ts-ignore
      documentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    uDispatch({
      type: FORCEUPDATE,
      payload: {
        force: !state.force,
      },
    });
  }, [documentList]);

  return (
    <Provider data={{ handleScrollTop, documentRef }}>
      <div
        className={styles.documentWrap}
        ref={(ref) => {
          // @ts-ignore
          documentRef.current = ref;
        }}
      >
        <ToolsGroup.Tools.ToolInit moduleId={EToolModules.mandatory}>
          <ToolsGroup.Mandatory />
        </ToolsGroup.Tools.ToolInit>
        <ToolsGroup.Tools.ToolInit moduleId={EToolModules.upload}>
          <ToolsGroup.Upload />
        </ToolsGroup.Tools.ToolInit>
        <DocumentList />
      </div>
    </Provider>
  );
};

export default Document;
