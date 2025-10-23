import useGetProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetProductDicts';
import { renderHook } from '@testing-library/react-hooks';

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
          basicPlanProductFeatureList: [
            {
              productCode: 'A',
              productName: 'product one',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          otherPlanProductFeatureList: [
            {
              productCode: 'rider',
              productName: 'rider product',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          basicPlanProductFeatureList: [
            {
              productCode: 'B',
              productName: 'product B',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          basicPlanProductFeatureList: [
            {
              id: '1',
              productCode: 'B',
              productName: 'product B',
            },
            {
              id: '2',
              productCode: 'B',
              productName: 'product B',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          basicPlanProductFeatureList: [
            {
              id: '1',
              productCode: 'B',
              productName: 'product B',
              applicableToRole: 'PO',
            },
            {
              id: '2',
              productCode: 'C',
              productName: 'product C',
              applicableToRole: 'PI',
            },
            {
              id: '3',
              productCode: 'D',
              productName: 'product D',
              applicableToRole: 'SI',
            },
            {
              id: '5',
              productCode: 'E',
              productName: 'product E',
              applicableToRole: 'SI,PO',
            },
            {
              id: '6',
              productCode: 'F',
              productName: 'product F',
              applicableToRole: 'SI,PO,PI',
            },
            {
              id: '7',
              productCode: 'G',
              productName: 'product G',
              applicableToRole: 'SI,PI',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          otherPlanProductFeatureList: [
            {
              id: '1',
              productCode: 'B',
              productName: 'product B',
              applicableToRole: 'PO',
            },
            {
              id: '2',
              productCode: 'C',
              productName: 'product C',
              applicableToRole: 'PI',
            },
            {
              id: '3',
              productCode: 'D',
              productName: 'product D',
              applicableToRole: 'SI',
            },
            {
              id: '5',
              productCode: 'E',
              productName: 'product E',
              applicableToRole: 'SI,PO',
            },
            {
              id: '6',
              productCode: 'F',
              productName: 'product F',
              applicableToRole: 'SI,PO,PI',
            },
            {
              id: '7',
              productCode: 'G',
              productName: 'product G',
              applicableToRole: 'SI,PI',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          otherPlanProductFeatureList: [
            {
              id: '1',
              productCode: 'B',
              productName: 'product B',
              applicableToRole: 'PO',
            },
            {
              id: '2',
              productCode: 'C',
              productName: 'product C',
              applicableToRole: 'PI',
            },
            {
              id: '3',
              productCode: 'D',
              productName: 'product D',
              applicableToRole: 'SI',
            },
            {
              id: '5',
              productCode: 'E',
              productName: 'product E',
              applicableToRole: 'SI,PO',
            },
            {
              id: '6',
              productCode: 'F',
              productName: 'product F',
              applicableToRole: 'SI,PO,PI',
            },
            {
              id: '7',
              productCode: 'G',
              productName: 'product G',
              applicableToRole: 'SI,PI',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {}),
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => 'Y')
    .mockImplementationOnce(() => 'N')
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => 'Y')
    .mockImplementationOnce(() => 'Y')
    .mockImplementationOnce(() => 'N')
    .mockImplementationOnce(() => 'N')
    .mockImplementationOnce(() => 'N');
});
// jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredClientIds', () => {
//   return jest.fn(() => {
//     return []
//   })
// })

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredRoles', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [];
    })

    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return ['CUS002'];
    })
    .mockImplementationOnce(() => {
      return ['CUS002'];
    })
    .mockImplementationOnce(() => {
      return ['CUS001'];
    })
    .mockImplementationOnce(() => {
      return ['CUS001'];
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useJudgeInsuredIsPI', () => {
  return jest
    .fn(() => {
      return false;
    })
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => false);
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetRelatedRider', () => {
  return jest.fn(() => {
    return [];
  });
});
describe('test useGetProductDicts', () => {
  test('get main products', () => {
    const renderer = renderHook(() => useGetProductDicts({ id: '233' }));
    expect(renderer.result.current).toEqual([
      {
        productCode: 'A',
        productName: 'product one',
      },
    ]);
  });
  test('get rider products', () => {
    const renderer = renderHook(() => useGetProductDicts({ id: '66' }));
    expect(renderer.result.current).toEqual([
      {
        productCode: 'rider',
        productName: 'rider product',
      },
    ]);
  });
  test('paper submission get products', () => {
    const renderer = renderHook(() => useGetProductDicts({ id: '100' }));
    expect(renderer.result.current).toEqual([
      {
        productCode: 'B',
        productName: 'product B',
      },
    ]);
  });

  test('test duplicate', () => {
    const renderer = renderHook(() => useGetProductDicts({ id: '100' }));
    expect(renderer.result.current).toEqual([
      {
        id: '1',
        productCode: 'B',
        productName: 'product B',
      },
    ]);
  });

  test('test applicableToRole when insured is PolicyOwner, isMain = Y', () => {
    const renderer = renderHook(() =>
      useGetProductDicts({
        id: '100',
      })
    );

    expect(renderer.result.current).toEqual([
      {
        id: '1',
        productCode: 'B',
        productName: 'product B',
        applicableToRole: 'PO',
      },
      {
        id: '2',
        productCode: 'C',
        productName: 'product C',
        applicableToRole: 'PI',
      },
      {
        id: '5',
        productCode: 'E',
        productName: 'product E',
        applicableToRole: 'SI,PO',
      },
      {
        id: '6',
        productCode: 'F',
        productName: 'product F',
        applicableToRole: 'SI,PO,PI',
      },
      {
        id: '7',
        productCode: 'G',
        productName: 'product G',
        applicableToRole: 'SI,PI',
      },
    ]);
  });

  test('test applicableToRole when insured is PolicyOwner, PI', () => {
    const renderer = renderHook(() =>
      useGetProductDicts({
        id: '100',
      })
    );

    expect(renderer.result.current).toEqual([
      {
        id: '1',
        productCode: 'B',
        productName: 'product B',
        applicableToRole: 'PO',
      },
      {
        id: '5',
        productCode: 'E',
        productName: 'product E',
        applicableToRole: 'SI,PO',
      },
      {
        id: '6',
        productCode: 'F',
        productName: 'product F',
        applicableToRole: 'SI,PO,PI',
      },
    ]);
  });

  test('test applicableToRole when insured is not PolicyOwner, not PI', () => {
    const renderer = renderHook(() =>
      useGetProductDicts({
        id: '100',
      })
    );

    expect(renderer.result.current).toEqual([
      {
        id: '3',
        productCode: 'D',
        productName: 'product D',
        applicableToRole: 'SI',
      },
      {
        id: '5',
        productCode: 'E',
        productName: 'product E',
        applicableToRole: 'SI,PO',
      },
      {
        id: '6',
        productCode: 'F',
        productName: 'product F',
        applicableToRole: 'SI,PO,PI',
      },
      {
        id: '7',
        productCode: 'G',
        productName: 'product G',
        applicableToRole: 'SI,PI',
      },
    ]);
  });
});
