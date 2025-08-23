import type { FunctionComponent} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import _ from 'lodash';
// @ts-ignore
import RcViewer from '@hanyk/rc-viewer';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Spin } from 'antd';
import type { CaseInfoModel } from '../_dto/model';
import { FileType } from '../_dto/enums';
import { downloadDocStreamUrl } from './config';
import styles from './styles.less';
import { safeParseUtil } from '@/utils/utils';
import { Icon } from 'antd';

import Acknowledge from '../_components/Acknowledge';

interface IDocumentViewer {
  caseInfo?: CaseInfoModel;
  imageId?: string;
  name?: string;
  mimeType?: string;
}

const DocumentViewer: FunctionComponent<IDocumentViewer> = ({ imageId, name, mimeType }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const documentList = useSelector(
    ({ documentManagement }: any) => documentManagement.documentList,
    shallowEqual
  );
  const businessNoDocumentList = useSelector(
    ({ documentManagement }: any) => documentManagement.businessNoDocumentList,
    shallowEqual
  );
  const showType = useSelector(
    ({ documentManagement }: any) => documentManagement.showType,
    shallowEqual
  );
  const selectedId = useSelector(
    ({ documentManagement }: any) => documentManagement.selectedId,
    shallowEqual
  );
  const fileObject = useSelector(
    ({ documentManagement }: any) => documentManagement.fileObject,
    shallowEqual
  ) || { imageId, name, mimeType };

  const currentDocumentItem = (showType === 'caseNo' ? documentList : businessNoDocumentList).find(
    (item) => item?.id === selectedId
  );

  const iframeRef = useRef();
  const imgRef = useRef();
  // 用来存储当前组件的旋转状态
  const currentItemDocLayoutRef = useRef();
  // 更新documentList时，页面数据拿到最新的，但是options里面拿到的还是旧值，所以用ref取最新值在options中使用
  // 有空可以看一下为什么更新后组件取值不会取最新
  const currentItemDocLayoutFromReduxRef = useRef();
  currentItemDocLayoutFromReduxRef.current = currentDocumentItem;
  const url = `${downloadDocStreamUrl}?imageId=${fileObject?.imageId}&name=${encodeURIComponent(
    fileObject?.name
  )}&mimeType=${fileObject?.mimeType}`;

  const imgHandle = (payload) => {
    const newData = { ...(currentItemDocLayoutRef?.current || {}), ...payload };
    currentItemDocLayoutRef.current = newData;
  };

  const saveImgHandle = () => {
    if (
      JSON.stringify(currentItemDocLayoutRef?.current) !==
      currentItemDocLayoutFromReduxRef.current?.docLayout
    ) {
      dispatch({
        type: 'documentManagement/updateDocLayout',
        payload: {
          docLayout: JSON.stringify(currentItemDocLayoutRef?.current),
        },
      });
    }

    if (document.querySelector('.viewer-move')?.style?.setProperty) {
      document.querySelector('.viewer-move').style.setProperty('transition', 'none', 'important');
    }
  };

  const options = {
    transition: false,
    viewed: function () {
      const { viewer } = imgRef.current;
      if (!_.isEmpty(currentItemDocLayoutFromReduxRef.current?.docLayout)) {
        const todos = safeParseUtil(currentItemDocLayoutFromReduxRef.current?.docLayout) || {};
        currentItemDocLayoutRef.current = safeParseUtil(todos);

        for (const key in todos) {
          viewer?.[key](todos?.[key]);
        }
      }
      setTimeout(() => {
        if (document.querySelector('.viewer-move')?.style?.setProperty) {
          document
            .querySelector('.viewer-move')
            .style.setProperty('transition', 'all .3s', 'important');
        }
      }, 300);
    },
    hidden: saveImgHandle,
    rotated: function (change) {
      imgHandle({ rotateTo: change.detail.degree % 360 });
    },
    scaled: function (change) {
      imgHandle({ scaleX: change.detail.scaleX, scaleY: change.detail.scaleY });
    },
  };

  useEffect(() => {
    setLoading(true);
  }, [fileObject?.imageId]);

  const openFullScreen = () => {
    dispatch({
      type: 'documentManagement/changeFullScreen',
      payload: {
        showFullScreen: true,
        url,
      },
    });
  };

  const imgStyle = () => {
    const style = {};
    if (!_.isEmpty(safeParseUtil(currentDocumentItem?.docLayout))) {
      style.transform =
        Object.entries(safeParseUtil(currentDocumentItem?.docLayout) || {}).reduce((r, c) => {
          if (c[0] === 'rotateTo') {
            r += `rotate(${c[1]}deg) `;
            return r;
          }
          r += `${c[0]}(${c[1]}) `;
          return r;
        }, '') || 'none';
      style.height = '100%';
      style.objectFit = 'contain';
    }
    return style;
  };

  return (
    <div
      className={styles.viewerWrap}
      ref={(ref) => {
        // @ts-ignore
        iframeRef.current = ref;
      }}
    >
      {(_.includes(fileObject?.mimeType, FileType.Pdf) ||
        _.includes(fileObject?.mimeType, 'image/tiff')) &&
        !loading && (
          <div className={styles.fullscreen} onClick={openFullScreen}>
            <Icon type="fullscreen" />
          </div>
        )}
      {_.includes(fileObject?.mimeType, FileType.Image) &&
        !_.includes(fileObject?.mimeType, 'image/tiff') && (
          <Acknowledge>
            <RcViewer options={options} className={styles.viewerIframe} ref={imgRef}>
              <img src={url} alt="" style={imgStyle()} />
            </RcViewer>
          </Acknowledge>
        )}
      {(_.includes(fileObject?.mimeType, FileType.Pdf) ||
        _.includes(fileObject?.mimeType, 'image/tiff')) && (
        <>
          {loading && !!fileObject?.imageId && <Spin className={styles.loading} />}
          <Acknowledge type="pdf">
            <iframe
              title={fileObject?.name}
              id="viewerIframe01"
              className={styles.viewerIframe}
              src={url}
              onLoad={(e) => {
                if (
                  e.target.contentDocument?.activeElement?.innerText?.includes('"success":false')
                ) {
                  e.target.contentDocument.activeElement.innerText = '';
                }
                setTimeout(() => {
                  setLoading(false);
                }, 100);
              }}
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </Acknowledge>
        </>
      )}
      {fileObject?.imageId &&
        !_.includes(fileObject?.mimeType, FileType.Image) &&
        !_.includes(fileObject?.mimeType, FileType.Pdf) && (
          <Acknowledge>
            <div className={styles.otherWrap}>
              {formatMessageApi({ Label_COM_Document: 'NotSupportDisplayFile' })}
            </div>
          </Acknowledge>
        )}
    </div>
  );
};

export default DocumentViewer;
