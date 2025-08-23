export default function (state: any) {
  return {
    ...state,
    getProcessJobInfoTimeStamp: new Date().getTime(),
  };
}
