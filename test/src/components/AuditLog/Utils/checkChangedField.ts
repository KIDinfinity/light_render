import lodash from 'lodash';

// 在claimData里存在changedField传过来的数据
export default (claimData: any = {}, changedFields: any[] = [], fieldName: string) => {
  const claimValues = lodash.values(claimData);
  return (
    claimData &&
    lodash.find(changedFields, (fields: any) => {
      const { __change, validating, ...res } = fields;
      const matchField =
        fieldName?.includes(__change?.name) || __change?.name?.match?.(/^.+_[0-9]+$/); // 临时处理name与实际有出入的问题
      const matchData =
        lodash.isEmpty(res) ||
        lodash.some(
          lodash.values(res),
          (value: any) => value && lodash.includes(claimValues, value)
        );
      const matchValue = claimData[__change?.name] === __change?.value;
      let matchArrayValue = false;
      if (lodash.isArray(__change?.value)) {
        matchArrayValue = lodash.isEqual(claimData[__change?.name], __change?.value);
      }

      return matchField && (matchData || matchValue || matchArrayValue);
    })
  );
};
