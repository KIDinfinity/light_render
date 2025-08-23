
// jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
//   return () => {
//     return [
//       {
//         id: 233,
//         role: 'Insured',
//         name: 'Grey Chen',
//         gener: 'Female',
//         alb: '22',
//         dob: '19991',
//         bmi: '555',
//         annualIncome: '44',
//         title: 'Miss',
//         smoker: 'N',
//         preferredName: 'Style',
//         maritalStatus: 'Exiting',
//         idType: 'Passport',
//         nationality: '666',
//         usIndicia: 'ggg',
//         sourceofWealth: 'hhhh',
//         CountryofTaxResidence: 'hhh',
//         TINNo: '545',
//         reasonforNoTIN: '888',
//         specifyReason: 'N',
//         reasonsforPaying: '66',
//         bankruptcy: '555',
//         dateofBankruptcy: '2021-05-12T07:36:39.427+000',
//         PEP: 444,
//         associatedwithPEP: '55',
//         nameofPEP: '000',
//         relationshipwithPEP: 'aa',
//         countryofResidence: 99,
//         residenceAddress: '55',
//         contractNo: '33',
//         workNo: '44',
//         homeNo: '66',
//         emailAddress: '243233@qq.com',
//         educationLevel: '66',
//         englishProficiency: '33',
//         CKAResult: 'rer',
//         employmentStatus: 'Exiting',
//         occupation: 'gg',
//         occupationGroup: '44',
//         occupationClass: '42',
//         positionHeld: '12',
//         exactNatureofDutiesInvolved: '999',
//         nameofCompany: '233',
//         natureofBusiness: '23',
//         addressofEmployer: 'GuangZhou',
//       },
//       {
//         id: 666,
//         role: 'Payor',
//         name: 'Dragon Lin',
//         gener: 'unkown',
//         alb: '66',
//         dob: '19991',
//         bmi: '44',
//         title: 'MR',
//         annualIncome: '44',
//         smoker: 'N',
//         preferredName: 'Style',
//         maritalStatus: 'Exiting',
//         idType: 'Passport',
//         nationality: '99',
//         usIndicia: 'tt',
//         sourceofWealth: 'ffff',
//         CountryofTaxResidence: '444',
//         TINNo: '545',
//         reasonforNoTIN: '555',
//         specifyReason: 'N',
//         reasonsforPaying: '555',
//         dateofBankruptcy: '2021-05-12T07:36:39.427+000',
//         PEP: 55,
//         associatedwithPEP: '44',
//         nameofPEP: '000',
//         relationshipwithPEP: 'rr',
//         countryofResidence: 444,
//         residenceAddress: '55',
//         contractNo: '33',
//         workNo: '44',
//         homeNo: '66',
//         emailAddress: '243233@qq.com',
//         educationLevel: '33',
//         englishProficiency: '555',
//         CKAResult: '55',
//         employmentStatus: 'Exiting',
//         occupation: '555',
//         occupationClass: '44',
//         positionHeld: '23',
//         exactNatureofDutiesInvolved: '99',
//         nameofCompany: '233',
//         natureofBusiness: '23',
//         addressofEmployer: 'GuangZhou',
//       },
//       {
//         id: 555,
//         role: 'Payor',
//         name: 'Dragon Liu',
//         gener: 'Male',
//         alb: '99',
//         dob: '19991',
//         bmi: '66',
//         annualIncome: '44',
//         title: 'MM',
//         smoker: 'Y',
//         preferredName: '66',
//         maritalStatus: 'Exiting',
//         idType: 'Passport',
//         nationality: '445',
//         usIndicia: 'ggg',
//         sourceofWealth: 'mmm',
//         CountryofTaxResidence: '444',
//         TINNo: '545',
//         reasonforNoTIN: '777',
//         specifyReason: 'N',
//         reasonsforPaying: '555',
//         dateofBankruptcy: '2021-05-12T07:36:39.427+000',
//         PEP: 233,
//         associatedwithPEP: '21',
//         nameofPEP: '000',
//         relationshipwithPEP: 'rr',
//         countryofResidence: 888,
//         residenceAddress: '66',
//         contractNo: '55',
//         workNo: '33',
//         homeNo: '66',
//         emailAddress: '243233@qq.com',
//         educationLevel: '33',
//         englishProficiency: '555',
//         CKAResult: '44',
//         employmentStatus: 'Exiting',
//         occupation: 666,
//         occupationGroup: '55',
//         occupationClass: '44',
//         positionHeld: '77',
//         exactNatureofDutiesInvolved: '44',
//         nameofCompany: '344',
//         natureofBusiness: '99',
//         addressofEmployer: 'GuangZhou',
//       },
//     ];
//   };
// });
// jest.mock('@/utils/dictFormatMessage', () => {
//   return {
//     formatMessageApi: (params) => {
//       const typeCode = Object.keys(params)[0];
//       const dictCode = Object.values(params)[0];
//       const dicts = {
//         22: {
//           33: 'EducationLevel',
//         },
//         44: {
//           55: 'TextDictName',
//         },
//         gener: {
//           unkown: 'unkown',
//         },
//       };
//       // return lodash.get(dicts, `${typeCode}.${dictCode}`)
//       return dicts[typeCode][dictCode];
//     },
//   };
// });
// jest.mock('process/NB/ManualUnderwriting/utils/filterByRoles', () => {
//   return ({ data }: any) => data;
// });
// jest.mock('moment', () => {
//   return () => {
//     return {
//       format: jest.fn(() => {
//         return '2021/05/12';
//       }),
//     };
//   };
// });
// describe('set get data by section', () => {
//   test('test normal', () => {
//     const result = useGetDataBySection({
//       section: 'BackgroundInfo',
//       id: 233,
//       config: [
//         {
//           field: 'educationLevel',
//           fieldType: 'Text',
//           'field-props': {
//             label: {
//               dictTypeCode: '22',
//               dictCode: '33',
//             },
//             visible: 'Y',
//             expand: 'N',
//           },
//         },
//       ],
//     });
//     expect(result).toEqual([
//       {
//         label: 'EducationLevel',
//         expand: 'N',
//         key: 'educationLevel',
//         value: '66',
//       },
//     ]);
//   });
//   test('test dropdown', () => {
//     const result = useGetDataBySection({
//       section: 'BackgroundInfo',
//       id: 666,
//       config: [
//         {
//           field: 'gener',
//           fieldType: 'Dropdown',
//           'field-props': {
//             label: {
//               dictTypeCode: '44',
//               dictCode: '55',
//             },
//             visible: 'Y',
//             expand: 'Y',
//             'x-dict': {
//               dictTypeCode: 'gener',
//             },
//           },
//         },
//       ],
//     });
//     expect(result).toEqual([
//       {
//         label: 'TextDictName',
//         expand: 'Y',
//         key: 'gener',
//         value: 'unkown',
//       },
//     ]);
//   });
//   test('test date type', () => {
//     const result = useGetDataBySection({
//       section: 'BackgroundInfo',
//       id: 555,
//       config: [
//         {
//           field: 'dateofBankruptcy',
//           fieldType: 'Date',
//           'field-props': {
//             label: {
//               dictTypeCode: '22',
//               dictCode: '33',
//             },
//             visible: 'Y',
//             expand: 'N',
//           },
//         },
//       ],
//     });
//     expect(result).toEqual([
//       {
//         label: 'EducationLevel',
//         expand: 'N',
//         key: 'dateofBankruptcy',
//         value: '2021/05/12',
//       },
//     ]);
//   });
//   test('visible', () => {
//     const result = useGetDataBySection({
//       section: 'BackgroundInfo',
//       id: 555,
//       config: [
//         {
//           field: 'dateofBankruptcy',
//           fieldType: 'Date',
//           'field-props': {
//             label: {
//               dictTypeCode: '22',
//               dictCode: '33',
//             },
//             visible: 'Y',
//             expand: 'N',
//           },
//         },
//         {
//           field: 'test',
//           fieldType: 'Date',
//           'field-props': {
//             label: {
//               dictTypeCode: '22',
//               dictCode: '33',
//             },
//             visible: 'N',
//             expand: 'N',
//           },
//         },
//       ],
//     });
//     expect(result).toEqual([
//       {
//         label: 'EducationLevel',
//         expand: 'N',
//         key: 'dateofBankruptcy',
//         value: '2021/05/12',
//       },
//     ]);
//   })
//   test.todo('multiple select');
//   test.todo('order')
// });

describe('test', () => {
  test.todo('todo')
})
