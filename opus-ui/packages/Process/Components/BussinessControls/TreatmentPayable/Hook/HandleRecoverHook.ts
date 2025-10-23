import { useSelector, useDispatch } from 'dva';

export default ({ NAMESPACE, id }: any) => {
  const dispatch = useDispatch();

  const claimPayableId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]?.payableId
  );
  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[claimPayableId]?.benefitCategory
  );

  const handleRecover = (fieldName: string, payableId: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId,
        fieldName,
      },
    });
  };

  return handleRecover;
};
