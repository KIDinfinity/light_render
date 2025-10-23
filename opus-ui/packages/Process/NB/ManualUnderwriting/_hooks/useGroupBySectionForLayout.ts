import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ data, isDiplayAll, expand }: any) => {
  return useMemo(() => {
    const filterUnexpand = lodash.filter(data, (item) => item.expand !== 'N');
    const currentDate = isDiplayAll || expand ? data : filterUnexpand;
    const groupSet = new Set();
    let globalIndex = 0;
    const groupBy = (index: number, sectionData: any) => {
      if (lodash.isEmpty(currentDate)) {
        return false;
      }
      let groupSpanTotal = 0;
      const currentGroupSet = new Set();
      lodash
        .chain(sectionData)
        .filter((item: any, fieldIndex: number) => {
          return fieldIndex >= globalIndex;
        })
        .some((item: any) => {
          //通过return 控制循环是否继续
          const currentSpan = expand ? item?.span : item?.span * 2;
          if (groupSpanTotal + currentSpan <= 24) {
            groupSpanTotal = groupSpanTotal + currentSpan;
            currentGroupSet.add(item);
            return false;
          } else {
            const currntIndex = lodash.findIndex(currentDate, (i: any) => i.key === item.key);
            if (currntIndex > -1) {
              globalIndex = currntIndex;
              return true;
            }
          }
        })
        .value();
      groupSet.add(Array.from(currentGroupSet));
      if (index < sectionData?.length - 1) {
        if (globalIndex > index) {
          groupBy(globalIndex, currentDate);
        }
      }
    };

    groupBy(globalIndex, currentDate);
    const result = Array.from(groupSet);
    return result;
  }, [data, isDiplayAll, expand]);
};
