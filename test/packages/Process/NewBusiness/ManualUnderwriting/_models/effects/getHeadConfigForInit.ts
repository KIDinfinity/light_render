import getCommonCaseCategoryAndActivityCode from 'basic/components/Elements/getCommonCaseCategoryAndActivityCode';
interface IParams {
  payload: {
    caseCategory: string;
    taskDetail: any;
  };
}

export default function* ({ payload }: IParams, { put }: any) {
  const { caseCategory, taskDetail } = payload || {};
  const mappingKey = getCommonCaseCategoryAndActivityCode({
    caseCategory,
    activityCode: taskDetail?.activityKey,
  });
  const mapTaskDetail = {
    caseCategory: mappingKey?.caseCategory,
    taskDefKey: mappingKey?.activityCode,
  };
  yield put({
    type: 'atomConfig/loadAtomGroup',
    payload: {
      atomGroupCode: `${mappingKey?.caseCategory}_BP_NB_ACT004`,
      taskDetail: mapTaskDetail,
    },
  });

  yield put({
    type: 'atomConfig/loadAtomGroup',
    payload: {
      atomGroupCode: `${mappingKey?.caseCategory}_BP_NB_ACT004_disable_condition`,
      taskDetail: mapTaskDetail,
    },
  });
}
