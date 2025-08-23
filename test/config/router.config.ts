const { NODE_ENV } = process.env;

const devRouter =
  typeof NODE_ENV !== 'undefined' && NODE_ENV === 'development'
    ? [
        {
          path: '/demo',
          component: '@/layouts/WorkspaceLayout',
          routes: [
            {
              exact: true,
              path: '/demo/formItem',
              component: '@/../packages/Basic/src/components/Form/Demo',
            },
            {
              exact: true,
              path: '/demo/formItemSelectPlus',
              component: '@/../packages/Basic/src/components/Form/Demo/SelectPlus',
            },
            {
              component: './404',
            },
          ],
        },
      ]
    : [];

export default [
  {
    path: '/mq',
    isLogin: true,
    routes: [
      {
        exact: true,
        path: '/mq',
        component: '@/../packages/Navigator/src/pages/MQ/index',
      },
    ],
  },
  {
    path: '/user',
    // 是否需要登录，默认true
    isLogin: false,
    routes: [
      { exact: true, path: '/user', redirect: '/user/login' },
      { exact: true, path: '/user/login', component: './User/Login' },
      { exact: true, path: '/user/prodAdmin/login', component: './User/Login' },
      { exact: true, path: '/user/systemAdmin/login', component: './User/Login' },
      { exact: true, path: '/user/resetpw', component: './User/ResetPW' },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/navigator',
    routes: [
      {
        exact: true,
        path: '/navigator',
        component: '@/../packages/Navigator/src/pages/Home/Home',
      },
      {
        exact: true,
        path: '/navigator/case/detail/:processInstanceId',
        component: '@/../packages/Navigator/src/pages/Case/CaseDetail',
      },
      {
        exact: true,
        path: '/navigator/user/management/:model',
        component: '@/../packages/Navigator/src/pages/User/UserManagement',
      },
      {
        exact: true,
        path: '/navigator/advancedquery',
        component: '@/../packages/Navigator/src/pages/AdvancedQuery/AdvancedQuery',
      },
      {
        exact: true,
        path: '/navigator/reportCenter',
        component: '@/../packages/Navigator/src/pages/ReportCenter',
      },
      {
        exact: true,
        path: '/navigator/ReportCenterOld',
        component: '@/../packages/Navigator/src/pages/ReportCenterOld',
      },
      {
        exact: true,
        path: '/navigator/case/create',
        component: '@/../packages/Navigator/src/pages//Case/Create',
      },
      {
        exact: true,
        path: '/navigator/case/common/create',
        component: '@/../packages/Navigator/src/pages//Case/CommonCreateCase',
      },
      {
        exact: true,
        path: '/navigator/configuration',
        component: '@/../packages/Configuration/src/pages/NavigatorConfiguration',
      },

      {
        exact: true,
        path: '/navigator/editor-demo',
        component: '@/../packages/BPM/src/pages/Editor-Demo',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/hk',
    routes: [
      { exact: true, path: '/hk', component: '@/../packages/Navigator/src/pages/Home/Home' },
    ],
  },
  {
    path: '/th',
    routes: [
      { exact: true, path: '/th', component: '@/../packages/Navigator/src/pages/Home/Home' },
    ],
  },
  {
    path: '/jp',
    routes: [
      { exact: true, path: '/jp', component: '@/../packages/Navigator/src/pages/Home/Home' },
    ],
  },
  {
    path: '/ph',
    routes: [
      { exact: true, path: '/ph', component: '@/../packages/Navigator/src/pages/Home/Home' },
    ],
  },
  {
    exact: true,
    path: '/',
    redirect: '/navigator',
  },
  {
    path: '/claimBasicProduct',
    routes: [
      {
        exact: true,
        path: '/claimBasicProduct/case/datacapture/create',
        component: '@/../packages/ClaimBasicProduct/src/pages/Create',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/swagger',
    routes: [
      {
        exact: true,
        path: '/swagger',
        component: '@/../packages/Swagger/src/pages',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    isAuth: false,
    routes: [
      {
        exact: true,
        path: '/dashboard',
        component: '@/../packages/Dashboard/src/pages',
      },
      {
        exact: true,
        path: '/dashboard/:businessType',
        component: '@/../packages/Dashboard/src/pages',
      },
      {
        exact: true,
        path: '/dashboard/demo',
        component: '@/../packages/Dashboard/src/pages/Demos',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/claim',
    routes: [
      {
        exact: true,
        path: '/claim/task/detail/:taskId',
        component: '../layouts/ClaimTaskLayout',
      },
      {
        exact: true,
        path: '/claim/case/hb/create',
        component: '@/../packages/Claim/src/pages/Thailand/ProcessOfHB/Create/Create',
      },
      {
        exact: true,
        path: '/claim/case/mj/create',
        component: '@/../packages/Claim/src/pages/Thailand/ProcessOfMJ/Create/Create',
      },
      {
        exact: true,
        path: '/claim/case/da/create',
        component: '@/../packages/Claim/src/pages/Thailand/ProcessOfDA/DAOfCreate',
      },
      {
        exact: true,
        path: '/claim/case/jpclm/create',
        component: '@/../packages/Process/JPCLM/Create',
      },
      {
        exact: true,
        path: '/claim/case/thclm/create',
        component: '@/../packages/Process/THCLM/Create',
      },
      {
        exact: true,
        path: '/claim/case/idclm/create',
        component: '@/../packages/Process/IDCLM/Create',
      },
      {
        exact: true,
        path: '/claim/case/phclm/create',
        component: '@/../packages/Process/PHCLM/Create',
      },
      {
        exact: true,
        path: '/claim/case/ud/create',
        component: '@/../packages/Claim/src/pages/Thailand/ProcessOfUD/UDOfCreate',
      },
      {
        exact: true,
        path: '/claim/case/phi/create',
        component: '@/../packages/Claim/src/pages/Philippines/ProcessOfPHICLM/Create',
      },
      {
        exact: true,
        path: '/claim/case/hk/create',
        component: '@/../packages/Claim/src/pages/HongKong/ProcessOfCLM/Create',
      },
      {
        exact: true,
        path: '/claim/ruleEngine/:id',
        component: '../../packages/RuleEngine/src/pages/View',
      },
      {
        exact: true,
        path: '/claim/insured360',
        component: '@/../packages/Claim/src/pages/360',
      },
      {
        exact: true,
        path: '/claim/hospital/detail',
        component: '@/../packages/Claim/src/pages/Hospital/HospitalDetail',
      },
      {
        exact: true,
        path: '/claim/history',
        component: '@/../packages/Claim/src/pages/ClaimHistory/index',
      },
      {
        exact: true,
        path: '/claim/case/request/warn',
        component: '@/../packages/Claim/src/pages/Japan/RequestWarnMessage',
      },
      {
        exact: true,
        path: '/claim',
        component: '@/../packages/Claim/src/pages/Default',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/process',
    routes: [
      {
        exact: true,
        path: '/process/task/detail/:taskId',
        component: '../layouts/ClaimTaskLayout',
      },
    ],
  },
  {
    path: '/servicing',
    routes: [
      {
        exact: true,
        path: '/servicing/history/:caseCategory/:businessNo',
        component: '@/../packages/Process/GeneralPOS/POSHistory',
      },
      {
        exact: true,
        path: '/servicing/ews/:businessNo/:caseNo',
        component: '@/../packages/Process/GeneralPOS/EWS/index.tsx',
      },
      {
        component: './404',
      },
    ],
  },
  {
    exact: true,
    path: '/summary-page/:businessNo/:caseNo',
    component: '@/../packages/SummaryPage',
  },
  {
    path: '/nb',
    routes: [
      {
        exact: true,
        path: '/nb/history/:businessNo/:caseNo',
        component: '@/../packages/Process/NB/NBHistory/index',
      },
      {
        exact: true,
        path: '/nb/uw/proposal/:taskId',
        component: '@/../packages/Process/NB/ManualUnderwriting/Proposal/index.tsx',
      },
      {
        expect: true,
        path: '/nb/paperSubmission',
        component: '@/../packages/Process/NB/ManualUnderwriting/Proposal/PaperSubmission.tsx',
      },
      {
        exact: true,
        path: '/nb/uw/ews/:businessNo/:caseNo',
        component: '@/../packages/Process/NewBusiness/EWS/index.tsx',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/ruleengine',
    routes: [
      {
        exact: true,
        path: '/ruleengine/flow',
        component: '@/../packages/RuleEngine/src/pages/Flow',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/documentManage',
    // 是否需要权限，默认true
    isAuth: false,
    component: '@/layouts/NoAuthLayout',
    routes: [
      {
        exact: true,
        path: '/documentManage/:processInstanceId',
        component: '@/../packages/DocumentManage/src/pages',
      },
      {
        exact: true,
        path: '/documentManage/ocrResults/:processInstanceId',
        component: '@/../packages/Process/Document/OcrResults',
      },
      {
        exact: true,
        path: '/documentManage/documentStream/page',
        component: '@/../packages/DocumentManage/src/pages/DocumentStream',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/policyDocuments',
    // 是否需要权限，默认true
    isAuth: false,
    routes: [
      {
        exact: true,
        path: '/policyDocuments/:id',
        component: '@/../packages/DocumentManage/src/policyDocuments',
      },
    ],
  },
  {
    path: '/configuration',
    // 是否需要权限，默认true
    // isAuth: false,
    routes: [
      {
        exact: true,
        path: '/configuration',
        component: '@/../packages/Configuration/src/pages/ConfigurationCenter',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/integration',
    routes: [
      {
        exact: true,
        path: '/integration',
        component: '@/components/Integration',
      },
    ],
  },
  {
    path: '/PAEngine',
    routes: [
      {
        exact: true,
        path: '/PAEngine/vnbCalculator',
        component: '@/../packages/Process/PAEngine/VNBCalculator',
      },
    ],
  },
  {
    path: '/sql',
    routes: [
      {
        exact: true,
        path: '/sql',
        component: '@/../packages/SQL',
      },
    ],
  },
  {
    path: '/manuallyWorkflowControl',
    routes: [
      {
        exact: true,
        path: '/manuallyWorkflowControl',
        component: '@/../packages/ManuallyWorkflowControl',
      },
    ],
  },
  {
    path: '/submissionData',
    // 是否需要权限，默认true
    isAuth: false,
    component: '@/layouts/NoAuthLayout',
    routes: [
      {
        exact: true,
        path: '/submissionData/:processInstanceId',
        component: '@/../packages/OriginalSubmissionDataView',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/operation',
    routes: [
      {
        exact: true,
        path: '/operation',
        component: '@/../packages/ServiceSystem',
      },
    ],
  },
  {
    path: '/supportCenter/user',
    isAuth: false,
    isLogin: false,
    routes: [
      {
        exact: true,
        path: '/supportCenter/user/login',
        component: '@/../packages/SupportCenter/pages/Login',
      },
      {
        path: '/supportCenter/user/login:region',
        component: '@/../packages/SupportCenter/pages/Login',
      },
    ],
  },
  {
    exact: true,
    path: '/supportCenter/monitor',
    component: '@/../packages/SupportCenter/pages/SupportMonitor',
  },
  ...devRouter,
  {
    component: './404',
  },
];
