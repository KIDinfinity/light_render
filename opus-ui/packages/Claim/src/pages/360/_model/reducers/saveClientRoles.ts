export default function saveActiveRole(state: any, { payload }: { clientRoles: any[] }) {
  const { clientRoles } = payload;
  return {
    ...state,
    clientRoles,
  };
}
