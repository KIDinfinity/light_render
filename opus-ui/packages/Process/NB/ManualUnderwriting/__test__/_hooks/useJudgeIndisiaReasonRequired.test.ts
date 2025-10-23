import { renderHook } from '@testing-library/react-hooks';
import useJudgeIndisiaReasonRequired from 'process/NB/ManualUnderwriting/_hooks/useJudgeIndisiaReasonRequired';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return 'RI';
      })
      .mockImplementationOnce(() => {
        return 'AA';
      })
      .mockImplementationOnce(() => {
        return 'AA';
      }),
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest.fn(() => {
    return [
      {
        id: '233',
        nationality: 'RI',
        usTaxFlag: 'N',
        crtInfoList: [{ type: 'P', ctfCountryCode: 'RI' }],
        contactInfoList: [{ countryCode: '055' }, { countryCode: '055' }],
        addressList: [{ country: 'RI' }, { country: 'RI' }],
      },
      {
        id: '111',
        nationality: 'RI',
        usTaxFlag: 'Y',
        crtInfoList: [{ type: 'P', ctfCountryCode: 'RI' }],
        contactInfoList: [{ countryCode: '055' }, { countryCode: '055' }],
        addressList: [{ country: 'RI' }, { country: 'RI' }],
      },
    ];
  });
});

describe('useJudgeIndisiaReasonRequired', () => {
  test('All country fields are RI', () => {
    const renderer = renderHook(() => {
      return useJudgeIndisiaReasonRequired({
        id: '233',
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
  test('The presence of the country field is not RI && usTaxFlag is N', () => {
    const renderer = renderHook(() => {
      return useJudgeIndisiaReasonRequired({
        id: '233',
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });
  test('The presence of the country field is not RI && usTaxFlag is Y', () => {
    const renderer = renderHook(() => {
      return useJudgeIndisiaReasonRequired({
        id: '111',
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
