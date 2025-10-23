import { useCallback, useEffect } from 'react';
import lodash from 'lodash';
import {
  touch,
  getTouchResult,
  revertTouchResult,
} from '@/services/navigatorCaseTouchOperationControllerService';
import { Validator } from 'jsonschema';
import useAbortController from '@/components/AbortController/useAbortController';
const validator = new Validator();

const schema = {
  id: 'submit-response',
  properties: {
    success: { type: 'boolean' },
    resultData: {
      type: 'object',
      properties: {
        businessData: {
          type: 'object',
        },
      },
    },
  },
};

interface IProps {
  requestInterval: number;
  requestTimeLimit: number;
  taskId?: string;
}
export default ({ requestInterval, requestTimeLimit, taskId }: IProps) => {
  const signal = useAbortController([window.location]);
  let timer = 0;
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [signal, timer]);
  return useCallback(
    async ({ params }) => {
      let currentGetResultCount = 0;
      const touchResponse = await touch(
        { ...params },
        {
          // signal
        }
      );
      return new Promise((resolve: any) => {
        const initialTime = new Date().getTime();
        if (
          lodash.isPlainObject(touchResponse) &&
          touchResponse?.success &&
          lodash.isPlainObject(touchResponse.resultData)
        ) {
          if (!touchResponse.resultData?.async) {
            resolve(touchResponse.resultData);
          } else {
            const touchId = touchResponse.resultData?.touchId || '';
            if (touchId) {
              const getTouchResultFunc = async ({ id }: any) => {
                const touchResult = await getTouchResult(
                  {
                    touchId: id,
                    taskId,
                  },
                  {
                    // signal,
                  }
                );
                currentGetResultCount = currentGetResultCount + 1;
                const validatorRes = validator.validate(touchResult, schema);
                if (validatorRes.valid || !touchResult?.success) {
                  resolve(touchResult);
                } else {
                  const now = new Date().getTime();
                  if (now - initialTime < requestTimeLimit) {
                    timer = setTimeout(() => {
                      getTouchResultFunc({
                        id: touchId,
                      });
                    }, requestInterval);
                  } else {
                    clearTimeout(timer);
                    revertTouchResult({ touchId });
                    resolve({
                      success: false,
                      promptMessages: [
                        {
                          content: 'Time Out',
                        },
                      ],
                    });
                  }
                }
              };
              getTouchResultFunc({
                id: touchId,
              });
            } else {
              resolve(touchResponse);
            }
          }
        } else {
          resolve(touchResponse);
        }
      });
    },
    [timer, taskId]
  );
};
