
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        id: '233',
        extraMortality: 666,
        flatMortality: null,
      },
    ];
  });
});

describe('test calc required', () => {
  test.todo('loading requreid')
  // test('test condition', () => {
  //   const config = {
  //     required: 'C',
  //     'required-condition': {
  //       combine: '&&',
  //       conditions: [
  //         {
  //           left: { domain: '', field: 'extraMortality' },
  //           operator: 'empty',
  //           right: '',
  //         },
  //         {
  //           left: { domain: '', field: 'flatMortality' },
  //           operator: 'empty',
  //           right: '',
  //         },
  //       ],
  //     },
  //   };

  //   const renderer = renderHook(() => useCalculateLoadingRequired({ config, coverageId: '233' }));

  //   expect(renderer.result.current).not.toBeTruthy();
  // });
});
