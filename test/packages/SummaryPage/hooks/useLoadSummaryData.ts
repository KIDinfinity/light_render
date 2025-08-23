import { useEffect, useContext } from 'react';
import { useParams } from 'umi';
import lodash from 'lodash';
import { getUwProposal } from '@/services/owbNbNbInquiryControllerService';
import Context from 'summary/Context';

interface IParams {
  businessNo: string;
}
export default () => {
  const params: IParams = useParams();
  const { dispatch } = useContext(Context);
  useEffect(() => {
    (async () => {
      const { businessNo } = lodash.pick(params, ['businessNo']);
      const response = await getUwProposal({
        businessNo,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: 'setBizData',
          payload: {
            bizData: resultData?.businessData,
          },
        });
      }
    })();
  }, [params]);
};
