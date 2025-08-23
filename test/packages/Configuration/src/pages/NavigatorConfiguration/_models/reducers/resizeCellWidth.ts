import { produce }  from 'immer';
import lodash from 'lodash';
import { ColumnWidth } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default (state: any, action: any) => {
  const { fieldName, width } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const dataFieldList = draftState?.functionData?.dataFieldList;
    const { max, min } = ColumnWidth;
    draftState.functionData.dataFieldList = lodash.map(dataFieldList, (item: DataFieldProps) => {
      if (item.fieldName === fieldName) {
        let size = width;
        if (width > max) {
          size = max;
        } else if (width < min) {
          size = min;
        }
        return {
          ...item,
          columnSize: size,
        };
      }
      return item;
    });
  });

  return { ...nextState };
};
