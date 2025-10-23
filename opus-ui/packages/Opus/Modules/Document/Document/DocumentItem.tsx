/* eslint-disable @typescript-eslint/no-shadow */
import type { FunctionComponent } from 'react';
import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'dva';
import { Icon, Checkbox, Tooltip } from 'antd';
import lodash from 'lodash';
import { getAuth } from '@/auth/Utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { DocumentModel, StateModel } from '../_dto/model';
import { EToolModules } from '../_dto/enums';
import { fieldsGenerator } from '../_functions';
import DocLayout from '../_components/DocLayout';
import FieldsRender from '../_components/FieldsRender';
import { ReactComponent as ConfirmationIcon } from 'opus/Assets/icon-modal-confirm.svg';
import { ReactComponent as Retry } from '../_static/icon-Retry.svg';
import { ReactComponent as Edit } from '../_static/icon-Edit.svg';
import { ReactComponent as Delete } from '../_static/icon-Delete.svg';
import { ReactComponent as UnVoid } from '../_static/icon-UnVoid.svg';

import styles from './styles.less';
import classNames from 'classnames';
import { Region, tenant } from '@/components/Tenant';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import { Action } from '@/components/AuditLog/Enum';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';

interface IDocumentItem {
  documentItem: DocumentModel;
}

const DocumentItem: FunctionComponent<IDocumentItem> = ({ documentItem }) => {
  const { docId, id, indexClass, formCategory, imageUploadStatus = 'success' } = documentItem || {};

  const {
    readData,
    isAssinee,
    dropdownConfigure,
    fieldConfigure,
    toolsData,
    selectedData: { selectedDocs, isClickSelectAll },
    commonAuthorityList,
  }: StateModel = useSelector(({ documentManagement, authController, solutionRead }: any) => ({
    // selectedDocId: documentManagement.selectedDocId,
    view: documentManagement.fieldConfigure?.[EToolModules.view],
    dropdownConfigure: documentManagement.dropdownConfigure,
    fieldConfigure: documentManagement.fieldConfigure,
    readData: solutionRead?.readData,
    isAssinee: solutionRead?.isAssinee || false,
    toolsData: documentManagement.toolsData,
    selectedData: documentManagement.selectedData,
    commonAuthorityList: authController.commonAuthorityList || [],
  }));
  const { documentList } = useGetData();

  const dispatch = useDispatch();

  const handleDocClick = (
    imageUploadStatus: string,
    selectDocId?: string,
    id?: string,
    isCheckbox?: boolean
  ) => {
    if (imageUploadStatus === 'fail') return;

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: isCheckbox || isClickSelectAll ? 'mutiple' : 'single',
        documentItem,
        isCheckbox,
      },
    });

    dispatch({
      type: 'documentManagement/selectDocItem',
      payload: {
        selectedDocId: selectDocId,
        selectedId: id,
      },
    });

    if (isCheckbox || isClickSelectAll) return;

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

  const setEditVisit = () => {
    dispatch({
      type: 'documentManagement/setEditVisit',
      payload: {
        documentEdit: {
          ...documentItem,
          name:
            documentItem?.name.substring(0, documentItem?.name.lastIndexOf('.')) ||
            documentItem?.name,
        },
        editVisit: true,
      },
    });
  };

  const setVoid = async ({ unVoid = false }) => {
    if (!!selectedDocs[docId || '']) {
      dispatch({
        type: 'documentManagement/changeSelectdData',
        payload: {
          type: 'single',
          documentItem,
          isCheckbox: false,
        },
      });

      dispatch({
        type: 'documentManagement/selectDocItem',
        payload: {
          selectedDocId: docId,
          selectedId: id,
        },
      });
    }

    dispatch({
      type: 'documentManagement/setVoid',
      payload: {
        voiding: false,
        voidDocumentItem: { ...documentItem, voidFlag: unVoid ? 0 : 1 },
      },
    });
    return dispatch({
      type: 'documentManagement/submitVoid',
      payload: {
        actionType: Action.SetVoid,
        dispatch,
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

  const fields = fieldConfigure?.[EToolModules.view];
  const result = fieldsGenerator(fields, { indexClass, formCategory, dropdownConfigure });
  const receivedDateConfig = lodash.chain(result).find(['formName', 'receivedDate']).value();
  const fieldsConfig = lodash
    .chain(result)
    .filter((item) => item.formName !== 'receivedDate')
    .value();

  const voidAuth = getAuth(commonAuthorityList, {
    authorityCode: 'RS_BP_Button_DocMgm_Void',
  });
  const editAuth = getAuth(commonAuthorityList, {
    authorityCode: 'RS_BP_Button_DocMgm_Edit',
  });
  const voidFlag = lodash.get(documentItem, 'voidFlag', 0);
  const unVoidBlock = tenant.isJP() ? !!voidFlag : false;
  const title = (() => {
    const docName = lodash
      .chain(dropdownConfigure)
      .find(
        (item) =>
          item.docTypeCode === documentItem.docTypeCode &&
          item.externalDocTypeCode === documentItem.externalDocTypeCode
      )
      .get('docName')
      .value();
    const docCode = tenant.isJP() ? documentItem?.docTypeCode : documentItem?.externalDocTypeCode;
    return docCode && docName ? `${docCode}-${docName}` : docCode || docName;
  })();

  const format = (() => {
    return tenant.region({
      [Region.JP]: 'YYYY/MM/DD [at] hh:mm A',
      notMatch: 'DD/MM/YYYY [at] hh:mm A',
    });
  })();
  return (
    <div className={styles.fBtn}>
      {!unVoidBlock && (
        <Checkbox
          checked={selectedDocs?.[docId]}
          onChange={() => {
            handleDocClick(imageUploadStatus, docId, id, true);
          }}
          className={styles.checkbox}
        />
      )}
      <Tooltip
        title={formatMessageApi({ Label_COM_Message: 'MSG_000617' })}
        overlayClassName={styles.error}
      >
        {lodash.toLower(imageUploadStatus) === 'fail' && (
          <Icon type="close-circle" className={styles.errorIcon} />
        )}
      </Tooltip>
      <div className={styles.sBtn}>
        {lodash.toLower(imageUploadStatus) === 'fail' ? (
          <Icon
            onClick={handleRetry}
            className={classNames(styles.reload, styles.btn)}
            component={Retry}
          />
        ) : (
          <>
            {editAuth && !voidFlag && (
              <Icon
                className={classNames(styles.btn, styles.edit)}
                component={Edit}
                onClick={setEditVisit}
              />
            )}
            {voidAuth && !voidFlag && (
              <DeleteButton
                icon={Delete}
                className={styles.btn}
                handleDelete={() => setVoid({})}
                modalSettings={{
                  content: formatMessageApi({ Label_COM_Message: 'MSG_001272' }),
                  customSuccessMsgs: formatMessageApi({ Label_COM_Message: 'MSG_001271' }),
                  customTitleIcon: ConfirmationIcon,
                }}
              />
            )}
            {voidAuth && !!voidFlag && !unVoidBlock && (
              <Icon
                className={classNames(styles.btn, styles.UnVoid)}
                component={UnVoid}
                onClick={() => setVoid({ unVoid: true })}
              />
            )}
          </>
        )}
      </div>
      <DocLayout
        onClick={() => !unVoidBlock && handleDocClick(imageUploadStatus, docId, id)}
        selected={!!selectedDocs[docId || '']}
        className={!!voidFlag ? styles.submitVoid : ''}
        documentItem={documentItem}
        readData={readData}
        isAssinee={isAssinee}
      >
        <DocLayout.DocTitle>
          <div className={styles.title}>
            {title}
            {documentItem.voidFlag === 1 && (
              <i>
                {`(${formatMessageApi({
                  Label_BPM_Button: 'Voided',
                })})`}
              </i>
            )}
          </div>
        </DocLayout.DocTitle>

        <div className={styles.docContent}>
          <div>
            {documentItem?.customerName &&
              `${formatMessageApi({
                Dropdown_CLM_CustomerRole: documentItem?.customerType,
              })} - ${documentItem.customerName}`}
          </div>
          <FieldsRender.DocField
            fields={fieldsConfig}
            documentItem={documentItem}
            imageUploadStatus={imageUploadStatus}
          />
          {!!receivedDateConfig && documentItem?.receivedDate && (
            <div className={styles.receivedDate}>
              {formatMessageApi({ Label_COM_Opus: 'uploadedOn' }) +
                ' ' +
                moment(documentItem?.receivedDate).format(format)}
            </div>
          )}
        </div>
      </DocLayout>
    </div>
  );
};

export default DocumentItem;
