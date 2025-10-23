import lodash from 'lodash';
import saveSingleVersionEWS from './saveSingleVersionEWS';

export default (state: any, action: any) => {
  const { mutipleEWSData } = action?.payload;

  let newData = state;

  lodash.forEach(mutipleEWSData, (singleRes: any) => {
    newData = saveSingleVersionEWS(newData, {
      payload: {
        sigleVersionData: singleRes?.resultData,
        version: singleRes?.resultData?.id,
      },
    });
  });
  return { ...newData };
};
