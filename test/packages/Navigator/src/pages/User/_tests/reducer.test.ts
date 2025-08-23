import reducers from '../_models/reducers';
import { initialState } from '../_models/state';

describe('user reducers', () => {
  // it('changeShowTable', () => {
  //   expect(
  //     reducers.changeShowTable(initialState, {
  //       payload: {
  //         isShowAddForm: false,
  //       },
  //     })
  //   ).toEqual(initialState);
  // });

  // it('clearCertificate', () => {
  //   expect(
  //     reducers.clearCertificate({
  //       ...initialState,
  //       getUserManagement: {
  //         ...initialState.getUserManagement,
  //         userCertificateList: [],
  //       },
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     getUserManagement: {
  //       ...initialState.getUserManagement,
  //       userCertificateList: [],
  //     },
  //     newCertificateTable: [],
  //     isShowAddForm: true,
  //     isRequired: false,
  //   });
  // });

  // it('saveRoleData', () => {
  //   expect(
  //     reducers.saveRoleData(initialState, {
  //       payload: {
  //         roleData: [],
  //       },
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     roleData: [],
  //   });
  // });

  it('saveUserPersonalInfo', () => {
    expect(
      reducers.saveUserPersonalInfo(initialState, {
        payload: {
          changedFields: {
            firstName: {
              value: 'Issac',
              name: 'firstName',
              touched: true,
              dirty: false,
              validating: false,
            },
          },
        },
      })
    ).toEqual({
      ...initialState,
      getUserManagement: {
        userPersonInfo: {
          firstName: {
            value: 'Issac',
            name: 'firstName',
            touched: true,
            dirty: false,
            validating: false,
          },
        },
        organizationList: {
          firstName: {
            value: 'Issac',
            name: 'firstName',
            touched: true,
            dirty: false,
            validating: false,
          },
        },
        userCertificateList: [],
        skillSet: {
          skillTypeList: [],
        },
      },
    });
  });
});
