import type { FunctionComponent} from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { Input, Icon, Button } from 'antd';
import DataLayout from '@/components/DataLayout';
import { Provider } from '@/components/_store';
import { LS, LSKey } from '@/utils/cache';
import { EToolModules } from './_dto/enums';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import Title from './_components/Title';
import DragAlert from './_components/DragAlert';
import Document from './Document';
import ToolsGroup from './ToolsGroup';
import CaseInfo from './CaseInfo';
import DocumentViewer from './Viewer';
import FullScreen from './Viewer/FullScreen';
import DataProvider from 'basic/components/DataProvider';
import styles from './styles.less';
import { DocumentLevelEnum, TypeEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import { useReadDocPrepareData } from '@/components/SolutionRead/Hooks';
import CaseContainer from 'basic/components/CaseContainer';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getAuth } from '@/auth/Utils';
import { useParams } from 'umi';

interface IProps {
  userId?: string;
  match?: any;
}

const { DataWrap } = DataLayout;

const DocumentManage: FunctionComponent<IProps> = ({ match }) => {
  const [retrieve, setRetrieve] = useState(false);

  const {
    params: { processInstanceId },
  } = match;

  const {
    toolsData = {},
    dragging,
    documentNum,
    businessNoDocumentNum,
    documentList,
    showType,
    caseInfo,
  } = useSelector(({ documentManagement, solutionRead }: any) => ({
    toolsData: documentManagement.toolsData,
    caseInfo: documentManagement?.caseInfo,
    dragging: documentManagement.dragging,
    documentNum: documentManagement?.documentNum || 0,
    businessNoDocumentNum: documentManagement?.businessNoDocumentNum || 0,
    documentList: documentManagement.documentList,
    showType: documentManagement.showType,
    taskData: solutionRead?.taskData || {},
  }));
  const dispatch = useDispatch();

  useReadDocPrepareData({ taskId: caseInfo?.currentTaskId });
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const caseDetail = useGetCaseDetail();
  const { inquiryBusinessNo } = caseInfo || {};
  const hangleDrager = (event: any) => {
    event.preventDefault(); // 禁止浏览器默认行为
    const { type } = event;
    // 用户取消拖拽或在可允许的范围之外拖入文件则重置拖拽状态
    if (type === 'drop') {
      dispatch({
        type: 'documentManagement/updateDragStatus',
        payload: {
          dragging: false,
        },
      });
    }
    return false; // 禁止在可允许的范围内拖入文件
  };
  const onReadDoc = (event: any) => {
    if (event.key === LSKey.WINDOW_COMMUNICATION_READ_DOC && event.newValue) {
      dispatch({
        type: 'solutionRead/getReaderData',
        payload: {
          subjectType: ESubjectType.DOC,
        },
      });
      dispatch({
        type: 'documentManagement/saveReadItem',
        payload: {
          readItem: {
            docId: '',
            unRead: false,
            mustRead: false,
            name: '',
          },
        },
      });
      LS.removeItem(LSKey.WINDOW_COMMUNICATION_READ_DOC);
    }
  };
  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .value();
  const menulist = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Menu)
    .map((item) => item.authorityCode)
    .value();

  useEffect(() => {
    if (!lodash.isEmpty(caseDetail)) {
      // 初始化左侧工具状态
      dispatch({
        type: 'documentManagement/saveButtonAuth',
        payload: {
          commonAuthorityList,
        },
      });

      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowMenu: false,
        },
      });

      dispatch({
        type: 'documentManagement/getCaseDetails',
        payload: {
          processInstanceId,
        },
      });

      dispatch({
        type: 'documentManagement/getDropdownConfigure',
      });

      // 获取各个子模块fields的配置信息
      dispatch({
        type: 'documentManagement/getFieldConfigure',
      });

      // 获取doc id config
      dispatch({
        type: 'documentManagement/getDocId',
      });

      dispatch({
        type: `DocumentOfOcrResultsController/getOcrResultDetail`,
        payload: {
          caseNo: processInstanceId,
        },
      });

      dispatch({
        type: 'documentManagement/getLatestOcrException',
        payload: {
          caseNo: processInstanceId,
        },
      });
    }

    document.addEventListener('drop', hangleDrager, false);
    document.addEventListener('dragover', hangleDrager, false);

    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowMenu: true,
        },
      });

      dispatch({
        type: 'documentManagement/initDocument',
      });
      document.removeEventListener('drop', hangleDrager, false);
      document.removeEventListener('dragover', hangleDrager, false);
    };
  }, [caseDetail]);

  useEffect(() => {
    window.addEventListener('storage', onReadDoc);
    return () => {
      window.removeEventListener('storage', onReadDoc);
    };
  }, []);

  const handleDraggerEnter = () => {
    dispatch({
      type: 'documentManagement/updateDragStatus',
      payload: {
        dragging: true,
      },
    });
  };

  const handleDraggerExit = () => {
    dispatch({
      type: 'documentManagement/updateDragStatus',
      payload: {
        dragging: false,
      },
    });
  };

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    dispatch({
      type: 'documentManagement/saveSearchValue',
      payload: {
        searchValue: value,
      },
    });
    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
  };
  const editActived = toolsData?.[EToolModules.edit]?.selected;

  const handleChangeType = (type: string) => {
    if (type === showType) return;
    dispatch({
      type: 'documentManagement/saveState',
      payload: {
        showType: type,
        fileObject: {},
        selectedDocId: '',
      },
    });

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
  };

  // 决定刷新button 点击状态
  const retrieveButton = () => {
    if (
      lodash.every(documentList, (item) =>
        lodash.includes(['success', ''], lodash.toLower(item?.imageUploadStatus))
      )
    ) {
      setRetrieve(false);
    } else {
      setRetrieve(true);
    }
  };

  // 点击处理documentList 状态
  const handleRetrieve = async () => {
    const response: any = await dispatch({
      type: 'documentManagement/syncDocView',
    });
    const { success } = lodash.pick(response, ['success']);
    if (!success) {
      handleWarnMessageModal(response?.promptMessages, {
        okFn: () => {
          handleRetrieve();
        },
        cancelFn: () => {},
      });
    }
    dispatch({
      type: 'documentManagement/getDocuments',
      payload: { caseNo: processInstanceId, inquiryBusinessNo },
    });
  };
  useEffect(() => {
    retrieveButton();
  }, [documentList]);

  const element = document.querySelector('.biger');

  if (element) {
    element.style.padding = '18px 1% 0';
  }
  const uploadAuth = getAuth(commonAuthorityList, {
    authorityCode: 'RS_BP_Button_DocMgm_Upload',
  });

  return (
    <>
      <div className={styles.documentManageOuter}>
        {dragging && uploadAuth && <DragAlert editActived={editActived} />}
        <div
          className={classNames(
            styles.documentManage,
            dragging && styles.draggerActived,
            'card0BgColor'
          )}
        >
          {uploadAuth && (
            <div
              className={styles.fileDraggerWrap}
              style={{ zIndex: dragging ? 100 : 0 }}
              onDragLeave={lodash.debounce(handleDraggerExit, 100)}
            >
              <ToolsGroup.Upload.Dragger
                className={styles.fileDragger}
                tooldata={{
                  ...(toolsData?.[EToolModules.upload] || {}),
                  toolId: EToolModules.upload,
                }}
              />
            </div>
          )}
          <div
            className={styles.documentManageWrap}
            style={{ zIndex: dragging && 99 }}
            onDragEnter={lodash.debounce(handleDraggerEnter, 100)}
          >
            <DataLayout className={styles.documentManageWrap}>
              <DataWrap className={classNames(styles.documentSider, 'card1BgColor')} span={7}>
                <div className={styles.documentTitle}>
                  <Title
                    className={styles.documentTitleInner}
                    text="document.label.document-management"
                    textType="capitalize"
                    barStyle={{ width: 4 }}
                  />
                </div>
                <div className={styles.documentManual}>
                  <div className={styles.toolsBar}>
                    <ToolsGroup />
                  </div>
                  <div className={styles.documents}>
                    <Authorized
                      authority={[DocumentLevelEnum.RS_BP_Button_DocManage_ReceiveDoc]}
                      currentAuthority={menulist}
                    >
                      <div className={styles.retrieveBtn}>
                        <Button disabled={retrieve} onClick={handleRetrieve}>
                          <Icon type="redo" rotate={180} />
                          {formatMessageApi({
                            Label_BPM_Button: 'RetrieveDocument',
                          })}
                        </Button>
                      </div>
                    </Authorized>

                    <Authorized
                      authority={[DocumentLevelEnum.RS_BP_ViewDocumentByBusinessNoButton]}
                      currentAuthority={list}
                    >
                      <div className={styles.switchButton}>
                        <Button
                          className={classNames({ [styles.highlight]: showType === 'caseNo' })}
                          onClick={handleChangeType.bind(null, 'caseNo')}
                        >
                          View by Case No. <span className={styles.defalut}>{documentNum}</span>
                        </Button>
                        <Button
                          className={classNames({
                            [styles.highlight]: showType === 'businessNo',
                          })}
                          onClick={handleChangeType.bind(null, 'businessNo')}
                        >
                          View by Business No.
                          <span className={styles.defalut}>{businessNoDocumentNum}</span>
                        </Button>
                      </div>
                    </Authorized>
                    <div className={styles.sreachWrap}>
                      <Input
                        onChange={handleChange}
                        placeholder="search ..."
                        prefix={<Icon type="search" />}
                      />
                    </div>
                    <Document />
                  </div>
                </div>
              </DataWrap>
              <DataWrap className={styles.documentContent} span={17}>
                <div className={styles.documentHeader}>
                  <CaseInfo />
                </div>
                <div className={styles.documentViewer}>
                  <DocumentViewer />
                </div>
              </DataWrap>
            </DataLayout>
          </div>
        </div>
      </div>
      <ToolsGroup.ReIndex authList={list} />
      <FullScreen />
    </>
  );
};

export default () => {
  const { userId, documentList, businessNoDocumentList, showType } = useSelector(
    ({ user, documentManagement }: any) => ({
      userId: lodash.get(user, 'currentUser.userId'),
      documentList: documentManagement.documentList,
      businessNoDocumentList: documentManagement.businessNoDocumentList,
      showType: documentManagement.showType,
    })
  );
  const params = useParams();

  return (
    <CaseContainer>
      <Provider data={{ userId }}>
        <DataProvider
          data={{ documentList: showType === 'caseNo' ? documentList : businessNoDocumentList }}
        >
          <DocumentManage match={{ params: params }} />
        </DataProvider>
      </Provider>
    </CaseContainer>
  );
};
