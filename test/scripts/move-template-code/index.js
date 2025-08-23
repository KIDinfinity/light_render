const { moveSection } = require('../move-section');
const { moveFields } = require('../move-fields');

(() => {
  const config = [
    'PersonalInfo-Field',
    'FinancialInfo-Field',
    'FinancialInfo-Table',
    'ContactInfo-Field',
    'BackgroundInfo-Field',
    // 'RiskIndicatorInfo',
    'OtherInfo-Field',
    'NationalityInfo-Field',
  ];
  config.forEach(section => {
    moveSection({
      section,
      sectionConfigPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/${section}/Section/index.tsx`,
      sectionRenderPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/${section}/index.tsx`
    });
    setTimeout(() => {
      moveFields({
        basePath: `packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/${section}/Section`,
        targetPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/${section}/Section/Fields/`,
      });
    }, 3000)
  })
})()

// (() => {
//   const config = [
//   //  'PolicyReplacement',
//   //  'Fund',
//   //  'DistributionChannel',
//   //  'PlanInfo'
//   // 'PaymentInfo'
//   'Fund-Field',
//   'Fund-Header',
//   'Fund-Table',
//   'DistributionChannel-Field',
//   'DistributionChannel-Header',
//   'PolicyReplacement-Table',
//   'PolicyReplacement-Header'
//   ];
//   config.forEach(section => {
//     moveSection({
//       section,
//       sectionConfigPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/${section}/Section/index.tsx`,
//       sectionRenderPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/${section}/index.tsx`
//     });
//     setTimeout(() => {
//       moveFields({
//         basePath: `packages/Process/NB/ManualUnderwriting/${section}/Section`,
//         targetPath: `/Users/grey/work/fwd/Venus-UI/packages/Process/NB/ManualUnderwriting/${section}/Section/Fields/`,
//       });
//     }, 3000)
//   })
// })()
