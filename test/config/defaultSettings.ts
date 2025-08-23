export interface DefaultSettings {}

export default {
  navTheme: 'light', // theme for nav menu
  layout: 'topmenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar

  primaryColor: '#e87722', // primary color of ant design
  tableHeaderBg: 'red',
  offsetRight: 382, // 默认侧边栏宽度,
  offsetDrawer: 427, // 默认侧边栏宽度加切换的宽度加滚动条的宽度,

  paddingTop: '64px',
} as DefaultSettings;
