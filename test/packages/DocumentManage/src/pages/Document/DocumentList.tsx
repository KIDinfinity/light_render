import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Spin, Icon, Button } from 'antd';
import classNames from 'classnames';
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

import { ReactComponent as Download } from '../_static/download.svg';
import { ReactComponent as Tab } from '../_static/tab.svg';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';
import styles from './styles.less';
import { ESubjectType } from '@/components/SolutionRead/Enums';

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
  }));
  const [loading, setLoading] = useState(false);
  const [downloadLogin, setDownloadLogin] = useState(false);
  const { documentList } = useGetData();
  const { processInstanceId, inquiryBusinessNo } = caseInfo || {};
  const { selected } = toolsData[EToolModules.view] || {};
  const dispatch = useDispatch();

  const [state, uDispatch] = callReducer({ viewActived: selected });

  const fields = fieldConfigure?.[EToolModules.view];
  const config = findConfigsByFlagName(fields, EFieldFlagName.groupByFlag);
  const { fieldName } = config;

  const { viewActived } = state;
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

  const handleSelectAll = () => {
    if (getDocumentsLoading) return;

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        soureData: documenstList,
        type: isClickSelectAll ? 'clear' : 'all',
      },
    });
  };

  const handleUnread = () => {
    const unReadDocIds: string[] = [];
    lodash.values(selectedDocs).forEach((documentItem) => {
      if (documentItem.unRead && !documentItem.mustRead) {
        unReadDocIds.push(documentItem.docId);
      }
    });

    if (unReadDocIds.length) {
      dispatch({
        type: 'solutionRead/setReadItem',
        payload: { subjectIdList: unReadDocIds, subjectType: ESubjectType.DOC },
      });
    }
  };

  const handleDownloadAll = async () => {
    handleUnread();
    setDownloadLogin(true);
    for (const documentItem of lodash.values(selectedDocs)) {
      await dispatch({
        type: 'documentManagement/downloadFile',
        payload: {
          data: documentItem,
        },
      });
    }

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
    setDownloadLogin(false);
  };

  const handleOpentabAll = async () => {
    handleUnread();

    lodash.values(selectedDocs).forEach((i) => {
      window.open(
        `documentStream/page?inquiryBusinessNo=${inquiryBusinessNo}&caseNo=${processInstanceId}&id=${i.id}&imageId=${
          i.image
        }&name=${encodeURIComponent(i.name)}&mimeType=${i.mimeType}&formCategory=${i.formCategory}`,
        '_blank'
      );
    });

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
  };

  return (
    <div className={styles.documentList}>
      {documenstList.length > 0 && (
        <div className={styles.btns}>
          <span
            className={classNames(styles.select, { [styles.selected]: isClickSelectAll })}
            onClick={handleSelectAll}
          >
            Select All
          </span>
          {isClickSelectAll && !toolsData.download?.noAuth && (
            <Button className={styles.btn} onClick={handleDownloadAll} loading={downloadLogin}>
              <Icon component={Download} />
            </Button>
          )}

          {isClickSelectAll && (
            <Button className={styles.btn} onClick={handleOpentabAll}>
              <Icon component={Tab} />
            </Button>
          )}
        </div>
      )}

      {loading || getDocumentsLoading ? (
        <div className={styles.emptyBox}>
          <Spin size="large" />
        </div>
      ) : (
        lodash
          .chain(documenstList)
          .map(({ documents, groupValue, hideTitle }) => {
            return (
              <div className={styles.documentGroup} key={`${groupValue}`}>
                {(!hideTitle || viewActived) && (
                  <div className={styles.documentGroupTitle}>
                    {formatMessageApi({
                      [getTypeCode(fieldName)]: isIsoDateFormat(groupValue)
                        ? moment(groupValue).format('L')
                        : groupValue,
                    })}
                  </div>
                )}
                {lodash
                  .chain(documents)
                  .map((document: DocumentModel, index: number) =>
                    !isClickSelectAll && editActived && selectedDocs[document?.docId] ? (
                      <ToolsGroup.Edit
                        documentItem={document}
                        key={`${document?.docId}-${index}`}
                      />
                    ) : (
                      <DocumentItem
                        documentItem={document}
                        processInstanceId={processInstanceId}
                        inquiryBusinessNo={inquiryBusinessNo}
                        key={`${document?.docId}-${index}`}
                      />
                    )
                  )
                  .value()}
              </div>
            );
          })
          .value()
      )}
    </div>
  );
};

export default DocumentList;
