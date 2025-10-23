import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import styles from './styles.less';
import { Spin } from 'antd';

function FullScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const url = useSelector(({ documentManagement }: any) => documentManagement.url);
  const showFullScreen = useSelector(
    ({ documentManagement }: any) => documentManagement.showFullScreen
  );
  const fileObject = useSelector(({ documentManagement }: any) => documentManagement.fileObject);

  const closeScreen = () => {
    dispatch({
      type: 'documentManagement/changeFullScreen',
      payload: {
        showFullScreen: false,
        url: '',
      },
    });
    setLoading(true);
  };

  return (
    <>
      {showFullScreen && (
        <div className={styles.fullScreenBox}>
          <div className={styles.close} onClick={closeScreen}>
            X
          </div>
          <div className={styles.loading} style={{ zIndex: loading ? 1 : -1 }}>
            <Spin size="large" />
          </div>
          <iframe
            title={fileObject?.name}
            id="viewerIframe01"
            className={styles.viewerIframe}
            src={url}
            onLoad={(e) => {
              if (e.target.contentDocument?.activeElement?.innerText?.includes('"success":false')) {
                e.target.contentDocument.activeElement.innerText = '';
              }
              setLoading(false);
            }}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      )}
    </>
  );
}
export default React.memo(FullScreen);
