export default {
  id: 'bizData-schema',
  type: 'object',
  properties: {
    policyList: {
      type: 'array',
      items: {
        properties: {
          clientInfoList: {
            type: 'array',
            items: {
              properties: {
                // addressList: {
                //   type: 'array',
                //   properties: {
                //     id: {
                //       type: 'string',
                //     },
                //   },
                //   required: ['id'],
                // },
                id: {
                  type: 'string',
                },
                roleList: {
                  type: 'array',
                  items: {
                    properties: {
                      id: {
                        type: 'string',
                      },
                      customerRole: {
                        type: 'string',
                      },
                    },
                    required: ['customerRole'],
                  },
                },
              },
              required: ['id'],
            },
          },
          coverageList: {
            type: 'array',
            items: {
              properties: {
                id: {
                  type: 'string',
                },
              },
              required: ['id'],
            },
          },
        },
        required: ['clientInfoList', 'coverageList'],
      },
    },
  },
  required: ['policyList'],
};
