import { useDispatch } from 'dva';
import lodash from 'lodash';
import useEnvoyStatusSubscribe from 'bpm/pages/Envoy/hooks/useEnvoyStatusSubscribe';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';

export default () => {
  const dispatch = useDispatch();
  const handleLoadFlag = useLoadProposalFlagCallback();
  useEnvoyStatusSubscribe({
    callback: (data: any) => {
      const needRefresh = (() => {
        if (lodash.isPlainObject(data)) {
          return lodash.get(data, 'refreshMainPageFlag');
        }
        // batch send envoy
        if (lodash.isArray(data)) {
          return lodash.some(data, (item: any) => lodash.get(item, 'refreshMainPageFlag'));
        }
      })();
      if (needRefresh) {
        dispatch({
          type: `${NAMESPACE}/reLoadBizDataUseSnapshot`,
        });
      }
      const needRefreshProposalFlag = (() => {
        // 不同版本的 counter offfer group code
        return lodash.includes(
          ['P_BP_PND_CounterOffer', 'P_PH_PND_020', 'P_PND_034'],
          lodash.get(data, 'groupCode')
        );
      })();
      if (needRefreshProposalFlag) {
        handleLoadFlag();
      }
    },
  });
};
