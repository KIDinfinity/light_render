import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useGetEditorType from 'bpm/pages/Information/_hooks/useGetEditorType';
import InformationEditorType from 'basic/enum/InformationEditorType';

export default ({ item }) => {
  const dispatch = useDispatch();
  const editorType = useGetEditorType({ item });
  useEffect(() => {
    if (editorType === InformationEditorType.TextArea) {
      dispatch({
        type: 'navigatorInformationController/addInformationChange',
        payload: {
          changedFields: {
            content: '',
            id: item.id,
          },
        },
      });
    }
  }, [editorType, item]);
};
