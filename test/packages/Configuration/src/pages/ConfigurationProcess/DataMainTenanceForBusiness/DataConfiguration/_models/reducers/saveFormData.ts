import { isEmpty } from 'lodash';

export default (state: any, action: any) => {
  const { formData, versionList } = action.payload;
  const versionData = !isEmpty(versionList)
    ? {
        versionList,
      }
    : {};
  return {
    ...state,
    formData,
    ...versionData,
  };
};
