/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { AddType } from '../../Enum';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { data } = action.payload;

    draftState.editData = {
      ...data.editData,
      [AddType.Conditions]: data.editData[AddType.Conditions].map((item: any) => {
        return item.id === data.id
          ? {
              ...item,
              binded: '0',
            }
          : item;
      }),
    };
  });
