import { renderHook } from '@testing-library/react-hooks';
import useGetSomeInsuredUnderage from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSomeInsuredUnderage';

jest.mock(
  'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetDefaultJuvenileAgeRange',
  () => {
    return jest.fn(() => {
      return [0, 17];
    });
  }
);

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {})
      .mockImplementationOnce(() => {
        return {
          '1': {
            personalInfo: {
              customerRole: ['CUS005'],
              customerAge: 1,
            },
          },
          '3': {
            personalInfo: {
              customerRole: ['CUS002', 'CUS001'],
              customerAge: 1,
            },
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          '1': {
            personalInfo: {
              customerRole: ['CUS005'],
              customerAge: 1,
            },
          },
          '3': {
            personalInfo: {
              customerRole: ['CUS001', 'CUS002'],
              customerAge: 1,
            },
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          '1': {
            personalInfo: {
              customerRole: ['CUS005'],
              customerAge: 1,
            },
          },
          '3': {
            personalInfo: {
              customerRole: ['CUS003'],
              customerAge: 18,
            },
          },
        };
      }),
  };
});
describe('useGetSomeInsuredUnderage', () => {
  test('policyOwner & Insured & match age', () => {
    const renderer = renderHook(() => {
      return useGetSomeInsuredUnderage({
        clientId: '1',
        readOnly: false,
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });
  test('id is policyOwner & insured & match age', () => {
    const renderer = renderHook(() => {
      return useGetSomeInsuredUnderage({
        clientId: '3',
        readOnly: false,
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('id not policyOwner & insured & not match age', () => {
    const renderer = renderHook(() => {
      return useGetSomeInsuredUnderage({
        clientId: '1',
        readOnly: false,
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('not policyOwner & insured & match age', () => {
    const renderer = renderHook(() => {
      return useGetSomeInsuredUnderage({
        clientId: '3',
        readOnly: false,
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
