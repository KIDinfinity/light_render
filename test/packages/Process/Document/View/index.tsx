import React, { useRef } from 'react';
import _ from 'lodash';
import RcViewer from '@hanyk/rc-viewer';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FileType } from '../enums';
import { downloadDocStreamUrl } from './config';
import { useGetShowDocumenData } from '../Hooks';
import styles from './styles.less';

const DocumentView = () => {
  const data = useGetShowDocumenData();
  const { imageId, mimeType, name } = data || {};
  console.log('data', data);

  const iframeRef = useRef();

  const options = {};

  const url = `${downloadDocStreamUrl}?imageId=${imageId}&name=${encodeURIComponent(
    name
  )}&mimeType=${mimeType}`;
  return (
    <div
      className={styles.viewerWrap}
      ref={(ref) => {
        // @ts-ignore
        iframeRef.current = ref;
      }}
    >
      {_.includes(mimeType, FileType.Image) && !_.includes(mimeType, 'image/tiff') && (
        <RcViewer options={options} className={styles.viewerIframe}>
          <img src={url} alt="" />
        </RcViewer>
      )}
      {(_.includes(mimeType, FileType.Pdf) || _.includes(mimeType, 'image/tiff')) && (
        <iframe
          title={name}
          id="viewerIframe01"
          className={styles.viewerIframe}
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      )}
      {imageId && !_.includes(mimeType, FileType.Image) && !_.includes(mimeType, FileType.Pdf) && (
        <div className={styles.otherWrap}>
          {formatMessageApi({ Label_COM_Document: 'NotSupportDisplayFile' })}
        </div>
      )}
    </div>
  );
};

export default DocumentView;
