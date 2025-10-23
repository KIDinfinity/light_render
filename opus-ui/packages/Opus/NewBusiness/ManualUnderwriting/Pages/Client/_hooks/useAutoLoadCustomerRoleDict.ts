import useAutoLoadHierachyCustomerSubDicts from 'basic/hooks/useAutoLoadHierachyCustomerSubDicts';

export default (parentCode: string, parentFieldName: string) => {
  useAutoLoadHierachyCustomerSubDicts({
    parentFieldName,
    parentCode,
  });
};
