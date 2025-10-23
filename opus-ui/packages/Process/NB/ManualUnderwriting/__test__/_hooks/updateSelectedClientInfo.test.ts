import { renderHook } from '@testing-library/react-hooks';
import updateSelectedClientInfo from 'process/NB/ManualUnderwriting/_models/reducers/updateSelectedClientInfo';

describe('updateSelectedClientInfo', () => {
  test('update client info', () => {
    const state = {
      businessData: {
        fund: [],
        policyList: [
          {
            clientInfoList: [
              {
                id: 'origin-id',
                name: 'origin',
              },
              {
                id: 'gg',
                name: 'gg name',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        businessData: {
          policyList: [
            {
              clientInfoList: [
                {
                  id: 'origin-id',
                  name: 'new origin',
                },
                {
                  id: 'new',
                  name: 'unkown',
                },
              ],
            },
          ],
        },
      },
    };
    const renderer = renderHook(() => updateSelectedClientInfo(state, action));
    expect(renderer.result.current).toEqual({
      businessData: {
        fund: [],
        policyList: [
          {
            clientInfoList: [
              {
                id: 'origin-id',
                name: 'new origin',
              },
              {
                id: 'gg',
                name: 'gg name',
              },
            ],
          },
        ],
      },
    });
  });
});
