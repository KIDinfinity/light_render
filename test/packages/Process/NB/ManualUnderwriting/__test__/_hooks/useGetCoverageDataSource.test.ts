import { renderHook } from '@testing-library/react-hooks';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetIncreasedCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => [])
    .mockImplementationOnce(() => {
      return [
        {
          jointLifeNo: null,
          sinceCertificateYear: null,
          id: '1',
        },
        {
          jointLifeNo: '01',
          sinceCertificateYear: null,
          id: '2',
        },
      ];
    });
});
jest.mock(
  'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus',
  () => {
    return jest
      .fn(() => {
        return {
          checking: false,
        };
      })
      .mockImplementationOnce(() => {
        return { checking: false };
      })
      .mockImplementationOnce(() => {
        return { checking: true };
      });
  }
);
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          jointLifeNo: '00',
          id: '1',
        },
        {
          jointLifeNo: '01',
          id: '2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [];
    });
});
describe('useGetCoverageDataSource', () => {
  test('from main page, joint life no = 00', () => {
    const renderer = renderHook(() => useGetCoverageDataSource());
    expect(renderer.result.current).toEqual([
      {
        jointLifeNo: '00',
        id: '1',
      },
    ]);
  });
  test('from sustainability checking data, joint life no = null', () => {
    const renderer = renderHook(() => useGetCoverageDataSource());

    expect(renderer.result.current).toEqual([
      {
        jointLifeNo: null,
        sinceCertificateYear: null,
        id: '1',
      },
    ]);
  });
});
