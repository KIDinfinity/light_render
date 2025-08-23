import React, { useState, useEffect, useContext, useRef } from 'react';
import lodash from 'lodash';
import ModalWarnMessage from '../ModalWarnMessage';
import styles from './Guidance.less';
import { useSelector, useDispatch } from 'dva';
import { history } from 'umi';
import { findByUserId, updateInfo } from '@/services/userCenterGuideControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getPositon, headerElement, setElementStyle, hexToRGBA } from './utils';
import { safeParseUtil } from '@/utils/utils';
import Footer from './Footer';
import defaultInfo from './defaultInfo';
import hotfixHomeCanvasFit from './hotfixHomeCanvasFit';
import navigator from 'navigator/api';
import useJudgeChecklistCanUse from '@/_hooks/useJudgeChecklistCanUse';
import TaskDetailContext from 'navigator/components/CaseTaskDetail/Context.ts';
import { TableVersion } from 'navigator/enum/HomeTableVersion';
import { DashboardVersion } from 'navigator/pages/Home/Dashboard/Enum';
import { Mode } from 'navigator/pages/Home/Watching/View/ModePanel/Mode';

const GuideModal = () => {
  const dispatch = useDispatch();
  const [guidanceProcess, setGuidanceProcess] = useState(null);
  const [openMatchName, setOpenMatchName] = useState(null);
  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);
  const dashboardHidden = useSelector((state: any) => state.navigatorHomeWatching.dashboardHidden);
  const tableVersion = useSelector((state: any) => state.navigatorHomeWatching.homeTableVersion);
  const chartListV2Map = useSelector((state: any) => state.dashboardController?.chartListV2Map);
  const chartListMap = useSelector((state: any) => state.dashboardController?.chartListMap);
  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode) || '';

  const leftData = chartListV2Map?.left || [];
  const rightData = chartListV2Map?.right || [];
  const defaultDashboardCode = leftData?.[0]?.[0] || rightData?.[0]?.[0];
  const dashboardNum = lodash.compact([
    !lodash.isEmpty(leftData),
    !lodash.isEmpty(rightData),
  ]).length;

  const guidance: string = useSelector(({ global }: any) => global?.guidance);
  const guidanceIndex: number = useSelector(({ global }: any) => global?.guidanceIndex);
  const searchStatus: string = useSelector(
    ({ advancedQueryAllForm }: any) => advancedQueryAllForm?.searchStatus
  );
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const integrationChecklistAuth = commonAuthorityList.find(
    (item) => item?.authorityCode === 'integrationChecklist'
  );
  const integrationChecklist = useSelector((state) => state?.integration?.integrationChecklist);
  const integrationCheckInit = useSelector((state) => state?.integration?.init);
  const [changeSize, setChangeSize] = useState(1);
  const [domRender, setDomRender] = useState(0);
  const userId: string = useSelector(({ user }: any) => user.currentUser?.userId);
  const checklistAuthorize = useJudgeChecklistCanUse();
  const [isModalMask, setIsModalMask] = useState(true);
  const { processInstanceId }: any = useContext(TaskDetailContext);
  const clickBodyFunc = useRef(null);
  let renderCallback = null;

  const pathname = history.location.pathname;
  const query = history.location.search;

  const routerName = [
    {
      name: 'advTaskOne',
      router: '/navigator/advancedquery',
      init: true,
    },
    {
      name:
        guidanceProcess?.origin?.integration?.result === false && integrationChecklistAuth?.result
          ? 'integrationOne'
          : 'themeOne',
      router: '/navigator',
      next:
        guidanceProcess?.origin?.integration?.result === false && integrationChecklistAuth?.result
          ? ''
          : 'themeTwo',
      init: checklistAuthorize && !!processInstanceId,
    },
    {
      name: 'themeTwo',
      prev: 'themeOne',
      router: '/navigator/user/management/customization',
      query: '?g=t',
      init: true,
    },
    {
      name: 'newTableDashboardOne',
      router: '/navigator',
      init: true,
      auth:
        (tableVersion === TableVersion.V2 && mode === Mode.Table) ||
        (dashboardVersion === DashboardVersion.V2 && mode !== Mode.Table && dashboardNum > 0),
    },
  ];

  const objList = {
    advTaskOne: [
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00001' }).replace('!', '!<br>'),
        highLightNames: [],
        container: '.guidance-advanced-query-container',
        positionclass: '.guidance-adv-one',
        position: (containerDom) => ({
          top: containerDom?.top,
          left: containerDom?.left,
        }),
        tipPosition: 'antModalLT',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00002' }),
        highLightNames: ['.ant-table-placeholder'],
        container: '.guidance-advanced-query-container',
        positionclass: '.ant-table-placeholder',
        position: (containerDom) => ({
          top: containerDom?.top * 3,
          left: containerDom?.left * 0.32,
        }),
        tipPosition: 'antModalLTM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00003' }),
        highLightNames: ['.guidance-advanced-search-vetical-form'],
        container: '.guidance-advanced-query-container',
        positionclass: '.guidance-adv-one',
        position: (containerDom) => ({
          top: containerDom?.top * 3,
          left: containerDom?.left * 0.9,
        }),
        tipPosition: 'antModalLM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00004' }),
        highLightNames: ['.ant-btn-primary'],
        container: '.guidance-advanced-query-container',
        positionclass: '.ant-btn-primary',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top * 0.96,
          left: containerDom?.right * 1.05,
        }),
        tipPosition: 'antModalLM',
      },
    ],
    themeOne: [
      {
        content: `${formatMessageApi({ Label_COM_Message: 'GUIDE_02001' }).replace(
          '!',
          '!<br>'
        )}<br><br>`,
        highLightNames: ['.guidance-theme-one'],
        container: '.guidance-theme-one',
        positionclass: '.guidance-theme-one',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.bottom,
          left: containerDom?.left * 0.875,
        }),
        tipPosition: 'antModalLTM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02002' }),
        highLightNames: ['.guidance-theme-two'],
        container: '.guidance-theme-two',
        positionclass: '.guidance-theme-two',
        highLightBgColor: 'none',
        position: (containerDom) => {
          const offsetLeft =
            document.querySelector('.ant-modal')?.getBoundingClientRect().width * 0.85 || 0;
          return {
            top: containerDom?.height * 1.4,
            left: containerDom?.left - offsetLeft,
          };
        },
        tipPosition: 'antModalLTR',
        hiddenNext: true,
        hiddenDone: true,
        freeButton: true,
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02002' }),
        highLightNames: ['.guidance-theme-three'],
        container: '.guidance-theme-three',
        positionclass: '.guidance-theme-three',
        highLightBgColor: 'none',
        position: (containerDom) => {
          const offsetLeft =
            document.querySelector('.ant-modal')?.getBoundingClientRect().width || 0;
          return {
            top: containerDom?.top,
            left: containerDom?.left - offsetLeft * 1.04,
          };
        },
        tipPosition: 'antModalRT',
        hiddenNext: true,
        hiddenDone: true,
        freeButton: true,
      },
    ],
    themeTwo: [
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02003' }),
        highLightNames: ['.guidance-theme-four', '.guidance-theme-four-high'],
        container: '.guidance-theme-user-box',
        positionclass: '.guidance-theme-four',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top,
          left: containerDom?.left * 0.88,
        }),
        tipPosition: 'antModalRT',
        scrollToPosition: true,
        scrollBox: '.guidance-theme-scroll-one',
        scrollComplete: (srcollDom) => srcollDom.y - 198,
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02004' }),
        highLightNames: [
          '.guidance-ex-mask-theme-five',
          '.guidance-theme-five',
          '.guidance-theme-six',
          '.guidance-theme-seven',
        ],
        container: '.guidance-theme-six',
        positionclass: '.guidance-theme-five',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top * 0.91,
          left: containerDom?.width * 1.6,
        }),
        tipPosition: 'antModalLM',
        scrollToPosition: true,
        scrollBox: '.guidance-theme-six',
        scrollComplete: (srcollDom) => srcollDom.y - 198,
      },
    ],
    integrationOne: integrationChecklist?.length
      ? [
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03001' }),
            highLightNames: ['.forIntegrationGuideOnlyOne'],
            container: 'body',
            positionclass: '.forIntegrationGuideOnlyOne',
            highLightBgColor: 'none',
            position: (containerDom) => {
              return {
                top: containerDom?.top,
                right: containerDom?.right * 0.04,
              };
            },
            tipPosition: 'antModalRT',
            customMask: true, //是否使用自定义mask
            clickButtonToNext: true, //是否点击高亮区域进行next（这里建议button设置true，最后一步设置false）
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03003' }),
            highLightNames: ['.react-app-components-switch-drawer-content-contentLeft'],
            container: 'body',
            positionclass: '.react-app-components-switch-drawer-content-wrap',
            highLightBgColor: 'none',
            position: (containerDom) => {
              return {
                top: containerDom?.height / 5,
                right: containerDom?.width * 0.33,
              };
            },
            tipPosition: 'antModalRT',
            hiddenDone: true,
            freeButton: true,
            customMask: true,
            clickButtonToNext: true,
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03005' }),
            highLightNames: ['.forIntegrationGuideOnlyTwo'],
            container: 'body',
            positionclass: '.forIntegrationGuideOnlyTwo',
            highLightBgColor: 'none',
            position: (containerDom) => {
              const offsetTop =
                document.querySelector('.ant-modal')?.getBoundingClientRect()?.height || 0;
              const offsetLeft =
                (document.querySelector('.ant-modal')?.getBoundingClientRect()?.width -
                  containerDom?.width) /
                  2 || 0;
              return {
                top: containerDom?.y - offsetTop,
                left: containerDom?.x - offsetLeft,
              };
            },
            tipPosition: 'antModalBM',
            hiddenDone: true,
            freeButton: true,
            scrollToPosition: true,
            scrollBox: '.react-app-components-switch-drawer-tab-wrap',
            scrollComplete: (srcollDom) => srcollDom.y,
            customMask: true,
            clickButtonToNext: true,
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03006' }),
            highLightNames: ['.react-app-components-switch-drawer-expander-container-index-wrap'],
            container: 'body',
            positionclass: '.react-app-integration-integration-detail-process-index-cardWrapper',
            highLightBgColor: 'none',
            position: (containerDom) => {
              const offsetRight =
                document
                  .querySelector(
                    '.react-app-integration-integration-detail-process-index-cardWrapper'
                  )
                  ?.getBoundingClientRect()?.width * 1.04 || 0;
              return { top: containerDom?.top * 1.3, right: offsetRight };
            },
            tipPosition: 'antModalRT',
            hiddenDone: true,
            freeButton: true,
            customMask: true,
            clickButtonToNext: false,
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03007' }),
            highLightNames: ['.react-app-components-switch-drawer-content-contentRight'],
            container: 'body',
            positionclass: '.react-app-components-switch-drawer-content-contentRight',
            highLightBgColor: 'none',
            position: (containerDom) => ({
              top: containerDom?.bottom / 2,
              left: containerDom?.left * 1.26,
            }),
            tipPosition: 'antModalLTM',
            customMask: true,
            clickButtonToNext: false,
            clearCustomMask: true,
          },
        ]
      : [
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03001' }),
            highLightNames: ['.forIntegrationGuideOnlyOne'],
            container: 'body',
            positionclass: '.forIntegrationGuideOnlyOne',
            highLightBgColor: 'none',
            position: (containerDom) => {
              return {
                top: containerDom?.top,
                right: containerDom?.right * 0.04,
              };
            },
            tipPosition: 'antModalRT',
            customMask: true,
            clickButtonToNext: true,
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03002' }),
            highLightNames: ['.react-app-components-switch-drawer-content-contentLeft'],
            container: 'body',
            positionclass: '.react-app-integration-checklist-index-content',
            highLightBgColor: 'none',
            position: (containerDom) => {
              return {
                top: containerDom?.height / 5,
                right: containerDom?.width,
              };
            },
            tipPosition: 'antModalRT',
            hiddenDone: true,
            freeButton: true,
            customMask: true,
            clickButtonToNext: true,
          },
          {
            content: formatMessageApi({ Label_COM_Message: 'GUIDE_03004' }),
            highLightNames: ['.forIntegrationGuideOnlyTwo'],
            container: 'body',
            positionclass: '.forIntegrationGuideOnlyTwo',
            highLightBgColor: 'none',
            position: (containerDom) => {
              const offsetTop =
                document.querySelector('.ant-modal')?.getBoundingClientRect()?.height || 0;
              const offsetLeft =
                (document.querySelector('.ant-modal')?.getBoundingClientRect()?.width -
                  containerDom?.width) /
                  2 || 0;
              return {
                top: containerDom?.y - offsetTop,
                left: containerDom?.x - offsetLeft,
              };
            },
            tipPosition: 'antModalBM',
            scrollToPosition: true,
            scrollBox: '.react-app-components-switch-drawer-tab-wrap',
            scrollComplete: (srcollDom) => srcollDom.y,
            customMask: true,
            clickButtonToNext: true,
          },
        ],
    default: [],
    newTableDashboardOne:
      mode === Mode.Table
        ? [
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04007' }),
              highLightNames: [],
              container: '.guidance-theme-two',
              positionclass: '.guidance-theme-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.bottom,
                left: containerDom?.left,
              }),
              transform: 'translate(-83%, 4%)',
              tipPosition: 'antModalLTR',
              condition: tableVersion === TableVersion.V2,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04008' }),
              highLightNames: ['.guidance-newTable-container-one'],
              container: '.ant-layout-content',
              positionclass: '.guidance-newTable-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.right,
              }),
              transform: 'translate(-80%, -34%)',
              tipPosition: 'antModalLM',
              condition: tableVersion === TableVersion.V2,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04009' }),
              highLightNames: ['.guidance-newTable-container-two'],
              container: '.guidance-newTable-container-two',
              positionclass: '.guidance-newTable-container-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.bottom,
                left: containerDom?.right,
              }),
              transform: 'translate(-55%, -119%)',
              autoNext: dashboardHidden === false,
              nextEffect: 'navigatorHomeWatching/handleDashboardHidden',
              tipPosition: 'antModalBM',
              condition:
                tableVersion === TableVersion.V2 &&
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04002' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-one',
              positionclass: '.guidance-newDashboard-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top * 0.62,
                left: containerDom?.left * 0.95,
              }),
              tipPosition: 'antModalBM',
              condition:
                tableVersion === TableVersion.V2 &&
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04003' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-two',
              positionclass: '.guidance-newDashboard-container-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 0.5 || 0,
              }),
              transform: 'translate(-48%, -91%)',
              tipPosition: 'antModalBM',
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0 &&
                chartListMap?.[defaultDashboardCode]?.showFilter,
              autoNext: chartListMap?.[defaultDashboardCode]?.openFilter,
              nextEffect: 'dashboardController/setOpenFilter',
              effectPayload: {
                isOpen: true,
                dashboardCode: defaultDashboardCode,
              },
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04004' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-one',
              positionclass: '.guidance-newDashboard-container-three',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 0.5 || 0,
              }),
              transform: 'translate(-48%, -91%)',
              tipPosition: 'antModalBM',
              autoNext: !chartListMap?.[defaultDashboardCode]?.openFilter,
              nextEffect: 'dashboardController/queryChartData',
              effectPayload: {
                isOpen: false,
                dashboardCode: defaultDashboardCode,
                needCloseFilter: true,
              },
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0 &&
                chartListMap?.[defaultDashboardCode]?.showFilter,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04005' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: 'body',
              positionclass: '.guidance-newDashboard-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 1.5 || 0,
              }),
              transform: 'translate(-50%, -93%)',
              tipPosition: 'antModalBM',
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                (leftData?.[0]?.length > 1 || rightData?.[0]?.length > 1),
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04010' }),
              highLightNames: ['.guidance-newTable-container-two'],
              container: '.guidance-newTable-container-two',
              positionclass: '.guidance-newTable-container-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.bottom,
                left: containerDom?.right,
              }),
              transform: 'translate(-53.5%, -119%)',
              autoNext: dashboardHidden === true,
              nextEffect: 'navigatorHomeWatching/handleDashboardHidden',
              tipPosition: 'antModalBM',
              condition: dashboardVersion === DashboardVersion.V2 && dashboardNum > 0,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04006' }),
              highLightNames: [''],
              container: 'body',
              positionclass: '.guidance-newTable-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.right,
              }),
              transform: 'translate(-80%, -50%)',
              tipPosition: 'antModalLM',
            },
          ]
        : [
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04001' }),
              container: '.guidance-theme-two',
              positionclass: '.guidance-theme-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.bottom,
                left: containerDom?.left,
              }),
              transform: 'translate(-83%, 4%)',
              tipPosition: 'antModalLTR',
              condition: dashboardVersion === DashboardVersion.V2,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04002' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-one',
              positionclass: '.guidance-newDashboard-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top * 0.62,
                left: containerDom?.left * 0.95,
              }),
              tipPosition: 'antModalBM',
              condition: dashboardVersion === DashboardVersion.V2 && dashboardNum > 0,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04003' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-two',
              positionclass: '.guidance-newDashboard-container-two',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 0.5 || 0,
              }),
              transform: 'translate(-48%, -91%)',
              tipPosition: 'antModalBM',
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0 &&
                chartListMap?.[defaultDashboardCode]?.showFilter,
              autoNext: chartListMap?.[defaultDashboardCode]?.openFilter,
              nextEffect: 'dashboardController/setOpenFilter',
              effectPayload: {
                isOpen: true,
                dashboardCode: defaultDashboardCode,
              },
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04004' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: '.guidance-newDashboard-container-one',
              positionclass: '.guidance-newDashboard-container-three',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 0.5 || 0,
              }),
              transform: 'translate(-48%, -91%)',
              tipPosition: 'antModalBM',
              autoNext: !chartListMap?.[defaultDashboardCode]?.openFilter,
              nextEffect: 'dashboardController/queryChartData',
              effectPayload: {
                isOpen: false,
                dashboardCode: defaultDashboardCode,
                needCloseFilter: true,
              },
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                dashboardNum > 0 &&
                chartListMap?.[defaultDashboardCode]?.showFilter,
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04005' }),
              highLightNames: ['.guidance-newDashboard-highlight-one'],
              container: 'body',
              positionclass: '.guidance-newDashboard-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 1.5 || 0,
              }),
              transform: 'translate(-50%, -93%)',
              tipPosition: 'antModalBM',
              condition:
                dashboardVersion === DashboardVersion.V2 &&
                (leftData?.[0]?.length > 1 || rightData?.[0]?.length > 1),
            },
            {
              content: formatMessageApi({ Label_COM_Message: 'GUIDE_04006' }),
              highLightNames: [''],
              container: 'body',
              positionclass: '.guidance-newDashboard-container-one',
              highLightBgColor: 'none',
              position: (containerDom) => ({
                top: containerDom?.top,
                left: containerDom?.left + containerDom?.width * 0.5 || 0,
              }),
              transform: 'translate(-50%, -105%)',
              tipPosition: 'antModalBM',
            },
          ],
  };
  const listenSize = () => {
    if (renderCallback && lodash.isFunction(renderCallback)) {
      renderCallback();
    }
    setChangeSize((e) => e + 1);
  };
  const doubleList = lodash.debounce(listenSize, 100);
  const initMatchRouterList = routerName.filter(
    (item) => pathname === item.router && (!item?.query || item?.query === query)
  );

  const matchRouter =
    initMatchRouterList.length === 1
      ? initMatchRouterList?.[0]
      : initMatchRouterList?.find?.(
          (item) =>
            item?.name === openMatchName &&
            ((lodash.has(item, 'auth') && item?.auth) || !lodash.has(item, 'auth'))
        );

  const filterPrevNumber =
    lodash.filter(objList?.[matchRouter?.prev], (item) =>
      lodash.has(item, 'condition') ? item.condition : true
    )?.length || 0;
  const filterNextNumber =
    lodash.filter(objList?.[matchRouter?.next], (item) =>
      lodash.has(item, 'condition') ? item.condition : true
    )?.length || 0;
  const matchname =
    matchRouter?.name === 'advTaskOne' && searchStatus ? 'default' : matchRouter?.name;

  const List = lodash.filter(objList?.[matchname || 'default'], (item) =>
    lodash.has(item, 'condition') ? item.condition : true
  );
  const handleCloseClick = () => {
    dispatch({
      type: 'global/changeGuidanceIndex',
      payload: 0,
    });
    dispatch({
      type: 'global/changeGuidance',
      payload: false,
    });
    setElementStyle(headerElement(List[guidanceIndex]?.highLightNames), '0', '');
  };

  // 匹配到对应路由，并且还没完成过向导。
  // 重置向导步数，开启向导模式，默认对应dom元素未渲染完成。
  useEffect(() => {
    if (
      matchRouter &&
      guidanceProcess?.transfer?.[matchRouter?.name] === false &&
      matchRouter.init
    ) {
      const uploadData = async () => {
        try {
          const updateKey = guidanceProcess?.mapParentKey?.[matchRouter?.name];
          const params = {
            userId: userId,
            guideControlInfo: JSON.stringify({
              ...(guidanceProcess?.origin || {}),
              [updateKey]: {
                ...guidanceProcess?.origin?.[updateKey],
                result: true,
              },
            }),
          };

          await updateInfo(params);
        } catch (error) {}
      };

      uploadData();
      setGuidanceProcess((e) => ({
        ...e,
        transfer: { ...e?.transfer, [matchRouter?.name]: true },
      }));
      dispatch({
        type: 'global/changeGuidanceIndex',
        payload: 0,
      });
      setDomRender(false);
      dispatch({
        type: 'global/changeGuidance',
        payload: true,
      });
    }
  }, [pathname, guidanceProcess, matchRouter]);

  // 如果有上一步遗留的遮罩层，先移除。
  // 恢复上一步高亮的样式和层级。
  useEffect(() => {
    try {
      const exMask = headerElement('.guidance-ex-mask');
      if (exMask) {
        exMask?.parentElement?.removeChild(exMask);
      }
      List[guidanceIndex - 1]?.highLightNames?.forEach((item) =>
        setElementStyle(headerElement(item), '0', '')
      );
    } catch (error) {
      console.log('maskError', error);
    }

    if (guidanceIndex + 1 <= List.length && domRender) {
      try {
        // 初始化滚动到指定dom位置
        if (List[guidanceIndex]?.scrollToPosition) {
          const positionDom = getPositon(List[guidanceIndex]?.positionclass) || {};
          let top = positionDom?.top;
          if (lodash.isFunction(List[guidanceIndex]?.scrollComplete)) {
            top = List[guidanceIndex]?.scrollComplete(positionDom);
          }

          headerElement(List[guidanceIndex]?.scrollBox)?.scrollTo(0, top);
          // 更新滚动后的坐标
          setChangeSize((e) => e + 1);
        }

        List[guidanceIndex]?.highLightNames?.forEach((item) =>
          setElementStyle(
            headerElement(item),
            '9999',
            List[guidanceIndex]?.highLightBgColor ||
              'var(--navigator-advanced-query-filter-bg-color)'
          )
        );
        // 额外的遮罩层
        if (List[guidanceIndex]?.exMaskClass) {
          const newParant = headerElement(List[guidanceIndex]?.exMaskClass);
          const mask = document.createElement('div');
          mask.classList.add('guidance-ex-mask');
          mask.classList.add(styles.exMask);
          newParant?.appendChild(mask);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [guidanceIndex, domRender]);

  useEffect(() => {
    const fetchData = async (Id: string) => {
      try {
        const response = await findByUserId(objectToFormData({ userId: Id }));
        if (response != null) {
          const { enableGuideFlag, finishGuideFlag } = lodash.pick(response.resultData, [
            'enableGuideFlag',
            'finishGuideFlag',
          ]);
          let { guideControlInfo } = lodash.pick(response.resultData, ['guideControlInfo']);
          if (lodash.isEmpty(guideControlInfo) && enableGuideFlag && finishGuideFlag) {
            guideControlInfo = JSON.stringify(defaultInfo);
            const params = {
              userId: Id,
              guideControlInfo,
            };

            await updateInfo(params);
          }

          if (
            enableGuideFlag === 'Y' &&
            finishGuideFlag !== 'Y' &&
            !lodash.isEmpty(guideControlInfo)
          ) {
            const parseGuideControlInfo: any = safeParseUtil(guideControlInfo);
            setGuidanceProcess({
              origin: parseGuideControlInfo,
              transfer: lodash.reduce(
                lodash.values(parseGuideControlInfo),
                (r, c) => {
                  if (c?.result === false) {
                    setOpenMatchName(c.process[0]);
                    c.process.forEach((processKey) => {
                      r[processKey] = false;
                    });
                    return r;
                  }
                  return r;
                },
                {}
              ),
              mapParentKey: lodash.reduce(
                lodash.entries(parseGuideControlInfo),
                (r, [key, value]) => {
                  value.process.forEach((processKey) => {
                    r[processKey] = key;
                  });
                  return r;
                },
                {}
              ),
            });
          }
        }
      } catch (error) {}
    };
    if (userId) {
      fetchData(userId);
    }
    window.addEventListener('resize', doubleList);
    return () => {
      window.removeEventListener('resize', doubleList);
    };
  }, [userId]);
  // 搜索dom，存在坐标dom的情况下才会渲染弹窗
  useEffect(() => {
    let timer = null;

    if (!lodash.isEmpty(List)) {
      timer = setInterval(() => {
        const dom = document?.querySelector(List?.[0]?.positionclass);
        if (dom) {
          setDomRender(true);
          clearTimeout(timer);
        }
      }, 100);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [List]);

  useEffect(() => {
    if (List[guidanceIndex]?.autoNext) {
      handleNextClick(false);
    }
  }, [guidanceIndex, List]);
  const item = List?.[guidanceIndex];
  const containerDom = document?.querySelector(item?.positionclass);
  const handleNextClick = async (needRunEffect = true) => {
    if (item?.nextEffect && needRunEffect) {
      await dispatch({
        type: item?.nextEffect,
        payload: item?.effectPayload,
      });
    }
    dispatch({
      type: 'global/changeGuidanceIndex',
      payload: guidanceIndex + 1,
    });
    if (guidanceIndex === List.length - 1) {
      dispatch({
        type: 'global/changeGuidance',
        payload: false,
      });
    }
    if (item?.positionclass === '.forIntegrationGuideOnlyOne') {
      dispatch({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'integration',
        },
      });
      hotfixHomeCanvasFit();
    }
    if (item?.positionclass === '.forIntegrationGuideOnlyTwo') {
      navigator.SiderWorkSpaceController.send('turnOnExpander');
      hotfixHomeCanvasFit();
    }
  };
  const clearCanvasModal = () => {
    //1.删除canvasModalMask
    const targetCanvas = document.querySelector('#canvasMask');
    if (targetCanvas) {
      targetCanvas?.parentElement?.removeChild(targetCanvas);
    }
    //2.清理点击事件
    if (clickBodyFunc.current) {
      document.body?.removeEventListener('click', clickBodyFunc.current);
    }
  };
  const updateCanvasModal = () => {
    if (!guidance || lodash.isEmpty(List) || !item) {
      return;
    }
    const { highLightNames, clickButtonToNext, clearCustomMask } = item;
    const modalDom = document.querySelector('.ant-modal-root');
    if (clearCustomMask) {
      clearCanvasModal();
      return;
    }
    const targetDomClass = highLightNames?.[0];
    if (modalDom) {
      modalDom.parentElement.style.zIndex = 9;
    }
    const maskDom = document.createElement('canvas');
    const targetDom = document.querySelector(`${targetDomClass}`);
    if (!targetDom) {
      return;
    }

    maskDom.width = window.innerWidth;
    maskDom.height = window.innerHeight;
    maskDom.style.position = 'fixed';
    maskDom.style.top = 0;
    maskDom.style.zIndex = 7;
    maskDom.id = 'canvasMask';

    const ctx = maskDom.getContext('2d');
    const bgColor = getComputedStyle(document.body).getPropertyValue('--table-bg-color');
    const rgbaColor = hexToRGBA(bgColor, 0.45);
    ctx.fillStyle = rgbaColor;
    ctx?.fillRect(0, 0, maskDom.width, maskDom.height);
    if (targetDom) {
      const rect = targetDom.getBoundingClientRect();
      if (clickBodyFunc.current) {
        document.body?.removeEventListener('click', clickBodyFunc.current);
        clickBodyFunc.current = null;
      }

      clickBodyFunc.current = function (event) {
        if (
          event.clientX > rect.left &&
          event.clientX < rect.left + rect.width &&
          event.clientY > rect.top &&
          event.clientY < rect.top + rect.height
        ) {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          targetDom.dispatchEvent(clickEvent);
          if (clickButtonToNext === true) {
            handleNextClick();
          }
        }
      };
      document.body?.addEventListener('click', clickBodyFunc.current);

      ctx.globalCompositeOperation = 'destination-out';
      ctx?.fillRect(rect.left, rect.top, rect.width, rect.height);
      ctx.globalCompositeOperation = 'source-over';
    }

    document.body.appendChild(maskDom);
  };
  useEffect(() => {
    clearCanvasModal();
    if (!item) {
      return;
    }
    const { customMask } = item;
    if (customMask) {
      //使用自定义mask
      //guide修改先清除之前的mask
      setIsModalMask(false);
      updateCanvasModal();
      renderCallback = () => {
        clearCanvasModal();
        updateCanvasModal();
      };
    } else {
      //兼容之前的guide
      setIsModalMask(true);
    }
  }, [List, guidanceIndex, item]);
  return (
    <div key={changeSize}>
      {guidance && !lodash.isEmpty(List) && item && (
        <div key={changeSize}>
          {domRender && (
            <ModalWarnMessage
              className={`${styles[item?.tipPosition]} antModal`}
              visible={guidanceIndex < List?.length}
              hiddenExtraText={true}
              closable={false}
              zIndex={100}
              mask={isModalMask}
              maskStyle={{
                backgroundColor: 'var(--table-bg-color)',
                opacity: '0.45',
              }}
              wrapClassName={styles.wrap}
              getContainer={() => document?.querySelector(item?.container)}
              style={{
                ...item.position(containerDom?.getBoundingClientRect()),
                display: document.querySelector(item?.positionclass) ? 'block' : 'none',
                transform: item?.transform || 'none',
              }}
              showFooter={false}
              footer={
                <Footer
                  guidanceIndex={guidanceIndex}
                  List={List}
                  handleCloseClick={handleCloseClick}
                  handleNextClick={handleNextClick}
                  prevNumber={filterPrevNumber}
                  nextNumber={filterNextNumber}
                />
              }
              renderCallback={renderCallback}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </ModalWarnMessage>
          )}
        </div>
      )}
    </div>
  );
};
export default GuideModal;
