import lodash from 'lodash';

export default ({ data, key, newValue }: any) => {
  return lodash.map(data, (item) => {
    const changeContent = lodash.get(item, 'data.change_content', []);
    if (item.data['#operation'] === 'update') {
      return {
        ...item,
        data: {
          ...item.data,
          change_content:
            lodash.findIndex(
              changeContent,
              (changeContentItem: any) => changeContentItem.fieldName === key
            ) > -1
              ? lodash.map(changeContent, (changeContentItem: any) =>
                  changeContentItem.fieldName === key
                    ? { newValue, fieldName: key }
                    : changeContentItem
                )
              : [
                  ...changeContent,
                  {
                    newValue,
                    fieldName: key,
                  },
                ],
        },
      };
    }
    return item;
  });
};
