import React, { useState, useMemo } from 'react';
import RcViewer from '@hanyk/rc-viewer';
import lodash from 'lodash';
import { EnovyEnclosureType, EnovyEnclosureImgTypes } from 'bpm/pages/Envoy/enum';
import styles from './ViewerEnclosure.less';
// import { LoadingBox } from '../index';
import { downloadDocStreamUrl } from './config';

export default function ViewerEnclosure({ fileCacheId, fileFullName }: any) {
  const [loading, setLoading] = useState(true);

  const currentType = useMemo(() => {
    return lodash
      .chain(fileFullName)
      .split('.')
      .get(fileFullName?.split('.').lastIndex)
      .toUpper()
      .value();
  }, [fileFullName]);

  const url = `${downloadDocStreamUrl}?fileCacheId=${fileCacheId}&fileFullName=${encodeURIComponent(
    fileFullName
  )}&mimeType=application/pdf`;

  return (
    <>
      {fileCacheId && (
        <div className={styles.fullScreenBox}>
          {/* <LoadingBox type="inline" loading={currentType === EnovyEnclosureType.PDF && loading}> */}
          <div className={styles.content}>
            {currentType === EnovyEnclosureType.PDF && (
              <iframe
                title={fileFullName}
                id="viewerIframe01"
                src={url}
                onLoad={(e) => {
                  if (
                    e.target.contentDocument?.activeElement?.innerText?.includes('"success":false')
                  ) {
                    e.target.contentDocument.activeElement.innerText = '';
                  }
                  setLoading(false);
                }}
                width="100%"
                height="100%"
                frameBorder="0"
              />
            )}
            {Object.values(EnovyEnclosureImgTypes).includes(currentType) && (
              <RcViewer options={{ inline: true }}>
                <img src={url} alt="" style={{ display: 'none' }} />
              </RcViewer>
            )}
          </div>
          {/* </LoadingBox> */}
        </div>
      )}
    </>
  );
}
