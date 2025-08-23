import { renderHook } from '@testing-library/react-hooks';
import useCalcSectionColSpan from 'process/NB/ManualUnderwriting/_hooks/useCalcSectionColSpan';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              loanProtection: 'Y',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              loanProtection: 'N',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              loanProtection: null,
            },
          ],
        };
      }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return true;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return true;
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useJudgeDisplayTakeOverSection', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return true;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return false;
    });
});

jest.mock('@/components/Tenant', () => {
  return {
    tenant: {
      region: jest.fn(() => {
        return 'MY';
      }),
    },
    Region: {
      VN: 'VN',
    },
  };
});

describe('useCalcSectionColSpan', () => {
  test('cal section col span_allTrue', () => {
    const renderer = renderHook(() => useCalcSectionColSpan());
    expect(renderer.result.current).toEqual({
      loan: 12,
      fund: 12,
      takeOver: 12,
      policyReplacement: 12,
      voiceRecord: 0,
    });
  });
  test('cal section col span_no_loan_fund_takeover', () => {
    const renderer = renderHook(() => useCalcSectionColSpan());
    expect(renderer.result.current).toEqual({
      loan: 0,
      fund: 0,
      takeOver: 0,
      policyReplacement: 24,
      voiceRecord: 0,
    });
  });
  test('cal section col span_no_loan_takeOver', () => {
    const renderer = renderHook(() => useCalcSectionColSpan());
    expect(renderer.result.current).toEqual({
      loan: 0,
      fund: 12,
      takeOver: 0,
      policyReplacement: 12,
      voiceRecord: 0,
    });
  });
});
