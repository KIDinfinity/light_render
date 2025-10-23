import { renderHook } from '@testing-library/react-hooks';
import useGetMWCoverageClientNameDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetMWCoverageClientNameDropdown';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredClientIds', () => {
  return jest.fn().mockImplementationOnce(() => {
    return ['insured-client-1', 'insured-client-2'];
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback', () => {
  return jest.fn(() => {
    return ({ clientInfo }: any) => {
      return clientInfo.name;
    };
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest.fn(() => {
    return [
      {
        id: 'insured-client-1',
        name: 'inaured1',
      },
      {
        id: 'insured-client-2',
        name: 'insured2',
      },
      {
        id: 'insured-client-3',
        name: 'insured3',
      },
    ];
  });
});
describe('useGetMWCoverageClientNameDropdown', () => {
  test('get name dropdown ', () => {
    const renderer = renderHook(() => useGetMWCoverageClientNameDropdown());

    expect(renderer.result.current).toEqual([
      {
        dictCode: 'insured-client-1',
        dictName: 'inaured1',
      },
      {
        dictCode: 'insured-client-2',
        dictName: 'insured2',
      },
    ]);
  });
});
