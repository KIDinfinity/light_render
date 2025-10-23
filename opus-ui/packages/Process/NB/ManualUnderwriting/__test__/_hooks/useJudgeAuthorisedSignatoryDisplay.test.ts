import { renderHook } from '@testing-library/react-hooks';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeAuthorisedSignatoryDisplay';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return [
          {
            dictCode: 'CUS002',
            dictName: 'Certificate Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS005',
            dictName: 'Contribution Payor',
            display: 'Y',
          },
          {
            dictCode: 'CUS001',
            dictName: 'Person Covered',
            display: 'Y',
          },
          {
            dictCode: 'CUS007',
            dictName: 'Beneficial Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS003',
            dictName: 'Beneficiary',
            display: 'Y',
          },
          {
            dictCode: 'CUS011',
            dictName: 'Authorised Signatory',
            display: 'Y',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            dictCode: 'CUS002',
            dictName: 'Certificate Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS005',
            dictName: 'Contribution Payor',
            display: 'Y',
          },
          {
            dictCode: 'CUS001',
            dictName: 'Person Covered',
            display: 'Y',
          },
          {
            dictCode: 'CUS007',
            dictName: 'Beneficial Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS003',
            dictName: 'Beneficiary',
            display: 'Y',
          },
          {
            dictCode: 'CUS011',
            dictName: 'Authorised Signatory',
            display: 'Y',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            dictCode: 'CUS002',
            dictName: 'Certificate Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS005',
            dictName: 'Contribution Payor',
            display: 'Y',
          },
          {
            dictCode: 'CUS001',
            dictName: 'Person Covered',
            display: 'Y',
          },
          {
            dictCode: 'CUS007',
            dictName: 'Beneficial Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS003',
            dictName: 'Beneficiary',
            display: 'Y',
          },
          {
            dictCode: 'CUS011',
            dictName: 'Authorised Signatory',
            display: 'Y',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            dictCode: 'CUS002',
            dictName: 'Certificate Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS005',
            dictName: 'Contribution Payor',
            display: 'Y',
          },
          {
            dictCode: 'CUS001',
            dictName: 'Person Covered',
            display: 'Y',
          },
          {
            dictCode: 'CUS007',
            dictName: 'Beneficial Owner',
            display: 'Y',
          },
          {
            dictCode: 'CUS003',
            dictName: 'Beneficiary',
            display: 'Y',
          },
        ];
      }),
  };
});

describe('useJudgeAuthorisedSignatoryDisplay', () => {
  test('match item', () => {
    const item = {
      customerType: 'C',
      roleList: [{ customerRole: 'CUS002' }],
    };
    const renderer = renderHook(() => useJudgeAuthorisedSignatoryDisplay({ item }));

    expect(renderer.result.current).toBeTruthy();
  });
  test('match item, but wrongful policy role', () => {
    const item = {
      customerType: 'C',
      roleList: [{ customerRole: 'CUS003' }, { customerRole: 'CUS001' }],
    };
    const renderer = renderHook(() => useJudgeAuthorisedSignatoryDisplay({ item }));

    expect(renderer.result.current).toBeFalsy();
  });
  test('match role, but type is not match', () => {
    const item = {
      customerType: 'P',
    };
    const renderer = renderHook(() => useJudgeAuthorisedSignatoryDisplay({ item }));

    expect(renderer.result.current).toBeFalsy();
  });
  test('role & type are not match', () => {
    const item = {
      customerType: 'P',
    };
    const renderer = renderHook(() => useJudgeAuthorisedSignatoryDisplay({ item }));

    expect(renderer.result.current).toBeFalsy();
  });
});
