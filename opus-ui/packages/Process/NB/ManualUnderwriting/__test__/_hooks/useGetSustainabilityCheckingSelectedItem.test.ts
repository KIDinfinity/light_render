import { renderHook } from '@testing-library/react-hooks';
import useGetSustainabilityCheckingSelectedItem from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelectedItem';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingOptions', () => {
  return jest
    .fn(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return [
        {
          applicationNo: '0164589923',
          applied: 'Y',
          id: '2e07a774-a04e-4694-b09d-af28a4e7a891',
          optionName: 'reduceSA&increasePrem',
          policyId: '64589923',
          selectedOptions: [
            {
              items: [
                {
                  coverageId: '614fd158-ccfd-4798-8166-2c5eaf1a4be8',
                  sumAssuredAF: 3000,
                  sumAssuredBE: 5000,
                },
              ],
              name: 'reduceSA',
            },
            {
              items: [
                {
                  annualPremAF: 5000,
                  annualPremBE: 3000,
                  basePremiumAF: 5000,
                  basePremiumBE: 3000,
                  coverageId: 'a93183f7-636f-48f6-8eb3-f511af0f8d56',
                },
              ],
              name: 'increasePrem',
            },
          ],
          version: 1,
        },
        {
          applicationNo: '0164589923',
          applied: 'N',
          id: '01d581f7-3ee6-43d1-bed7-f9f694acd05c',
          optionName: 'reduceSA&RT',
          policyId: '64589923',
          selectedOptions: [
            {
              items: [
                {
                  coverageId: '212c57ec-5342-40ad-82b9-351558acddaa',
                  sumAssuredAF: 3000,
                  sumAssuredBE: 5000,
                },
              ],
              name: 'reduceSA',
            },
            {
              items: [
                {
                  basePremiumAF: 50,
                  basePremiumBE: 0,
                  coverageId: '3191cb1a-f44a-4a7a-b99a-c0df76dccbb8',
                },
              ],
              name: 'RT',
              rtCoverage: {
                basePremium: 50,
                coverageNo: '02',
                deleted: 0,
                id: '3191cb1a-f44a-4a7a-b99a-c0df76dccbb8',
                lifeNo: '01',
                productType: 'RT',
              },
            },
          ],
          version: 1,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          deleted: 0,
          policyId: 'BL065698',
          round: 1,
          sustainable: 'Y',
          applicationNo: '0130840005',
          selectedOptions: [
            {
              name: 'increasePrem',
              items: [
                {
                  basePremiumAF: 1950,
                  coverageId: '79fa9890-d5e8-47f0-b6f8-801dcee656c7',
                  basePremiumBE: 1000,
                },
                {
                  coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
                  annualPremAF: 20000,
                  annualPremBE: 17000,
                },
              ],
            },
          ],
          remark: '[]',
          id: '245d0700-de85-491a-a575-254f2623416d',
          optionName: 'increasePrem',
          version: 9,
        },
        {
          deleted: 0,
          policyId: 'BL065698',
          round: 3,
          sustainable: 'Y',
          applicationNo: '0130840005',
          selectedOptions: [
            {
              name: 'reduceSA',
              items: [
                {
                  coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
                  sumAssuredBE: 500000,
                  sumAssuredAF: 425000,
                },
              ],
            },
            {
              name: 'increasePrem',
              items: [
                {
                  basePremiumAF: 1660,
                  coverageId: '79fa9890-d5e8-47f0-b6f8-801dcee656c7',
                  basePremiumBE: 1000,
                },
                {
                  coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
                  annualPremAF: 17000,
                  annualPremBE: 17000,
                },
              ],
            },
            {
              name: 'increasePrem',
              items: [
                {
                  basePremiumAF: 2690,
                  coverageId: '79fa9890-d5e8-47f0-b6f8-801dcee656c7',
                  basePremiumBE: 1660,
                },
                {
                  coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
                  annualPremAF: 3600,
                  annualPremBE: 17000,
                },
              ],
            },
          ],
          remark: '[]',
          id: '315adf2c-45a7-4104-9463-f284ee47462c',
          optionName: 'reduceSA&increasePrem&increasePrem',
          version: 9,
        },
      ];
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelected', () => {
  return jest
    .fn(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return 'reduceSA&RT';
    })
    .mockImplementationOnce(() => {
      return 'reduceSA&increasePrem&increasePrem';
    });
});

describe('useGetSustainabilityCheckingSelectedItem', () => {
  test('get item', () => {
    const renderer = renderHook(() => {
      return useGetSustainabilityCheckingSelectedItem();
    });

    expect(renderer.result.current).toEqual({
      applicationNo: '0164589923',
      applied: 'N',
      id: '01d581f7-3ee6-43d1-bed7-f9f694acd05c',
      optionName: 'reduceSA&RT',
      policyId: '64589923',
      selectedOptions: [
        {
          items: [
            {
              coverageId: '212c57ec-5342-40ad-82b9-351558acddaa',
              sumAssuredAF: 3000,
              sumAssuredBE: 5000,
            },
          ],
          name: 'reduceSA',
        },
        {
          items: [
            {
              basePremiumAF: 50,
              basePremiumBE: 0,
              coverageId: '3191cb1a-f44a-4a7a-b99a-c0df76dccbb8',
            },
          ],
          name: 'RT',
          rtCoverage: {
            basePremium: 50,
            coverageNo: '02',
            deleted: 0,
            id: '3191cb1a-f44a-4a7a-b99a-c0df76dccbb8',
            lifeNo: '01',
            productType: 'RT',
          },
        },
      ],
      version: 1,
    });
  });

  test('test duplicate operation', () => {
    const renderer = renderHook(() => {
      return useGetSustainabilityCheckingSelectedItem();
    });

    expect(renderer.result.current).toEqual({
      deleted: 0,
      policyId: 'BL065698',
      round: 3,
      sustainable: 'Y',
      applicationNo: '0130840005',
      selectedOptions: [
        {
          name: 'reduceSA',
          items: [
            {
              coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
              sumAssuredBE: 500000,
              sumAssuredAF: 425000,
            },
          ],
        },
        {
          name: 'increasePrem',
          items: [
            {
              basePremiumAF: 2690,
              coverageId: '79fa9890-d5e8-47f0-b6f8-801dcee656c7',
              basePremiumBE: 1660,
            },
            {
              coverageId: '8a5cf1df-537a-4261-9697-b4f03977cd1f',
              annualPremAF: 3600,
              annualPremBE: 17000,
            },
          ],
        },
      ],
      remark: '[]',
      id: '315adf2c-45a7-4104-9463-f284ee47462c',
      optionName: 'reduceSA&increasePrem&increasePrem',
      version: 9,
    });
  });
});
