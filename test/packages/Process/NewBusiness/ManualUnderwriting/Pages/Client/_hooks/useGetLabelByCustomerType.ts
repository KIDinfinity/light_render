import EntityCustomerLabel from 'process/NB/Enum/EntityCustomerLabel';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

export default ({ dictCode, typeCode, form }: any) => {
  const customerType = form.getFieldValue('customerType');
  const isCustomerEntity = useGetIsCustomerEntity({ customerType });

  if (isCustomerEntity) {
    return {
      dictCode: EntityCustomerLabel[`${dictCode}`],
      typeCode: 'Label_BIZ_Entity',
    };
  }
  return {
    dictCode,
    typeCode,
  };
};
