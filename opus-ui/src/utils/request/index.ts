import fetch from 'isomorphic-fetch';
import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';
import {
  validateResErrorTypeWarn,
  validateResErrorTypeError,
  validateResErrorTypeConfirm,
} from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import checkStatus from './checkStatus';
import getRequestUrl from './getRequestUrl';
import transResponseByContentType from './transResponseByContentType';
import catchError from './catchError';
import getOptions from './getOptions';
import lodash from 'lodash';
import handlePromptMessage from './handlePromptMessage';

const globalCache = new Map();
const defaultTimeout = 1000 * 6;
const clearCache = () => {
  setTimeout(
    () =>
      requestIdleCallback(() => {
        for (const [requestUrl, requestCache] of globalCache) {
          for (const [params, cache] of requestCache) {
            if (cache.expireDate > new Date()) {
              requestCache.delete(params);
              if (requestCache.size === 0) {
                globalCache.delete(requestUrl);
              }
            }
          }
        }
        clearCache();
      }),
    5 * 60 * 1000
  );
};

clearCache();

/**
 * 与后端约定，有警告信息的Request，会返回个token（x-warn-nonce）
 * 前端拿到之后将token放到header，再次发起请求，作为确认。
 */
export default function request(url: string, option: any, async?: any) {
  const newRequestUrl = getRequestUrl({ url, option });
  const newOptions = getOptions(option, newRequestUrl);
  const fetchFn = (signal: any = void 0) =>
    fetch(newRequestUrl, { ...newOptions, signal: signal || newOptions.signal })
      .then(checkStatus)
      .then(transResponseByContentType)
      .then((response) => {
        // 如果传这个参数，不做任何处理，直接返回response
        if (!!async) {
          return response;
        }

        const type = lodash.get(response, 'type', '');
        const promptMessages = lodash.get(response, 'promptMessages', []);

        if (validateResErrorTypeConfirm(response)) {
          newOptions.headers['x-warn-confirm'] = response.resultData['x-warn-confirm'];
          return new Promise((resolve) => {
            handleWarnMessageModal(handlePromptMessage({ type, promptMessages }), {
              hiddenExtraText: true,
              okText: formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.ruleEngine.label.OK',
              }),
              hideCancelButton: true,
              okFn: async () => {
                resolve(response);
              },
            });
          });
        }
        if (validateResErrorTypeWarn(response)) {
          newOptions.headers['x-warn-nonce'] = response.resultData['x-warn-nonce'];
          return new Promise((resolve) => {
            handleWarnMessageModal(response.promptMessages, {
              okFn: async () => {
                const res = await fetchFn();
                resolve(res);
                if (typeof newOptions.intactAction === 'function') {
                  newOptions.intactAction();
                }
              },
              cancelFn: () => {
                resolve(response);
              },
            });
          });
        }
        if (validateResErrorTypeError(response)) {
          newOptions.headers['x-error-nonce'] = response.resultData['x-error-nonce'];

          return new Promise((resolve) => {
            handleMessageModal(handlePromptMessage({ type, promptMessages }), {
              onOk: async () => {
                resolve(response);
              },
            });
          });
        }

        return response;
      })
      .catch((error) => catchError({ newRequestUrl, url, error }));

  if (option.localCache) {
    if (option.signal?.aborted) return fetchFn();
    let params: any;
    if (option.body instanceof FormData) {
      params = {};
      for (const [key, value] of option.body) {
        if (params[key] !== void 0) {
          params[key] = value;
        } else {
          params[key] = option.body.getAll(key);
        }
      }
    } else {
      params = option.body;
    }

    try {
      params = JSON.stringify(params);
    } catch (e) {
      return fetchFn();
    }

    const timeout = option.localCache?.timeout || defaultTimeout;
    const newRequest = (map: Map<string, any>) => {
      if (option.signal) {
        const controller = new AbortController();
        const promise = fetchFn(controller.signal);
        let reject: (reason: { name: string }) => void;
        const racingPromise = new Promise((_, rej) => {
          reject = rej;
        });
        const cache = { promise, expireDate: new Date() - 0 + timeout };
        map.set(params, cache);
        option.signal.addEventListener('abort', () => {
          if (!cache.noAbort) {
            controller.abort();
            map.delete(params);
            if (map.size === 0) {
              globalCache.delete(newRequestUrl);
            }
          } else {
            reject({ name: 'AbortError' });
          }
        });
        return Promise.race([racingPromise, promise]).catch((error) =>
          catchError({ newRequestUrl, url, error })
        );
      } else {
        const promise = fetchFn();
        map.set(params, { promise, expireDate: new Date() - 0 + timeout });
        return promise;
      }
    };

    if (!globalCache.has(newRequestUrl)) {
      const requestCache = new Map();
      globalCache.set(newRequestUrl, requestCache);
      return newRequest(requestCache);
    } else {
      const requestCache = globalCache.get(newRequestUrl);
      if (!requestCache.has(params)) {
        return newRequest(requestCache);
      } else {
        const cache = requestCache.get(params);
        if (new Date(cache.expireDate) < new Date()) {
          return newRequest(requestCache);
        } else {
          cache.noAbort = true;
          if (!option.signal) return cache.promise;
          let reject: (reason: { name: string }) => void;
          const promise = new Promise((_, rej) => (reject = rej)).catch((error) =>
            catchError({ newRequestUrl, url, error })
          );
          option.signal.addEventListener('abort', () => {
            reject({ name: 'AbortError' });
          });
          return Promise.race([promise, cache.promise]);
        }
      }
    }
  }

  return fetchFn();
}
