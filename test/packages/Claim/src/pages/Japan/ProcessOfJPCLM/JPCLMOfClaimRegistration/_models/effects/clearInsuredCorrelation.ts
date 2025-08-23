export default function* clearInsuredCorrelation(_: any, { put }: any) {
    yield put({
        type: 'saveInsuredList',
        payload: [],
      });
      yield put({
        type: 'clearPolicyItem',
      });
      yield put({
        type: 'saveInsured',
        payload: {
          changedFields: {
            address: '',
            postCode: '',
            phoneNo: '',
            insuredId: '',
            partyId: '',
          },
        },
      });
}