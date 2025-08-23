import { useContext, useEffect } from 'react';
import { filter } from 'rxjs/operators';
import { useDispatch } from 'dva';
import type { IData } from '@mc';
import { PurposeCode, MCContext } from '@mc';

import { safeParseUtil } from '@/utils/utils';

interface IProps {
  caseNo: string;
}

export default ({ caseNo }: IProps) => {
  const { subject } = useContext(MCContext);
  const dispatch = useDispatch();
  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }) => {
          if (!data) {
            return false;
          }
          return data.type === PurposeCode?.refreshIntegrationChecklist;
        })
      )
      .subscribe(({ data }: IData) => {
        const content = safeParseUtil(data?.content);
        if (content?.caseNo === caseNo) {
          dispatch({
            type: 'integration/getIntegrationChecklist',
            payload: {
              ...content,
            },
          });
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [subject]);
};
