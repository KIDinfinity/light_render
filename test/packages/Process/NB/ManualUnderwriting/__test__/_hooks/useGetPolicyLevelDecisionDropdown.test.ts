import { renderHook } from '@testing-library/react-hooks';
import useGetPolicyLevelDecisionDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyLevelDecisionDropdown';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'S',
            },
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'D',
            },
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '233',
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'S',
            },
          },
        },
        {
          id: '444',
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'S',
            },
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coverageDecision: {
            uwDecision: 'P',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coverageDecision: {
            uwDecision: 'D',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'NS',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'R',
            },
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: {
              value: 'NS',
            },
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'P',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
      ];
    })

    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'D',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
      ];
    });
});

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: (o: any) => {
        if (typeof o === 'object') {
          return o.value;
        }
        return o;
      },
    },
  };
});

describe('useGetPolicyLevelDecisionDropdown', () => {
  test('all coverage is is standard', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'A',
        dictName: 'Approve',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });
  test('basic plan is pospone', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
    ]);
  });

  test('basic plan is Deciline', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });

  test('any coverage is refer', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });
  test('any coverage is nonStandard', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'A',
        dictName: 'Approve',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });

  test('basic plan is not in  Pospone & Decline any rider is pospone', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'A',
        dictName: 'Approve',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });

  test('basic plan is not in  Pospone & Decline any rider is Decline', () => {
    const renderer = renderHook(() => useGetPolicyLevelDecisionDropdown());
    expect(renderer.result.current).toEqual([
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'A',
        dictName: 'Approve',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ]);
  });
});
