import { proxyEnvMap } from '@/constants/proxyEnv';

const PROXY_ENV_KEY = 'DEV_PROXY_ENV_KEY';
export const getCurrentProxyKey = () => localStorage.getItem(PROXY_ENV_KEY) as keyof typeof proxyEnvMap || 'mock';
export const getBaseURL = () => proxyEnvMap[getCurrentProxyKey()] || proxyEnvMap.mock;
