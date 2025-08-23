import lodash from 'lodash';

export default () => {
  const taskDetail = lodash.pick(window.history?.state, ['companyCode']);
  const companyCode = taskDetail?.companyCode;
  return companyCode || '';
};
