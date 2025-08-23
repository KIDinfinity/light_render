import React, { useRef, useEffect, useState } from 'react';
import FormSection from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch } from 'dva';
import { map, isEmpty, debounce } from 'lodash';
import Empty from '@/components/Empty';
import { Provider } from '@/components/_store';
import type { UploadFileModel } from 'documentManage/pages/_dto/model';
import File from 'documentManage/pages/ToolsGroup/Upload/File';
import Dragger from './Dragger';
import DragAlert from 'documentManage/pages/_components/DragAlert';
import { EToolModules } from 'documentManage/pages/_dto/enums';
import classnames from 'classnames';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './index.less';

export default () => {
  const [dragging, setDragging] = useState(false);
  const documentRef = useRef();
  const uploadFiles = useSelector(({ documentManagement }: any) => documentManagement.uploadFiles);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const submited = useSelector((state: any) => state.formCommonController.submited);
  const dispatch = useDispatch();

  const hangleDrager = (event: any) => {
    event.preventDefault();
    if (taskNotEditable) return;
    const { type } = event;
    if (type === 'drop') {
      setDragging(false);
    }
  };

  const handleDraggerExit = (event: any) => {
    event.preventDefault();
    event.persist();
    debounce(() => {
      if (!taskNotEditable && dragging) {
        setDragging(false);
      }
    }, 100)();
  };

  const handleDraggerEnter = (event: any) => {
    event.preventDefault();
    event.persist();
    debounce(() => {
      if (!taskNotEditable && !dragging) {
        setDragging(true);
      }
    }, 100)();
  };

  useEffect(() => {
    document.addEventListener('drop', hangleDrager, false);
    return () => {
      document.removeEventListener('drop', hangleDrager, false);
    };
  }, []);

  const removeUploadFile = (file) => {
    dispatch({
      type: 'documentManagement/removeUploadedFile',
      payload: {
        uploadFiles: [file],
      },
    });
  };

  return (
    <div
      className={classnames(styles.upload, dragging && !taskNotEditable && styles.draggerActived)}
      onDragEnter={handleDraggerEnter}
    >
      {!taskNotEditable && (
        <>
          {dragging && (
            <div className={styles.alert}>
              <DragAlert editActived={false} />
            </div>
          )}
          <div
            className={styles.fileDraggerWrap}
            style={{ zIndex: dragging ? 1 : 0 }}
            onDragLeave={handleDraggerExit}
          >
            <Dragger
              className={styles.fileDragger}
              setDragging={setDragging}
              tooldata={{
                toolId: EToolModules.upload,
              }}
            />
          </div>
        </>
      )}

      <FormSection
        title={
          <>
            {formatMessageApi({
              Label_COM_Document: 'UploadFile',
            })}
            {submited && isEmpty(uploadFiles) && (
              <ErrorTooltipManual
                // @ts-ignore
                manualErrorMessage={formatMessageApi({
                  Label_COM_Message: 'MSG_000428',
                })}
              />
            )}
          </>
        }
        isMargin={false}
      >
        <div className={styles.info}>
          {formatMessageApi({ Label_COM_Document: 'FileAmount' })}:
          <span className={styles.count}>{uploadFiles?.length || 0}</span>
        </div>
        <Provider data={{ documentRef }}>
          <div
            className={styles.files}
            ref={(ref: any) => {
              documentRef.current = ref;
            }}
          >
            <div className={styles.document} style={{ zIndex: dragging ? 99 : 1 }}>
              {map(uploadFiles, (uploadFile: UploadFileModel, index: number) => (
                <div className={styles.uploadFile} key={`${uploadFile.fileId}-${index}`}>
                  <File
                    uploadFile={uploadFile}
                    key={`${uploadFile.fileId}-${index}`}
                    classname={styles.uploadFile}
                    disabled={taskNotEditable}
                    isScanning={true}
                    removeUploadFile={removeUploadFile}
                  />
                </div>
              ))}
              {isEmpty(uploadFiles) && <Empty />}
            </div>
          </div>
        </Provider>
      </FormSection>
    </div>
  );
};
