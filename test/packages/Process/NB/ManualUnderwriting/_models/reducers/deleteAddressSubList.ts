import { produce }  from 'immer';
import lodash from 'lodash';
import ClientAddress from 'process/NB/Enum/ClientAddress';

export default (state: any, action: any) => {
  const { fieldName } = action.payload;
  const subFieldNames = [
    ClientAddress.address7,
    ClientAddress.address6,
    ClientAddress.address5,
    ClientAddress.address4,
    ClientAddress.address3,
  ];
  const fieldNameIndex = lodash.indexOf(subFieldNames, fieldName);
  const subFieldName =
    fieldNameIndex >= 0 ? lodash.slice(subFieldNames, fieldNameIndex + 1) : subFieldNames;

  const nextState = produce(state, (draftState: any) => {
    lodash.map(subFieldName, (item) => {
      draftState[item] = [];
    });
  });
  return { ...nextState };
};
