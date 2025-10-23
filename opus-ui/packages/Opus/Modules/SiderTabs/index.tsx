import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';

import { parse } from 'qs';

import { useDispatch, useSelector } from 'dva';

import { Tabs, Icon } from 'opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';

import { getClaimCaseNo } from '@/services/bpmBusinessProcessService';
import { LS, LSKey } from '@/utils/cache';

import CaseCategory from 'enum/CaseCategory';

import { ReactComponent as IconTick } from 'opus/Assets/icon-tick.svg';
import { ReactComponent as IconDocument } from 'opus/Assets/icon-document.svg';
import { ReactComponent as IconReload } from 'opus/Assets/icon-reload.svg';
import { ReactComponent as IconSend } from 'opus/Assets/icon-send.svg';
import { ReactComponent as c360Header } from './Assets/360header.svg';
import { ReactComponent as IconClose } from 'opus/Assets/icon-close.svg';
import { ReactComponent as IconFullscreen } from 'opus/Assets/icon-fullscreen.svg';
import { ReactComponent as IconComment } from 'opus/Assets/icon-commentOutlined.svg';
import { ReactComponent as IconDashboard } from 'opus/Assets/icon-dashboard.svg';

import Document from '../Document';
import Envoy from '../Envoy';
import C360 from '../360';
import InformationManagement, {
  namespace as informationManagementNameSpace,
} from '../InformationManagement';

import styles from './index.less';

const getTabList = ({ caseDetail }: any) => {
  const ShowConfigs = {
    [CaseCategory.BP_DC_CTG002]: ['informationManagement'],
    // [CaseCategory.JP_CLM_CTG005]: ['document', 'informationManagement'],
    [CaseCategory.JP_CLM_CTG006]: ['document', 'informationManagement'],
  } as Record<string, string[]>;

  const lists = [
    {
      type: 'document',
      typeCode: 'Label_BIZ_Claim',
      dictCode: 'document.label.document-management',
      icon: IconDocument,
      headerIcon: IconDocument,
      content: <Document caseDetail={caseDetail} />,
    },
    {
      type: '360',
      typeCode: 'Label_BIZ_Claim',
      dictCode: 'Customer 360',
      icon: IconReload,
      content: <C360 caseDetail={caseDetail} />,
      headerIcon: c360Header,
    },
    {
      type: 'envoy',
      typeCode: 'Label_BIZ_Claim',
      dictCode: 'Pending Request',
      icon: IconTick,
      content: <Envoy caseDetail={caseDetail} />,
    },
    {
      type: 'informationManagement',
      typeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.drawer.remark.title',
      icon: IconComment,
      content: <InformationManagement caseDetail={caseDetail} />,
      headerIcon: IconDashboard,
      cleanUp: `${informationManagementNameSpace}/clearState`,
    },
  ];

  return lodash
    .chain(lists)
    .filter(({ type }: any) => {
      const hasKey = lodash.includes(lodash.keys(ShowConfigs), caseDetail?.caseCategory);
      return (
        !hasKey || (!!hasKey && lodash.includes(ShowConfigs?.[caseDetail?.caseCategory], type))
      );
    })
    .value();
};

export default () => {
  const dispatch = useDispatch();

  const openSider = useSelector((state: any) => state.opusSider?.openSider);
  const activeKey = useSelector((state: any) => state.opusSider?.activeKey);

  const [expand, setExpand] = useState(false);
  // const [openSider, setOpenSider] = useState(false);
  // const [activeKey, setActiveKey] = useState('');
  const [caseDetail, setCaseDetail] = useState({});
  const [urlParams, setUrlParams] = useState({});

  const setOpenSider = (value: boolean) => {
    dispatch({
      type: 'opusSider/saveOpenSider',
      payload: {
        openSider: value,
      },
    });
  };

  const setActiveKey = (value: string) => {
    dispatch({
      type: 'opusSider/saveActiveKey',
      payload: {
        activeKey: value,
      },
    });
  };

  // 获取url参数信息
  useEffect(() => {
    const parasm = parse(window.location.href.split('?')[1]);

    const getLastPart = (str: string) => {
      const index = str.lastIndexOf('/');
      return str.substring(index + 1);
    };
    if (!lodash.isEmpty(parasm)) {
      setUrlParams({
        taskId: parasm.taskId,
        ...lodash.pick(parasm, ['businessNo', 'caseCategory']),
      });
    } else if (!!getLastPart(window.location.href)) {
      setUrlParams({ taskId: getLastPart(window.location.href) });
    }

    return () => {
      setUrlParams({});
    };
  }, []);

  // 存储侧边栏需要的模块数据
  const saveModalData = (datas: any) => {
    setCaseDetail({ ...datas, businessCode: LS.getItem(LSKey.CURRENTUSER)?.businessCode });

    // information
    dispatch({
      type: 'navigatorInformationController/saveProcessInstanceIdReducer',
      payload: {
        processInstanceId: datas.caseNo,
      },
    });
  };

  // 获取caseDetail数据
  useEffect(() => {
    const { taskId, businessNo }: any = urlParams || {};

    const t = async () => {
      if (taskId) {
        const response = await getTask(
          objectToFormData({
            taskId,
          })
        );
        if (response?.success) {
          const data = lodash.pick(response?.resultData, [
            'caseCategory',
            'taskDefKey',
            'businessNo',
            'inquiryBusinessNo',
            'taskId',
            'processInstanceId',
            'taskStatus',
            'assignee',
          ]);

          const datas = {
            ...data,
            activityCode: data?.taskDefKey,
            activityKey: data?.taskDefKey,
            caseNo: data?.processInstanceId,
          };

          saveModalData(datas);
        }
      }
      if (businessNo) {
        const caseResponse = await getClaimCaseNo(
          objectToFormData({
            claimNo: businessNo,
            caseCategory: urlParams?.caseCategory,
          })
        );

        if (
          lodash.isPlainObject(caseResponse) &&
          caseResponse.success &&
          lodash.isString(caseResponse.resultData) &&
          !lodash.isEmpty(caseResponse.resultData)
        ) {
          const caseDetailResponse = await findBizProcess({
            processInstanceId: caseResponse.resultData,
          });
          if (
            lodash.isPlainObject(caseDetailResponse) &&
            caseDetailResponse?.success &&
            lodash.isPlainObject(caseDetailResponse?.resultData)
          ) {
            saveModalData(caseDetailResponse?.resultData);
          }
        }
        return {};
      }
    };

    if (!lodash.isEmpty(urlParams)) {
      t();
    }
  }, [urlParams]);

  useEffect(() => {
    return () => {
      const componentList = getTabList({ caseDetail });
      componentList.forEach((item) => {
        if (item.cleanUp) {
          dispatch({
            type: item.cleanUp,
          });
        }
      });
    };
  }, []);

  return (
    <>
      <div className={styles.siderContainer} data-opensider={openSider}>
        {openSider && (
          <Tabs
            className={classnames({ [styles.tabs]: true, [styles.expand]: expand })}
            type="card"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          >
            {getTabList({ caseDetail }).map((tab) => (
              <Tabs.TabPane key={tab.type} tab={tab.type}>
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <div className={styles.tabHeaderContent}>
                      <Icon component={tab.headerIcon || IconSend} />
                      {formatMessageApi({
                        [tab.typeCode]: tab.dictCode,
                      })}
                    </div>
                    <div className={styles.tabHeaderAction}>
                      <Icon component={IconFullscreen} onClick={() => setExpand(!expand)} />
                      <Icon component={IconClose} onClick={() => setOpenSider(false)} />
                    </div>
                  </div>
                  {tab.content}
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
      </div>
      <div className={styles.verticalSider}>
        {getTabList({ caseDetail }).map((tab) => (
          <div
            className={styles.item}
            onClick={() => {
              setOpenSider(true);
              setActiveKey(tab.type);
            }}
            key={tab.type}
          >
            <Icon component={tab.icon} className={styles.tabPaneIcon} />
            <span className={styles.label}>
              {formatMessageApi({
                [tab.typeCode]: tab.dictCode,
              })}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
