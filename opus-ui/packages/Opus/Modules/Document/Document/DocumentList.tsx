import type { FunctionComponent} from 'react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Spin, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import isIsoDateFormat from 'claim/pages/utils/isIsoDateFormat';
import type { DocumentModel, StateModel } from '../_dto/model';
import { findConfigsByFlagName, getTypeCode } from '../_functions';
import { EToolModules, EFieldFlagName } from '../_dto/enums';
import {
  handleWarnMessageModal,
  handleErrorMessageIgnoreXErrorNotice,
} from '@/utils/commonMessage';
import DocumentItem from './DocumentItem';

import ToolsGroup from '../ToolsGroup';
import { callReducer, actions, useGetDocumentList } from '../_hooks';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';
import styles from './styles.less';

interface IDocument {
  documentList?: DocumentModel[];
  toolsData?: DocumentModel[];
}

const { SAVEVIEWACTIVED } = actions;

const DocumentList: FunctionComponent<IDocument> = () => {
  const {
    toolsData = {},
    caseInfo,
    dropdownConfigure,
    getDocumentsLoading,
    fieldConfigure,
    selectedData: { selectedDocs, isClickSelectAll },
    viewActived,
  }: StateModel = useSelector(({ documentManagement, solutionRead, loading }: any) => ({
    toolsData: documentManagement.toolsData,
    caseInfo: documentManagement.caseInfo,
    dropdownConfigure: documentManagement.dropdownConfigure,
    getDocumentsLoading: loading.effects['documentManagement/getDocuments'],
    searchValue: documentManagement.searchValue,
    fieldConfigure: documentManagement.fieldConfigure,
    readData: solutionRead?.readData,
    isAssinee: solutionRead?.isAssinee || false,
    selectedData: documentManagement.selectedData,
    viewActived: documentManagement.viewActived,
  }));
  const [loading, setLoading] = useState(false);
  const { documentList } = useGetData();
  const { processInstanceId, inquiryBusinessNo } = caseInfo || {};
  const { selected } = toolsData[EToolModules.view] || {};
  const dispatch = useDispatch();

  const [state, uDispatch] = callReducer({ viewActived: selected });

  const fields = fieldConfigure?.[EToolModules.view];
  const config = findConfigsByFlagName(fields, EFieldFlagName.groupByFlag);
  const { fieldName } = config;

  const editActived = toolsData[EToolModules.edit]?.selected;

  const documenstList = useGetDocumentList({
    documentList,
    fieldConfigure,
    dropdownConfigure,
    fieldName,
    viewActived,
  });
  useEffect(() => {
    uDispatch({
      type: SAVEVIEWACTIVED,
      payload: {
        viewActived: selected,
      },
    });
  }, [selected]);

  const syncGetDocumentList = async () => {
    setLoading(true);
    const res = await dispatch({
      type: 'documentManagement/checkDocStatus',
    });
    if (res?.success === false) {
      // 仅第一次call 的时候显示
      handleErrorMessageIgnoreXErrorNotice(res);
    } else {
      // 同步
      const response: any = await dispatch({
        type: 'documentManagement/syncDocView',
      });
      const { success } = lodash.pick(response, ['success']);
      if (!success) {
        handleWarnMessageModal(response?.promptMessages, {
          okFn: () => {
            syncGetDocumentList();
          },
          cancelFn: () => {},
        });
      }
    }
    setLoading(false);
    dispatch({
      type: 'documentManagement/getDocuments',
      payload: { caseNo: processInstanceId, inquiryBusinessNo },
    });
  };
  useEffect(() => {
    if (processInstanceId) {
      syncGetDocumentList();
    }
  }, [caseInfo]);
  useEffect(() => {
    let time: any;
    async function start(loopSearch: any[]) {
      const result = await dispatch({
        type: 'documentManagement/loopSearchStatus',
        payload: { documentIdList: loopSearch },
      });

      if (!result) {
        time = setTimeout(() => {
          start(loopSearch);
        }, 5000);
      }
    }

    if (lodash.some(documentList, (item) => lodash.toLower(item.imageUploadStatus) === 'todo')) {
      const loopSearch = lodash
        .filter(documentList, (item) => lodash.toLower(item.imageUploadStatus) === 'todo')
        .map((item) => item.docId);

      time = setTimeout(() => {
        start(loopSearch);
      }, 5000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [documentList]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'documentManagement/selectDocItem',
        payload: {
          selectedDocId: '',
          selectedId: '',
        },
      });

      dispatch({
        type: 'documentManagement/saveImageUrl',
        payload: {
          documentItem: {},
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DocumentGroup = ({ item }: any) => {
    const [expand, setExpand] = useState(false);
    const { documents, groupValue, hideTitle } = lodash.pick(item, [
      'documents',
      'groupValue',
      'hideTitle',
    ]);

    return (
      <div className={styles.documentGroup}>
        {(!hideTitle || viewActived) && (
          <div className={styles.documentGroupTitle}>
            {formatMessageApi({
              [getTypeCode(fieldName)]: isIsoDateFormat(groupValue)
                ? moment(groupValue).format('L')
                : groupValue,
            })}
            <Icon type={!expand ? 'up' : 'down'} onClick={() => setExpand(!expand)} />
          </div>
        )}
        {!expand &&
          lodash
            .chain(documents)
            .map((document: DocumentModel, index: number) =>
              !isClickSelectAll && editActived && selectedDocs[document?.docId] ? (
                <ToolsGroup.Edit documentItem={document} key={`${document?.docId}-${index}`} />
              ) : (
                <DocumentItem documentItem={document} key={`${document?.docId}-${index}`} />
              )
            )
            .value()}
      </div>
    );
  };
  return (
    <>
      <div className={styles.documentList}>
        {loading || getDocumentsLoading ? (
          <div className={styles.emptyBox}>
            <Spin size="large" />
          </div>
        ) : (
          lodash
            .chain(documenstList)
            .map((item) => {
              return <DocumentGroup item={item} key={`${item.groupValue}`} />;
            })
            .value()
        )}
      </div>
    </>
  );
};

export default DocumentList;
