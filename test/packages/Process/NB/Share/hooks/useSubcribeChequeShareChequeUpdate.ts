import { useContext, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
// import { notification } from 'antd';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);
  const handleRefresh = useRefreshChequeInfoCallback();
  const NAMESPACE = useGetNamespace();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  useEffect(() => {
    dispatch({
      type: 'converseController/conversationList',
    });

    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage &&
            [PurposeCode.ShareChequeSaved, PurposeCode.ShareChequeVerified].includes(data?.type)
        )
      )
      .subscribe(({ data }: IData) => {
        // notification.open({
        //   message: data?.content,
        // });
        // 更新 - 会话列表 新会话
        handleRefresh({ businessData });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleRefresh, subject, businessData]);

  return null;
};
