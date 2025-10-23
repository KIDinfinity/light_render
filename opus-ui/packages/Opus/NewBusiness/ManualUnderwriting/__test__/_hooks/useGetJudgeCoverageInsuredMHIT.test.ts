import { renderHook } from '@testing-library/react-hooks';
import useGetJudgeCoverageInsuredMHITCallback from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetJudgeCoverageInsuredMHITCallback';

jest.mock('opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-id-1',
          coreCode: 'C',
          coverageInsuredList: [
            {
              clientId: 'client-1',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-id-1',
          coreCode: 'C',
          coverageInsuredList: [
            {
              clientId: 'client-1',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-id-1',
          coreCode: 'C',
          coverageInsuredList: [
            {
              clientId: 'client-1',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-id-1',
          coreCode: 'C',
          coverageInsuredList: [
            {
              clientId: 'client-1',
            },
          ],
        },
      ];
    });
});

jest.mock('opus/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => [
      {
        productCode: 'C',
        extProductType: 'PC_optional_product',
      },
    ])
    .mockImplementationOnce(() => [
      {
        productCode: 'C',
        extProductType: null,
      },
    ])
    .mockImplementationOnce(() => [
      {
        productCode: 'C',
        extProductType: 'PC_optional_product',
      },
    ])
    .mockImplementationOnce(() => [
      {
        productCode: 'C',
        extProductType: 'PC_optional_product',
      },
    ]);
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {
          'client-1': {
            isInterestMhit: 'Y',
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          'client-1': {
            isInterestMhit: 'Y',
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          'client-1': {
            isInterestMhit: 'Y',
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          'client-1': {
            isInterestMhit: 'N',
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          'client-1': {
            isInterestMhit: null,
          },
        };
      }),
  };
});
describe('useGetJudgeCoverageInsuredMHITCallback', () => {
  test('clientMHIT & matchPCOptionalProduct', () => {
    const renderer = renderHook(() =>
      useGetJudgeCoverageInsuredMHITCallback({
        id: 'coverage-id-1',
      })
    );
    const handler = renderer.result.current;
    const result = handler('C');
    expect(result).toBeTruthy();
  });

  test('clientMHIT & not matchPCOptionalProduct', () => {
    const renderer = renderHook(() =>
      useGetJudgeCoverageInsuredMHITCallback({
        id: 'coverage-id-1',
      })
    );
    const handler = renderer.result.current;
    const result = handler('C');
    expect(result).toBeTruthy();
  });

  test('clientMHIT is N & matchPCOptionalProduct', () => {
    const renderer = renderHook(() =>
      useGetJudgeCoverageInsuredMHITCallback({
        id: 'coverage-id-1',
      })
    );
    const handler = renderer.result.current;
    const result = handler('C');
    expect(result).not.toBeTruthy();
  });

  test('clientMHIT is null & matchPCOptionalProduct', () => {
    const renderer = renderHook(() =>
      useGetJudgeCoverageInsuredMHITCallback({
        id: 'coverage-id-1',
      })
    );
    const handler = renderer.result.current;
    const result = handler('C');
    expect(result).toBeTruthy();
  });
});
