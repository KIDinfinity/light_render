import { renderHook } from '@testing-library/react-hooks';
import useJudgeClientItemMisMatchClient from 'process/NB/CustomerIdentification/_hooks/useJudgeClientItemMisMatchClient';

describe('useJudgeClientItemMisMatchClient', () => {
  test('mismatch client', () => {
    const item = {
      identificationList: [
        {
          clientTag: 'Mismatch',
        },
      ],
    };

    const renderer = renderHook(() => useJudgeClientItemMisMatchClient({ item }));

    expect(renderer.result.current).toBeTruthy();
  });

  test('fullyMatch client', () => {
    const item = {
      identificationList: [
        {
          clientTag: 'FullyMatch',
        },
      ],
    };

    const renderer = renderHook(() => useJudgeClientItemMisMatchClient({ item }));

    expect(renderer.result.current).not.toBeTruthy();
  });
});
