import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ESaveIfNull } from 'bpm/pages/Information/enum/ESaveIfNull';
import useGetCurrrentActivityCategory from 'bpm/pages/Information/_hooks/useGetCurrrentActivityCategory';

export default ({ item }: any) => {
  const currentActivity = useGetCurrrentActivityCategory({ item });
  const enableSubmitBtn = useMemo(() => {
    let saveIfNull = lodash.get(currentActivity, 'saveIfNull', 0);
    const content = formUtils.queryValue(item?.content);
    const reason = formUtils.queryValue(item?.reason);
    const category = formUtils.queryValue(item?.categoryCode);
    if (!saveIfNull) {
      saveIfNull = 0;
    }

    if (category) {
      switch (saveIfNull) {
        case ESaveIfNull.Content:
          return Boolean(content);
        case ESaveIfNull.ContentOrReason:
          return Boolean(content || reason);
        case ESaveIfNull.Reason:
          return Boolean(reason);
        case ESaveIfNull.ContentAndReason:
          return Boolean(content && reason);
        default:
          return false;
      }
    }
  }, [currentActivity, item]);
  return { enableSubmitBtn, saveIfNull: lodash.get(currentActivity, 'saveIfNull', 0) };
};
