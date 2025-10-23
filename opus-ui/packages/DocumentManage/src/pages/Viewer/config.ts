import { LSKey } from '@/utils/cache';

const Prefix = localStorage.getItem(LSKey.PROXY);

let env = '';

if (process.env.NODE_ENV === 'development') {
  env = `/${Prefix}`;
}

export const downloadDocStreamUrl = `${env}/api/doc/management/downloadDocStream`;
