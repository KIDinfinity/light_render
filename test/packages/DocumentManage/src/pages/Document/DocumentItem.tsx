/* eslint-disable @typescript-eslint/no-shadow */
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon, Button, Tooltip } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { DocumentModel, StateModel } from '../_dto/model';
import { EFieldFlagValue, EToolModules, EFieldFlagName } from '../_dto/enums';
import { getTypeCode, fieldsGenerator, findConfigsByFlagName } from '../_functions';
import DocLayout from '../_components/DocLayout';
import FieldsRender from '../_components/FieldsRender';
import { ReactComponent as Download } from '../_static/download.svg';
import { ReactComponent as Tab } from '../_static/tab.svg';
import { ReactComponent as supplementdocument } from '../_static/wakeUp.svg';
import { ReactComponent as uploadbyowb } from '../_static/sourceOWB.svg';
import { ReactComponent as retrievedfromimaging } from '../_static/sourceLocalSystem.svg';
import { ReactComponent as submissiondocument } from '../_static/sourceESubmission.svg';

import styles from './styles.less';
import { ESubjectType } from '@/components/SolutionRead/Enums';

const sourceIconMap = {
  supplementdocument,
  uploadbyowb,
  retrievedfromimaging,
  submissiondocument
}
interface IDocumentItem {
  documentItem: DocumentModel;
  processInstanceId: string;
}

const DocumentItem: FunctionComponent<IDocumentItem> = ({
  documentItem,
  processInstanceId,
  inquiryBusinessNo,
}) => {
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

    dispatch({
      type: 'documentManagement/saveReadItem',
      payload: {
        readItem: {
          docId: documentItem.docId,
          unRead: documentItem.unRead,
          mustRead: documentItem.mustRead,
          name: documentItem.name,
        },
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
    if (documentItem?.unRead && !documentItem.mustRead) {
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
      `documentStream/page?inquiryBusinessNo=${inquiryBusinessNo}&caseNo=${processInstanceId}&id=${id}&imageId=${
        documentItem.image
      }&name=${encodeURIComponent(documentItem.name)}&mimeType=${
        documentItem.mimeType
      }&formCategory=${formCategory}`,
      '_blank'
    );
  };

  const fields = fieldConfigure?.[EToolModules.view];

  const config = findConfigsByFlagName(fields, EFieldFlagName.titleFlag);
  const { fieldName } = config;
  const typeCode = getTypeCode(fieldName);
  const result = fieldsGenerator(fields, { indexClass, formCategory, dropdownConfigure });

  const sourceNameMap = {
    eSubmission: 'submissiondocument',
    manualUpload: 'uploadbyowb',
    wakeUp: 'supplementdocument',
    docScanning: 'submissiondocument',
    wakeupScanning: 'supplementdocument',
    opSystemGen: 'uploadbyowb',
    retrevedFromImaging: 'retrievedfromimaging',
  }

  const iconName = sourceNameMap[documentItem?.sourceOfDoc] || null;
  const component = iconName && sourceIconMap[iconName];
  return (
    <div className={styles.fBtn}>
      <DocLayout
        onClick={() => handleDocClick(imageUploadStatus, docId, id)}
        selected={!!selectedDocs[docId || '']}
        className={flag ? styles.submitVoid : ''}
        documentItem={documentItem}
        readData={readData}
        isAssinee={isAssinee}
      >
        <div className={styles.documentItem}>
          {component && (
            <Icon component={component} className={styles.titleIcon} title={formatMessageApi({ Label_COM_DocumentSource: iconName })} />
          )}
          <div style={{ flex: 1 }}>
            <DocLayout.DocTitle className={styles.title}>
              <Tooltip
                title={formatMessageApi({ Label_COM_Message: 'MSG_000617' })}
                overlayClassName={styles.error}
              >
                {lodash.toLower(imageUploadStatus) === 'fail' && (
                  <Icon type="close-circle" className={styles.errorIcon} />
                )}
              </Tooltip>
              <div
                className={styles.main}
                title={formatMessageApi({ [lodash.trim(typeCode)]: documentItem?.[fieldName] })}
              >
                {formatMessageApi({ [lodash.trim(typeCode)]: documentItem?.[fieldName] })}
              </div>
              {!toolsData?.download?.noAuth && lodash.toLower(imageUploadStatus) !== 'fail' && (
                <Button className={styles.btn} onClick={handleDownload}>
                  <Icon component={Download} />
                </Button>
              )}
              {lodash.toLower(imageUploadStatus) !== 'fail' && (
                <Button className={styles.btn} onClick={handleOpentab}>
                  <Icon component={Tab} />
                </Button>
              )}
              {lodash.toLower(imageUploadStatus) === 'fail' && (
                <Icon type="reload" onClick={handleRetry} className={styles.reload} />
              )}
              {lodash.toLower(imageUploadStatus) === 'success' &&
                !/.*\..+/.test(documentItem?.name as string) && (
                  <Icon type="reload" onClick={getFieldName} className={styles.reload} />
                )}
            </DocLayout.DocTitle>
            <div>
              {documentItem?.customerName &&
                `${formatMessageApi({
                  Dropdown_CLM_CustomerRole: documentItem?.customerType,
                })} - ${documentItem.customerName}`}
            </div>
            {/* 这里要特殊处理，单独在title显示错误。因此当上传失败的情况下，在title单独展示，避免将值为fail的imageUploadStatus传下去渲染doc name前面自己的错误 */}
            <FieldsRender.DocField
              fields={result}
              documentItem={documentItem}
              imageUploadStatus={lodash.toLower(imageUploadStatus) !== 'fail'? imageUploadStatus : ''}
            />
          </div>
        </div>
      </DocLayout>
    </div>
  );
};

export default DocumentItem;
