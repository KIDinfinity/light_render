import { renderHook } from '@testing-library/react-hooks';
import useChangeBenefitLevelDecisionCallback from 'process/NB/ManualUnderwriting/_hooks/useChangeBenefitLevelDecisionCallback';

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

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => [])
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'S',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: 'S',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'P',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: 'NS',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'S',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: 'S',
          },
        },
      ];
    })

    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: '',
          },
        },
      ];
    })

    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: 'R',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'A',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: '',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          id: '55',
          coverageDecision: {
            uwDecision: 'D',
          },
        },
        {
          isMain: 'N',
          id: '66',
          coverageDecision: {
            uwDecision: 'D',
          },
        },
      ];
    });
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetPolicyDecision', () => {
  return jest.fn(() => {});
});
let globalParams = {};

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: () => {
      return jest.fn((params) => {
        globalParams = params;
      });
    },
  };
});

describe('useAutoSetPolicyLevelDecisionByCoverage', () => {
  beforeEach(() => {
    globalParams = {};
  });
  test('all coverage decision is standard', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '666',
      uwDecision: 'S',
    });
    expect(globalParams).toEqual({
      type: 'manualUnderwriting/setPolicySection',
      payload: {
        changedFields: {
          decisionCode: 'A',
        },
      },
    });
  });
  test('basic plan is pospone', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '55',
      uwDecision: 'P',
    });
    expect(globalParams).toEqual({
      payload: {
        coverageList: [
          { coverageDecision: { uwDecision: 'P' }, id: '55', isMain: 'Y' },
          { coverageDecision: { uwDecision: 'P' }, id: '66', isMain: 'N' },
        ],
      },
      type: 'manualUnderwriting/updateCoverageListWhenHitSustainabilityChecking',
    });
  });
  test('basic plan is decline', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '55',
      uwDecision: 'D',
    });
    expect(globalParams).toEqual({
      payload: {
        coverageList: [
          { coverageDecision: { uwDecision: 'D' }, id: '55', isMain: 'Y' },
          { coverageDecision: { uwDecision: 'D' }, id: '66', isMain: 'N' },
        ],
      },
      type: 'manualUnderwriting/updateCoverageListWhenHitSustainabilityChecking',
    });
  });

  test('any plan is refer', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '66',
      uwDecision: 'R',
    });
    expect(globalParams).toEqual({
      type: 'manualUnderwriting/setPolicySection',
      payload: {
        changedFields: {
          decisionCode: '',
        },
      },
    });
  });

  test('any plan is standard', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '66',
      uwDecision: 'NS',
    });
    expect(globalParams).toEqual({
      type: 'manualUnderwriting/setPolicySection',
      payload: {
        changedFields: {
          decisionCode: '',
        },
      },
    });
  });

  test('basic plan is not in pospone & decline any rider is decline', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '66',
      uwDecision: 'D',
    });
    expect(globalParams).toEqual({
      type: 'manualUnderwriting/setPolicySection',
      payload: {
        changedFields: {
          decisionCode: '',
        },
      },
    });
  });

  test('basic plan is decline, but rider change to postpone', () => {
    const renderer = renderHook(() => useChangeBenefitLevelDecisionCallback());
    const handler = renderer.result.current;
    handler({
      id: '66',
      uwDecision: 'D',
    });
    expect(globalParams).toEqual({
      type: 'manualUnderwriting/setPolicySection',
      payload: {
        changedFields: {
          decisionCode: 'D',
        },
      },
    });
  });
});
