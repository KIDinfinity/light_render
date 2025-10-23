import React from 'react';
import { useSelector } from 'dva';
import { Col, Row } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import DocumentItem from './DocumentItem';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './index.less';

const Main = () => {
  const uploadFiles =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace?.businessData?.claimProcessData?.[0]?.uploadFiles
    ) || [];
  const submited = useSelector((state: any) => state.formCommonController.submited);

  return (
    <>
      {lodash.size(uploadFiles) ? (
        <div className={styles.document}>
          <Row>
            <Col span={23}>
              <Row>
                <Col span={6}>
                  <div className={styles.title}>
                    {formatMessageApi({ Label_BIZ_Claim: 'Document' })}
                  </div>
                </Col>
                <Col span={9}>
                  <div className={styles.title}>
                    {formatMessageApi({ Label_COM_Opus: 'DocumentFormName' })}
                  </div>
                </Col>
                <Col span={9}>
                  <div className={styles.ReceiveDateTimeTitle}>
                    {formatMessageApi({ Label_COM_Opus: 'ReceiveDateTime' })}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {lodash.map(uploadFiles, (item) => {
            return <DocumentItem item={item} key={item.id} id={item?.id} />;
          })}
        </div>
      ) : (
        <></>
      )}

      <div className={styles.fileAmount}>
        {formatMessageApi({ Label_COM_Document: 'FileAmount' })}:
        {submited && lodash.isEmpty(uploadFiles) && (
          <ErrorTooltipManual
            // @ts-ignore
            manualErrorMessage={formatMessageApi({
              Label_COM_Message: 'MSG_000428',
            })}
          />
        )}
        <span className={styles.fileCount}>{lodash.size(uploadFiles)}</span>
      </div>
    </>
  );
};

export default Main;
