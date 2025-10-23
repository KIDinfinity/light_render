export default () => {
  //这里应该拿到路由中的companyCode（针对case的，不是登陆时的）
  const companyCode = window.history?.state?.companyCode;
  return companyCode || '';
};
