import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { CategoryCode, ApplicationType } from '@/utils/constant/information';

export default () => {
  const { informationData, currrentActivityCategory } = useSelector(
    (state) => ({
      informationData: state?.navigatorInformationController?.informationData,
      currrentActivityCategory: state?.navigatorInformationController?.currrentActivityCategory,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      informationData.categoryCode === CategoryCode.all ||
      currrentActivityCategory?.applicationType === ApplicationType.ReadOnly
    )
      dispatch({
        type: 'navigatorInformationController/changeCategoryFields',
        payload: {
          changedFields: {
            categoryCode: '',
          },
        },
      });
  }, [informationData, currrentActivityCategory]);
};
