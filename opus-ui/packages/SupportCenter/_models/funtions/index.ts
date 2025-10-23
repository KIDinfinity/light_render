import { Env, tenant } from '@/components/Tenant';
declare const NODE_ENV: any;

const envList = ['presit', 'sit', 'uat'];

export const isProdEnv = () => {
  const currentNodeEnv = typeof NODE_ENV !== 'undefined' ? NODE_ENV : null;
  const activeProfile = tenant.activeProfile();

  return currentNodeEnv !== Env.Development && !envList.includes(activeProfile?.toLowerCase());
};

export const isDevEnv = () => {
  const currentNodeEnv = typeof NODE_ENV !== 'undefined' ? NODE_ENV : null;
  return currentNodeEnv === Env.Development;
};

export const passKey = 'J8qPJZ4lzAtUq94';
