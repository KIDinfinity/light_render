import React, { useRef, useEffect, useState, useContext } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch } from 'dva';
import { map, isEmpty, debounce } from 'lodash';
import Empty from '@/components/Empty';
import { Provider } from '@/components/_store';
import type { UploadFileModel } from 'documentManage/pages/_dto/model';
import File from './File';
import Dragger from './Dragger';
import DragAlert from 'documentManage/pages/_components/DragAlert';
import { EToolModules } from 'documentManage/pages/_dto/enums';
import classnames from 'classnames';
import styles from './index.less';
import { Icon, Button } from 'antd';
import get from 'lodash/get';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import context from 'bpm/pages/OWBEntrance/Context/context';

export default ({ sectionIndex }) => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(sectionIndex > 0);
  const [dragging, setDragging] = useState(false);
  const documentRef = useRef();
  const fileRef = useRef();
  const claimProcessData = useSelector(
    ({ batchDocumentScanningController }: any) => batchDocumentScanningController.claimProcessData
  );
  const uploadFiles = get(claimProcessData[sectionIndex], 'uploadFiles', []);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const submited = useSelector((state: any) => state.formCommonController.submited);

  const claimData = claimProcessData[sectionIndex];
  const sectionEditable =
    claimData.successFlag === 0 || (!taskNotEditable && claimData.successFlag !== 1);
  const { dispatch: contextDispatch } = useContext(context);

  const hangleDrager = (event: any) => {
    event.preventDefault();
    if (!sectionEditable) return;
    const { type } = event;
    if (type === 'drop') {
      setDragging(false);
    }
  };

  const handleDraggerExit = (event: any) => {
    event.preventDefault();
    event.persist();
    debounce(() => {
      if (sectionEditable && dragging) {
        setDragging(false);
      }
    }, 100)();
  };

  const handleDraggerEnter = (event: any) => {
    event.preventDefault();
    event.persist();
    debounce(() => {
      if (sectionEditable && !dragging) {
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

  const handleCollapseClick = () => {
    setCollapse(!collapse);
  };

  const onUploadClick = () => {
    if (fileRef?.current) {
      fileRef.current.click();
    }
  };

  const handleFileUpload = (files) => {
    dispatch({
      type: 'batchDocumentScanningController/saveDocData',
      payload: { sectionIndex, files, contextDispatch },
    });
    if (collapse) {
      setCollapse(false);
    }
  };

  const onFileChange = () => {
    handleFileUpload(fileRef?.current?.files);
    if (fileRef.current) {
      fileRef.current.value = null;
    }
  };

  const removeUploadFile = (file) => {
    dispatch({
      type: 'batchDocumentScanningController/removeUploadFile',
      payload: { sectionIndex, id: file.id },
    });
  };

  return (
    <div
      className={classnames(styles.upload, dragging && sectionEditable && styles.draggerActived)}
      onDragEnter={handleDraggerEnter}
    >
      {sectionEditable && (
        <>
          {dragging && (
            <div className={styles.alert}>
              <DragAlert
                editActived={false}
                className={uploadFiles.length === 0 && styles.dragAlert}
              />
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
              handleBeforeUpload={handleFileUpload}
            />
          </div>
        </>
      )}
      <div className={styles.info}>
        {formatMessageApi({ Label_COM_Document: 'FileAmount' })}:
        {submited && isEmpty(uploadFiles) && (
          <ErrorTooltipManual
            // @ts-ignore
            manualErrorMessage={formatMessageApi({
              Label_COM_Message: 'MSG_000428',
            })}
          />
        )}
        <span className={styles.count}>{uploadFiles?.length || 0}</span>
        {!!uploadFiles?.length && (
          <Button className={styles.expendButton} onClick={handleCollapseClick}>
            <Icon type={collapse ? 'down' : 'up'} />
          </Button>
        )}
        {sectionEditable && (
          <Button className={styles.uploadButton} onClick={onUploadClick}>
            {formatMessageApi({ Label_BPM_Button: 'upload' })}
            <input type="file" onChange={onFileChange} ref={fileRef} multiple="multiple" />
          </Button>
        )}
      </div>
      <Provider data={{ documentRef }}>
        <div
          className={classnames({
            [styles.files]: true,
            [styles.collapse]: !uploadFiles?.length || collapse,
          })}
          ref={(ref: any) => {
            documentRef.current = ref;
          }}
        >
          <div className={styles.document} style={{ zIndex: dragging ? 0 : 1 }}>
            {map(uploadFiles, (uploadFile: UploadFileModel) => (
              <div className={styles.uploadFile} key={`${sectionIndex}_${uploadFile.id}`}>
                <File
                  uploadFile={uploadFile}
                  key={`${uploadFile.id}`}
                  classname={styles.uploadFile}
                  disabled={!sectionEditable}
                  removeUploadFile={removeUploadFile}
                  progressing={!uploadFile.fileId}
                  sectionIndex={sectionIndex}
                />
              </div>
            ))}
            {isEmpty(uploadFiles) && <Empty />}
          </div>
        </div>
      </Provider>
    </div>
  );
};
