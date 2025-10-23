import { renderHook } from '@testing-library/react-hooks';
import useGetSectionOrder from 'summary/hooks/useGetSectionOrder';

jest.mock('summary/hooks/useGetSummarySectionConfig', () => {
  return jest.fn(() => {
    return [
      {
        sectionId: 'policyNo',
        dataId: 'policy',
        orderNo: 1,
        defaultExpand: true,
      },
      {
        sectionId: 'planInfo',
        dataId: 'policy',
        orderNo: 2,
        defaultExpand: true,
      },
      {
        sectionId: 'decision',
        dataId: 'policy',
        orderNo: 3,
        defaultExpand: true,
      },
      {
        sectionId: 'client',
        dataId: 'policy',
        orderNo: 4,
        defaultExpand: false,
      },
      {
        sectionId: 'loan',
        dataId: 'policy',
        orderNo: 5,
        defaultExpand: false,
      },
      {
        sectionId: 'fund',
        dataId: 'policy',
        orderNo: 6,
        defaultExpand: false,
      },
      {
        sectionId: 'policyReplacement',
        dataId: 'policy',
        orderNo: 7,
        defaultExpand: false,
      },
      {
        sectionId: 'distributionchannel',
        dataId: 'policy',
        orderNo: 8,
        defaultExpand: false,
      },
    ];
  });
});

describe('useGetSectionOrder', () => {
  test('get order by section', () => {
    const renderer = renderHook(() => useGetSectionOrder({ section: 'decision' }));
    expect(renderer.result.current).toEqual(3);
  });

  test('get order by section', () => {
    const renderer = renderHook(() => useGetSectionOrder({ section: 'decision' }));
    expect(renderer.result.current).toEqual(3);
  });
});
