import type { ActionModel } from '../../_dto/model';

export default (state: any, { payload }: ActionModel) => {
  const { test } = payload;

  return {
    ...state,
    test,
  };
};
