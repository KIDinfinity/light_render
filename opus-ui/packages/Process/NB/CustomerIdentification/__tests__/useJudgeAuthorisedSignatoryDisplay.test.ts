import { renderHook } from '@testing-library/react-hooks';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/CustomerIdentification/_hooks/useJudgeAuthorisedSignatoryDisplay';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return [];
      })
      .mockImplementationOnce(() => {
        return [
          {
            dictCode: 'CUS011',
            dictName: 'AuthorisedSignatory',
            display: 'Y',
          },
        ];
      }),
  };
});

describe('useJudgeAuthorisedSignatoryDisplay', () => {
  test('match AuthorisedSignatory', () => {
    const item = {
      customerType: 'C',
      roleList: [
        {
          customerRole: 'CUS011',
        },
        {
          customerRole: 'CUS002',
        },
      ],
    };
    const renderer = renderHook(() => useJudgeAuthorisedSignatoryDisplay());

    const handler = renderer.result.current;
    const result = handler({
      item,
    });

    expect(result).toBeTruthy();
  });
});
