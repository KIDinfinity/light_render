import { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc/index';
import { PurposeCode, MCContext } from '@mc/index';
import { safeParseUtil } from '@/utils/utils';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default (props: any) => {
  const { taskDetail } = props;
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);
  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) => {
            return [PurposeCode.refreshPremium].includes(data?.type);
          }
          // lifeCircle === LifeCircle.OnMessage && [PurposeCode.refreshPremium].includes(data?.type)
        )
      )
      .subscribe(({ data }: IData) => {
        (async () => {
          if (data?.type === PurposeCode.refreshPremium) {
            const content = safeParseUtil(lodash.get(data, 'content'));
            const { taskId } = lodash.pick(content, ['taskId']);
            if (taskId === lodash.get(taskDetail, 'taskId')) {
              dispatch({
                type: `${NAMESPACE}/getRefreshPaymentAmount`,
                payload: {
                  init: false,
                },
              });
            }
          }
        })();
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [taskDetail]);

  return null;
};
