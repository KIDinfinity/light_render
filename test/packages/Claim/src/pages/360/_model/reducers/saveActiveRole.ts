export default function saveActiveRole(state: any, { payload }: { activeRole: string }) {
  const { activeRole } = payload;
  return {
    ...state,
    activeRole,
  };
}
