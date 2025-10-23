import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import Layout from './Layout';

const Surrender = ({ transactionId }: any) => {
  const isDataCaptureProcess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isDataCapture
  );

  return !isDataCaptureProcess && <Layout transactionId={transactionId} />;
};
export default Surrender;
