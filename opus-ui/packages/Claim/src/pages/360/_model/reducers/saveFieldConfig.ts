export default function saveFieldConfig(state: any, action: any) {
  state.fieldConfig = action?.payload?.fieldConfig || [];

  return state;
}
