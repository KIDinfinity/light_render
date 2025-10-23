import lodash from 'lodash';

export default (state: any, action: any) => {
  const { errors } = action.payload;
  const { buttonStatus } = state;

  lodash.map(buttonStatus, data => {
    if(data.status === 'error') {
      data.errorsCount = errors?.length || 0;

      if (errors.length === 0) {
        data.status = 'default';
      }
    }
  })

  return state;
};
