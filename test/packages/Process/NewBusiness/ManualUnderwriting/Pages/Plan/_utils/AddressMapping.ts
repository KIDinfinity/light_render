import AddressLevel from 'process/NewBusiness/ManualUnderwriting/_enum/AddressLevel';

const addressMapping = () => {
  return {
    address7: AddressLevel.Country,
    address6: AddressLevel.Province,
    address5: AddressLevel.City,
    address4: AddressLevel.District,
    address3: AddressLevel.Commune,
  };
};

export default addressMapping;
