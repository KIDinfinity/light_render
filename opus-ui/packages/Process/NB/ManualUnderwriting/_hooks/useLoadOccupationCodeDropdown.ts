import useAutoLoadHierachySubDicts from 'basic/hooks/useAutoLoadHierachySubDicts';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';

export default ({ id }: any) => {
  const occupationGroup = useGetClientInfoFieldValueByKey({ id, key: 'occupationGroup' });
  useAutoLoadHierachySubDicts({
    parentFieldName: 'Dropdown_IND_OccupationGroup',
    parentCode: occupationGroup,
  });
};
