import { useMemo, useCallback } from 'react';
import lodash from 'lodash';
import useGroupBySectionForLayout from 'process/NB/ManualUnderwriting/_hooks/useGroupBySectionForLayout';

export default ({ span, expand, currencyShow, data, itemKey, isDiplayAll, isSubCard }: any) => {
  const group = useGroupBySectionForLayout({
    data,
    isDiplayAll,
    expand,
  });
  const handleGetUnExpandTotalSpan = useCallback((d) => {
    const spanArr = [];
    lodash
      .chain(d)
      .filter((item) => {
        if (isDiplayAll || expand) {
          return true;
        } else {
          return item.expand !== 'N';
        }
      })
      .forEach((item: any) => {
        if (!expand) {
          spanArr.push((item?.span || 6) * 2);
        } else {
          spanArr.push(item?.span || 4);
        }
      })
      .value();
    return lodash.reduce(
      spanArr,
      (sum: number, n: number) => {
        return sum + n;
      },
      0
    );
  }, []);

  const islastFieldMaxSpan = lodash.some(group, (current: any) => {
    return lodash.some(current, (fieldConfig) => {
      if (fieldConfig.key === itemKey) {
        const unExpandTotalSpan = handleGetUnExpandTotalSpan(current);
        if (24 - unExpandTotalSpan) {
          if (lodash.chain(current).last().get('key').value() === itemKey) {
            return true;
          }
        }
      }
    });
  });

  const lastFieldMaxSpan = () => {
    let value = 0;
    const currentSpan = expand ? span : span * 2;
    lodash.forEach(group, (current: any) => {
      return lodash.forEach(current, (fieldConfig) => {
        if (fieldConfig.key === itemKey) {
          const unExpandTotalSpan = handleGetUnExpandTotalSpan(current);
          if (24 - unExpandTotalSpan) {
            if (lodash.chain(current).last().get('key').value() === itemKey) {
              value = 24 - unExpandTotalSpan + currentSpan;
            }
          }
        }
      });
    });
    return value;
  };

  return useMemo(() => {
    if (!expand) {
      if (isSubCard) {
        return 6 * span > 24 ? 24 : 6 * span;
      }
      if (currencyShow) {
        return 12;
      }
      if (2 * span > 24) {
        return 24;
      }
      if (islastFieldMaxSpan) {
        return lastFieldMaxSpan();
      }
      return 2 * span;
    } else {
      if (isSubCard) {
        return span + 1;
      }
      if (islastFieldMaxSpan) {
        return lastFieldMaxSpan();
      }
      return span;
    }
  }, [span, expand, currencyShow, data, group, itemKey, isSubCard]);
};
