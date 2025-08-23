import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { notification } from 'antd';
import lodash from 'lodash';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc/index';
import { LifeCircle, PurposeCode, MCContext } from '@mc/index';
import bpm from 'bpm/pages/OWBEntrance';
import { safeParseUtil } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (props) => {
  const { remoteTaskDetail } = props;
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);
  const isShow = useSelector((state: any) => state.workspaceSwitchOn.isShow);
  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) =>
            lifeCircle === LifeCircle.OnMessage &&
            [PurposeCode.envoyList, PurposeCode.refreshEnvoy].includes(data?.type)
        )
      )
      .subscribe(({ data }: IData) => {
        if (data?.type === PurposeCode.envoyList) {
          const content = safeParseUtil(lodash.get(data, 'content'));
          const { caseNo, groupCode } = lodash.pick(content, ['caseNo', 'groupCode']);
          if (
            isShow.isShowPending &&
            caseNo === lodash.get(remoteTaskDetail, 'processInstanceId')
          ) {
            dispatch({
              type: 'envoyController/getEnvoyInfo',
            });
            bpm.reload();
            notification.error({
              message: formatMessageApi(
                {
                  Label_COM_Message: 'MSG_000493',
                },
                formatMessageApi({
                  Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${groupCode}`,
                })
              ),
            });
          } else {
            notification.error({
              message: formatMessageApi(
                {
                  Label_COM_Message: 'MCM_000064',
                },
                formatMessageApi({
                  Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${groupCode}`,
                }),
                caseNo
              ),
            });
          }
        }
        if (data?.type === PurposeCode.refreshEnvoy) {
          dispatch({
            type: 'envoyController/getEnvoyInfo',
          });
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [remoteTaskDetail, isShow]);

  return null;
};
