import { LSKey } from '@/utils/cache';

const Prefix = localStorage.getItem(LSKey.PROXY);

const env = Prefix ? `/${Prefix}` : '';

export const uploadUrl = `${env}/api/integration/submission/saveDocFile`;

export const limitFileSize = 100 * 2 ** 10 * 2 ** 10; // 100M
