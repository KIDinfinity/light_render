import { renderHook } from '@testing-library/react-hooks';
import useCalcChargedDateMaxValue from 'process/MYCLM/ManualAssessment/_hooks/useCalcChargedDateMaxValue';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          dateOfDischarge: '2023-04-18T16:00:00.000+0000',
          dateOfAdmission: '2023-04-15T16:00:00.000+0000',
        };
      })
      .mockImplementationOnce(() => {
        return {
          dateOfDischarge: '2023-04-15T16:00:00.000+0000',
          dateOfAdmission: '2023-04-18T16:00:00.000+0000',
        };
      })
      .mockImplementationOnce(() => {
        return {
          dateOfDischarge: null,
          dateOfAdmission: undefined,
        };
      }),
  };
});

describe('useCalcChargedDateMaxValue', () => {
  test('dateOfDischarge & dateOfAdmission are date string', () => {
    const renderer = renderHook(() => {
      return useCalcChargedDateMaxValue({
        treatmentI: '2333',
      });
    });

    expect(renderer.result.current).toEqual(4);
  });

  test('dateOfDischarge & dateOfAdmission are date string, dateOfDischarge < dateOfAdmission ', () => {
    const renderer = renderHook(() => {
      return useCalcChargedDateMaxValue({
        treatmentI: '2333',
      });
    });

    expect(renderer.result.current).toEqual(0);
  });

  test('dateOfDischarge & dateOfAdmission  not date', () => {
    const renderer = renderHook(() => {
      return useCalcChargedDateMaxValue({
        treatmentI: '2333',
      });
    });

    expect(renderer.result.current).toEqual(1);
  });
});
