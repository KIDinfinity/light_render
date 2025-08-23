import SS from './SS';
import { SSKey } from './SSKey';

export const setSSOAuditLog = (params: any) => {
  const oldConfig = SS.getItem(SSKey.SSOAUDITLOG) || {};

  SS.setItem(SSKey.SSOAUDITLOG, {
    ...oldConfig,
    ...params,
  });
};

export const removeSSOAuditLog = () => {
  SS.removeItem(SSKey.SSOAUDITLOG);
};
