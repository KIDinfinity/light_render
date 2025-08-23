
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          id: '233',
          addressList: [
            {
              address7: 'KHMK01',
              address2: 'GuangDong',
              addrType: 'C',
            },
          ],
        },
      ];
    });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn(() => {
      return {
        country: [
          {
            subCode: 'KHMK01',
            subName: 'Phnom Penh Capital',
          },
        ],
        province: {
          KHMK01: [
            {
              subCode: 'GuangDong',
              subName: 'Guang Dong',
            },
          ],
        },
      };
    }),
  };
});

describe('useGetCurrentLevelAddress', () => {
  // test('get current level address', () => {
  //   const renderer = renderHook(() =>
  //     useGetCurrentLevelAddress({
  //       id: '233',
  //       addressType: 'C',
  //       parentAddressLevel: 'country',
  //     })
  //   );
  //   expect(renderer.result.current).toEqual([
  //     {
  //       subCode: 'GuangDong',
  //       subName: 'Guang Dong',
  //     },
  //   ]);
  // });
  test.todo('ignore load sub address');
});
