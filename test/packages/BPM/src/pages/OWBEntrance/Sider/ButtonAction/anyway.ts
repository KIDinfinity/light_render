import lodash from 'lodash';

export default ({ anyway, dispatch, isAuto, isSuccess, responseCollect,taskDetail }: any) => {
  if (lodash.isFunction(anyway)) {
    anyway({
      responseCollect,
      isSuccess,
      dispatch,
      isAuto,
      taskDetail
    });
  }
};
