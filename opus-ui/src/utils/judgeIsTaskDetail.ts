export default () =>
  window.location.pathname.toLowerCase().includes('/task/detail') ||
  window.location.pathname.toLowerCase().includes('/nb/history') ||
  window.location.pathname.toLowerCase().includes('/case/history');
