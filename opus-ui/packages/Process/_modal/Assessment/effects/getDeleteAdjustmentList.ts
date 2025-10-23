import lodash from 'lodash';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';

enum EDeleteAdjustmentListType {
  treatment = 'T',
  procedure = 'P',
}

type IGetNewDeleteAdjustmentList = {
  originMap: any[];
  currenttMap: any[];
  type: EDeleteAdjustmentListType.treatment | EDeleteAdjustmentListType.procedure | null;
};

type IDeletAdjustmentItem = {
  claimNo: string;
  originalClaimNo: string;
  originAdjustmentId: string;
  category: IGetNewDeleteAdjustmentList['type'];
};

type IAdjustmentMap = {
  isAdjustment: 'Y' | 'N' | null | undefined;
};

const getIsAdjustmentMapId = (map: IAdjustmentMap[] = []) => {
  return lodash
    .chain(map)
    .filter((item) => isAdjustmentFun(item?.isAdjustment))
    .map('id')
    .value();
};

const getNewDeleteAdjustmentList = ({
  originMap = [],
  currenttMap = [],
  type = null,
}: IGetNewDeleteAdjustmentList): IDeletAdjustmentItem[] => {
  if (!type) return [];

  const deleteAdjustmentListId = lodash.difference(
    getIsAdjustmentMapId(originMap),
    getIsAdjustmentMapId(currenttMap)
  );

  return lodash.map(deleteAdjustmentListId, (id) => {
    const { claimNo, originClaimNo, originAdjustmentId } = originMap?.[id] || {};
    return {
      claimNo,
      originClaimNo,
      originAdjustmentId,
      category: type,
    };
  });
};

export default function* getDeleteAdjustmentList({ payload }: any, { select }: any) {
  const { nameSpace } = payload;

  // @ts-ignore
  const originClaimEntities: any = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.originClaimProcessData.claimEntities
  );
  // @ts-ignore
  const currentClaimEntities = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  return [
    ...(originClaimEntities?.deleteAdjustmentList || []),
    ...getNewDeleteAdjustmentList({
      originMap: originClaimEntities?.treatmentListMap,
      currenttMap: currentClaimEntities?.treatmentListMap,
      type: EDeleteAdjustmentListType.treatment,
    }),
    ...getNewDeleteAdjustmentList({
      originMap: originClaimEntities?.procedureListMap,
      currenttMap: currentClaimEntities?.procedureListMap,
      type: EDeleteAdjustmentListType.procedure,
    }),
  ];
}
