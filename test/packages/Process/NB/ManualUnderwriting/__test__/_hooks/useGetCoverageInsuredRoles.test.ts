import useGetCoverageInsuredRoles from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredRoles';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'insured-1',
          roleList: [
            {
              customerRole: 'CUS001',
            },
            {
              customerRole: 'CUS003',
            },
          ],
        },
        {
          id: 'insured-2',
          roleList: [
            {
              customerRole: 'CUS001',
            },
            {
              customerRole: 'CUS002',
            },
          ],
        },
      ];
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-1',
          coverageInsuredList: [
            {
              clientId: 'insured-1',
              id: '1',
            },
            {
              clientId: 'insured-2',
              id: '2',
            },
          ],
        },
      ];
    });
});

describe('useGetCoverageInsuredRoles', () => {
  test('get roles', () => {
    const renderer = renderHook(() => {
      return useGetCoverageInsuredRoles({ coverageId: 'coverage-1' });
    });
    expect(renderer.result.current).toEqual(['CUS001', 'CUS003', 'CUS002']);
  });
});
