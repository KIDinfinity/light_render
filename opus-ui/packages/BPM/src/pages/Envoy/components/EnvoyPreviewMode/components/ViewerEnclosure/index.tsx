import React, { useState, useCallback, useMemo } from 'react';
import RcViewer from '@hanyk/rc-viewer';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { EnovyEnclosureType, EnovyEnclosureImgTypes } from 'bpm/pages/Envoy/enum';
import styles from './ViewerEnclosure.less';
import { LoadingBox } from '../index';
import { downloadDocStreamUrl } from './config';

const fileTypeMap = {
  [EnovyEnclosureImgTypes.PNG]: 'data:image/png;base64,',
  [EnovyEnclosureImgTypes.JPG]: 'data:image/jpeg;base64,',
  [EnovyEnclosureImgTypes.GIF]: 'data:image/gif;base64,',
  [EnovyEnclosureImgTypes.SVG]: 'data:image/svg+xml;base64,',
  [EnovyEnclosureImgTypes.ICO]: 'data:image/x-icon;base64,',
  [EnovyEnclosureImgTypes.BMP]: 'data:image/bmp;base64,',
  [EnovyEnclosureType.PDF]: 'data:application/pdf;base64,',
};

export default function ViewerEnclosure() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const previewEnclosure = useSelector(
    ({ envoyController }: any) => envoyController.previewEnclosure,
    shallowEqual
  );
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );
  const previewSelectEnclosureIndex = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureIndex,
    shallowEqual
  );

  const selectEnclosure = previewEnclosure?.[previewSelectLetter]?.[previewSelectEnclosureIndex];

  const currentType = useMemo(() => {
    return lodash
      .chain(selectEnclosure?.fileFullName)
      .split('.')
      .get(selectEnclosure?.fileFullName?.split('.').lastIndex)
      .toUpper()
      .value();
  }, [selectEnclosure]);

  const closeScreen = useCallback(() => {
    dispatch({
      type: 'envoyController/saveSelectEnclosureIndex',
      payload: {
        index: -1,
      },
    });
    setLoading(true);
  }, []);

  const url = `${downloadDocStreamUrl}?fileCacheId=${
    selectEnclosure?.fileCacheId
  }&fileFullName=${encodeURIComponent(selectEnclosure?.fileFullName)}&mimeType=application/pdf`;

  return (
    <>
      {selectEnclosure && (
        <div className={styles.fullScreenBox}>
          <div className={styles.close} onClick={closeScreen}>
            X
          </div>
          <LoadingBox type="inline" loading={currentType === EnovyEnclosureType.PDF && loading}>
            <div className={styles.content}>
              {currentType === EnovyEnclosureType.PDF && (
                <iframe
                  title={selectEnclosure.fileFullName}
                  id="viewerIframe01"
                  src={url}
                  onLoad={(e) => {
                    if (
                      e.target.contentDocument?.activeElement?.innerText?.includes(
                        '"success":false'
                      )
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
          </LoadingBox>
        </div>
      )}
    </>
  );
}
