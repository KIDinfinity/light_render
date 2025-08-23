import { renderHook } from '@testing-library/react-hooks';
import useGetCurrentBeneficiaryUnderage from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCurrentBeneficiaryUnderage';

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
              customerRole: ['CUS003'],
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
describe('useGetCurrentBeneficiaryUnderage', () => {
  test('id not beneficiary & match age', () => {
    const renderer = renderHook(() => {
      return useGetCurrentBeneficiaryUnderage({
        clientId: '1',
        readOnly: false,
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
  test('id is beneficiary & match age', () => {
    const renderer = renderHook(() => {
      return useGetCurrentBeneficiaryUnderage({
        clientId: '3',
        readOnly: false,
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });

  test('id not beneficiary & not match age', () => {
    const renderer = renderHook(() => {
      return useGetCurrentBeneficiaryUnderage({
        clientId: '1',
        readOnly: false,
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
