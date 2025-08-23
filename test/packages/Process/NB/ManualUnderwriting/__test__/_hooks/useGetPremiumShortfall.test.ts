// import { renderHook } from '@testing-library/react-hooks';
// import useGetPremiumShortfall from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumShortfall';
// jest.mock('dva', () => {
//   const actual = jest.requireActual('dva');
//   return {
//     ...actual,
//     useSelector: jest
//       .fn(() => {
//         return {};
//       })
//       .mockImplementationOnce(() => {})
//       .mockImplementationOnce(() => {
//         return {
//           policyList: [
//             {
//               paidAmount: 2.3,
//               paymentList: [
//                 {
//                   policyInitialPremium: 3.4,
//                 },
//               ],
//             },
//           ],
//         };
//       })
//       .mockImplementationOnce(() => {
//         return {
//           policyList: [
//             {
//               paidAmount: 0.3,
//               paymentList: [
//                 {
//                   policyInitialPremium: 0.4,
//                 },
//               ],
//             },
//           ],
//         };
//       })
//       .mockImplementationOnce(() => {
//         return {
//           policyList: [
//             {
//               paidAmount: null,
//               paymentList: [
//                 {
//                   policyInitialPremium: 0.1,
//                 },
//               ],
//             },
//           ],
//         };
//       })
//       .mockImplementationOnce(() => {
//         return {
//           policyList: [
//             {
//               paidAmount: undefined,
//               paymentList: [
//                 {
//                   policyInitialPremium: 0.1,
//                 },
//               ],
//             },
//           ],
//         };
//       }),
//   };
// });
// describe('useGetPremiumShortfall', () => {
//   test('subtract number', () => {
//     const renderer = renderHook(() => useGetPremiumShortfall());
//     expect(renderer.result.current).toEqual('1.10');
//   });

//   test('0.4 -  0.3', () => {
//     const renderer = renderHook(() => useGetPremiumShortfall());

//     expect(renderer.result.current).toEqual('0.10');
//   });

//   test('0.1 - null', () => {
//     const renderer = renderHook(() => useGetPremiumShortfall());
//     expect(renderer.result.current).toEqual('0.10');
//   });

//   test('0.1 - undefined', () => {
//     const renderer = renderHook(() => useGetPremiumShortfall());
//     expect(renderer.result.current).toEqual('0.10');
//   });
// });

test('hello', () => {
  expect(true).toBeTruthy();
});
