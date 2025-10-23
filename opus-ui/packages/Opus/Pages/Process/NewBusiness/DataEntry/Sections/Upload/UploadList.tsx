import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { Icon, Col, Row } from 'antd';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as Filed } from 'packages/Opus/Modules/Document/_static/icon-Filed.svg';
import { ReactComponent as Del } from 'packages/Opus/Assets/icon-delete.svg';

const UploadList = (props: any) => {
  const uploadDocList =
    useSelector(({ dataEntry }: any) => dataEntry.processData.uploadDocuments?.uploadDocList) || [];
  const dispatch = useDispatch();
  const handClick = () => {
    dispatch({
      type: `${NAMESPACE}/saveUploadModal`,
      payload: {
        openModal: true,
      },
    });
  };

  const removeUploadFile = (uploadFile: any) => {
    dispatch({
      type: `${NAMESPACE}/removeUploadDocList`,
      payload: { fileId: uploadFile.fileId },
    });
  };

  return (
    <div>
      {uploadDocList?.length > 0 && (
        <div className={styles.documentlist}>
          <div className={styles.uploadContainer}>
            <div className={styles.uploadButton}>
              <Button className={'ant-btn-cancel-button'} type="primary" onClick={handClick}>
                {formatMessageApi({ Label_COM_Opus: 'UploadDocuments' })}
              </Button>
            </div>
            <Row justify="space-between" gutter={[50, 16]}>
              <Col span={6}>
                <span className={styles.title}>
                  {formatMessageApi({ Label_COM_Document: 'document' })}
                </span>
              </Col>
              <Col span={12}>
                <span className={styles.title}>
                  {formatMessageApi({ Label_COM_Opus: 'DocumentFormName' })}
                </span>
              </Col>
            </Row>
            {uploadDocList.map((uploadFile: any, index: number) => {
              return (
                <Row
                  key={uploadFile.fileId}
                  justify="space-between"
                  gutter={[50, 16]}
                  className={styles.fieldWarp}
                >
                  <Col span={6}>
                    <div className={styles.document}>
                      <Icon component={Filed} />
                      {uploadFile.name}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.documentTypeName}>
                      <div className={styles.document}>{uploadFile.docTypeCode}</div>
                      <div
                        className={styles.documentIcon}
                        onClick={() => {
                          removeUploadFile(uploadFile);
                        }}
                      >
                        <Icon component={Del} />
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </div>
          <div className={styles.amount}>
            {formatMessageApi({ Label_COM_Document: 'FileAmount' })}: {uploadDocList?.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadList;
