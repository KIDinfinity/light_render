
// 统计section错误
const collectSectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited || !claimEntities) {
    return [];
  }

  const errors: string[] = [];
  return errors;
};

export { collectSectionErrors };
