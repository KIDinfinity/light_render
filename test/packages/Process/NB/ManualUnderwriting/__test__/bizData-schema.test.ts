import bizDataSchema from '../bizData-schema';
import { Validator } from 'jsonschema';
const validator = new Validator();
import lodash from 'lodash';

describe('bizData-schema', () => {
  test('miss policyList', () => {
    const result = validator.validate(
      {
        id: 'test policy',
      },
      bizDataSchema
    );
    expect(result.valid).not.toBeTruthy();
    expect(
      lodash
        .chain(result)
        .get('errors', [])
        .some((item: any) => item.message === 'requires property "policyList"')
        .value()
    ).toBeTruthy();
  });

  test('policyList is null', () => {
    const result = validator.validate(
      {
        policyList: null,
      },
      bizDataSchema
    );
    expect(
      lodash
        .chain(result)
        .get('errors', [])
        .some((item: any) => {
          return item?.stack === 'instance.policyList is not of a type(s) array';
        })
        .value()
    ).toBeTruthy();
    expect(result.valid).not.toBeTruthy();
  });

  // test('miss addressList', () => {
  //   const result = validator.validate(
  //     {
  //       policyList: [
  //         {
  //           clientInfoList: [{}],
  //         },
  //       ],
  //     },
  //     bizDataSchema
  //   );
  //   expect(
  //     lodash
  //       .chain(result)
  //       .get('errors', [])
  //       .some((item: any) => {
  //         return (
  //           item?.stack ===
  //           'instance.policyList[0].clientInfoList[0] requires property "addressList"'
  //         );
  //       })
  //       .value()
  //   ).toBeTruthy();
  //   expect(result.valid).not.toBeTruthy();
  // });

  test('miss coverageList', () => {
    const result = validator.validate(
      {
        policyList: [
          {
            clientInfoList: [],
          },
        ],
      },
      bizDataSchema
    );
    expect(
      lodash
        .chain(result)
        .get('errors', [])
        .some((item: any) => {
          return item.stack === 'instance.policyList[0] requires property "coverageList"';
        })
        .value()
    ).toBeTruthy();
    expect(result.valid).not.toBeTruthy();
  });

  test('miss customerRole', () => {
    const result = validator.validate(
      {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                addressList: [{}],
                roleList: [
                  {
                    id: '233',
                  },
                ],
              },
            ],
            coverageList: [
              {
                id: '66',
              },
            ],
          },
        ],
      },
      bizDataSchema
    );
    expect(
      lodash
        .chain(result)
        .get('errors', [])
        .some(
          (item: any) =>
            item.stack ==
            'instance.policyList[0].clientInfoList[0].roleList[0] requires property "customerRole"'
        )
        .value()
    ).toBeTruthy();
    expect(result.valid).not.toBeTruthy();
  });
  test('data pass validate', () => {
    const result = validator.validate(
      {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                addressList: [{}],
                roleList: [
                  {
                    id: '233',
                    customerRole: 'CUS003',
                  },
                ],
              },
            ],
            coverageList: [
              {
                id: '66',
              },
            ],
          },
        ],
      },
      bizDataSchema
    );

    expect(result.valid).toBeTruthy();
  });
});
