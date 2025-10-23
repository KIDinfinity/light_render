import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import classNames from 'classnames';
import { Input, Icon } from 'antd';
import { Provider } from '@/components/_store';
import Document from './Document';
import ToolsGroup from './ToolsGroup';
import DocumentViewer from './Viewer';
import FullScreen from './Viewer/FullScreen';
import Tab from './Tab';
import DataProvider from 'basic/components/DataProvider';
import styles from './styles.less';
import { TypeEnum } from '@/enum/GolbalAuthority';
import { useReadDocPrepareData } from '@/components/SolutionRead/Hooks';
import CaseContainer from 'basic/components/CaseContainer';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as FileTwoTone } from 'opus/Assets/icon-FileTwoTone.svg';

interface IProps {
  userId?: string;
  match?: any;
  caseDetail: any;
}

const DocumentManage: FunctionComponent<IProps> = ({ caseDetail }: any) => {
  const { dragging } = useSelector(
    ({ documentManagement, solutionRead }: any) => ({
      toolsData: documentManagement.toolsData,
      caseInfo: documentManagement?.caseInfo,
      dragging: documentManagement.dragging,
      documentNum: documentManagement?.documentNum || 0,
      businessNoDocumentNum: documentManagement?.businessNoDocumentNum || 0,
      documentList: documentManagement.documentList,
      showType: documentManagement.showType,
      taskData: solutionRead?.taskData || {},
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { caseNo: processInstanceId, currentTaskId: taskId, inquiryBusinessNo } = caseDetail;

  useReadDocPrepareData({ taskId });
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);

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
  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .value();

  useEffect(() => {
    if (processInstanceId) {
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
  }, [processInstanceId]);

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

  const element = document.querySelector('.biger');

  if (element) {
    element.style.padding = '18px 1% 0';
  }
  return (
    <>
      <div className={styles.documentManageOuter}>
        <div className={classNames(styles.documentManage, dragging && styles.draggerActived)}>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div className={styles.documentSider}>
              <div className={styles.documentManual}>
                <div className={styles.documents}>
                  <div className={styles.documentTitle}>
                    <Icon component={FileTwoTone} className={styles.FileTwoTone} />
                    <div className={styles.documentTitleInner}>
                      {formatMessageApi({
                        Label_BIZ_Claim: 'ViewDocuments',
                      })}
                    </div>
                  </div>
                  <div className={styles.sreachWrap}>
                    <Input
                      onChange={handleChange}
                      placeholder={formatMessageApi({
                        Label_COM_Opus: 'SearchDocument',
                      })}
                      prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                  </div>
                  <Tab />
                  <div style={{ marginTop: '40px' }} />
                  {/* <CaseInfo /> */}
                  <Document />
                </div>
              </div>
            </div>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <div className={styles.documentViewer}>
                <DocumentViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToolsGroup.ReIndex authList={list} />
      <FullScreen />
    </>
  );
};

export default ({ caseDetail }: any) => {
  const { userId, businessNoDocumentList } = useSelector(({ user, documentManagement }: any) => ({
    userId: lodash.get(user, 'currentUser.userId'),
    documentList: documentManagement.documentList,
    businessNoDocumentList: documentManagement.businessNoDocumentList,
    showType: documentManagement.showType,
  }));

  return (
    <CaseContainer>
      <Provider data={{ userId }}>
        <DataProvider data={{ documentList: businessNoDocumentList }}>
          <DocumentManage caseDetail={caseDetail} />
        </DataProvider>
      </Provider>
    </CaseContainer>
  );
};
