/* eslint-disable @typescript-eslint/no-shadow */
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon, Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { DocumentModel, StateModel } from '../_dto/model';
import { EFieldFlagValue, EToolModules, EFieldFlagName } from '../_dto/enums';
import { getTypeCode, fieldsGenerator, findConfigsByFlagName } from '../_functions';
import DocLayout from '../_components/DocLayout';
import FieldsRender from '../_components/FieldsRender';
import { ReactComponent as Download } from '../_static/download.svg';
import { ReactComponent as Tab } from '../_static/tab.svg';

import styles from './styles.less';
import { downloadDocStreamUrl } from '../Viewer/config';
import { ESubjectType } from '@/components/SolutionRead/Enums';

interface IDocumentItem {
  documentItem: DocumentModel;
}

const DocumentItem: FunctionComponent<IDocumentItem> = ({ documentItem }) => {
  const {
    docId,
    id,
    voidFlag,
    indexClass,
    formCategory,
    imageUploadStatus = 'success',
  } = documentItem || {};

  const {
    readData,
    isAssinee,
    dropdownConfigure,
    fieldConfigure,
    toolsData,
    selectedData: { selectedDocs, isClickSelectAll },
  }: StateModel = useSelector(({ documentManagement, solutionRead }: any) => ({
    // selectedDocId: documentManagement.selectedDocId,
    view: documentManagement.fieldConfigure?.[EToolModules.view],
    dropdownConfigure: documentManagement.dropdownConfigure,
    fieldConfigure: documentManagement.fieldConfigure,
    readData: solutionRead?.readData,
    isAssinee: solutionRead?.isAssinee || false,
    toolsData: documentManagement.toolsData,
    selectedData: documentManagement.selectedData,
  }));

  const dispatch = useDispatch();

  const flag = lodash.isNumber(voidFlag) && voidFlag === EFieldFlagValue.True;

  const handleDocClick = (imageUploadStatus: string, selectDocId?: string, id?: string) => {
    if (imageUploadStatus === 'fail') return;

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: isClickSelectAll ? 'mutiple' : 'single',
        documentItem,
      },
    });

    dispatch({
      type: 'documentManagement/selectDocItem',
      payload: {
        selectedDocId: selectDocId,
        selectedId: id,
      },
    });

    if (isClickSelectAll) return;

    dispatch({
      type: 'documentManagement/updateToolData',
      payload: {
        toolId: 'void',
        dataKey: 'disabled',
        dataVal: false,
      },
    });

    dispatch({
      type: 'documentManagement/saveImageUrl',
      payload: {
        documentItem,
      },
    });
  };

  const handleRetry = () => {
    dispatch({
      type: 'documentManagement/retryUpload',
      payload: {
        documentItem,
      },
    });
  };

  const getFieldName = () => {
    dispatch({
      type: 'documentManagement/getFieldName',
      payload: {
        documentItem,
      },
    });
  };

  const handleUnread = () => {
    if (documentItem?.unRead) {
      dispatch({
        type: 'solutionRead/setReadItem',
        payload: { subjectIdList: [documentItem.docId], subjectType: ESubjectType.DOC },
      });
    }
  };

  const handleDownload = () => {
    handleUnread();

    dispatch({
      type: 'documentManagement/downloadFile',
      payload: {
        data: documentItem,
      },
    });
  };

  const handleOpentab = () => {
    handleUnread();

    window.open(
      `${downloadDocStreamUrl}?imageId=${documentItem.image}&name=${encodeURIComponent(
        documentItem.name
      )}&mimeType=${documentItem.mimeType}`,
      '_blank'
    );
  };

  const fields = fieldConfigure?.[EToolModules.view];

  const config = findConfigsByFlagName(fields, EFieldFlagName.titleFlag);
  const { fieldName } = config;
  const typeCode = getTypeCode(fieldName);
  const result = fieldsGenerator(fields, { indexClass, formCategory, dropdownConfigure });

  return (
    <div className={styles.fBtn}>
      <div className={styles.sBtn}>
        {!toolsData?.download.noAuth && (
          <Button className={styles.btn} onClick={handleDownload}>
            <Icon component={Download} />
          </Button>
        )}

        <Button className={styles.btn} onClick={handleOpentab}>
          <Icon component={Tab} />
        </Button>
      </div>
      <DocLayout
        onClick={() => handleDocClick(imageUploadStatus, docId, id)}
        selected={!!selectedDocs[docId || '']}
        className={flag ? styles.submitVoid : ''}
        documentItem={documentItem}
        readData={readData}
        isAssinee={isAssinee}
      >
        <DocLayout.DocTitle>
          <div className={styles.title}>
            {formatMessageApi({ [lodash.trim(typeCode)]: documentItem?.[fieldName] })}
            {lodash.toLower(imageUploadStatus) === 'fail' && (
              <Icon type="reload" onClick={handleRetry} className={styles.reload} />
            )}
            {lodash.toLower(imageUploadStatus) === 'success' &&
              !/.*\..+/.test(documentItem?.name as string) && (
                <Icon type="reload" onClick={getFieldName} className={styles.reload} />
              )}
          </div>
        </DocLayout.DocTitle>

        <div>
          {documentItem?.customerName &&
            `${formatMessageApi({
              Dropdown_CLM_CustomerRole: documentItem?.customerType,
            })} - ${documentItem.customerName}`}
        </div>

        <FieldsRender.DocField
          fields={result}
          documentItem={documentItem}
          imageUploadStatus={imageUploadStatus}
        />
      </DocLayout>
    </div>
  );
};

export default DocumentItem;
