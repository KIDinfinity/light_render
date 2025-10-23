import lodash from 'lodash';

export default ({ addressList }: any) => {
  return (
    lodash
      .chain(addressList)
      .filter((addressItem: any) => {
        let isDrop = true;
        lodash
          .chain(addressItem)
          .entries()
          .forEach(([key, value]) => {
            const reg = /(address[1-7])|(zipCode)|(fullAddress)/;
            const countryReg = /(country)/;
            if (reg.test(key) && !!value) {
              isDrop = false;
            } else if (countryReg.test(key) && !!value) {
              if (!(value === 'USA' && addressItem?.addrType === 'US')) {
                isDrop = false;
              }
            }
          })
          .value();
        return !isDrop;
      })
      .value() || []
  );
};
