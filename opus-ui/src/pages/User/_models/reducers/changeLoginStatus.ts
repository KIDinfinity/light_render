import { setAuthority } from '@/utils/authority';

export default (state: any, { payload }: any) => {
  setAuthority(payload?.currentAuthority);
  return {
    ...state,
    status: payload?.success,
    message: payload?.promptMessages?.[0]?.content,
  };
};
