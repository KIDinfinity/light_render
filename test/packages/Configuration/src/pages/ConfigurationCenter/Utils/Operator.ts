import lodash from 'lodash';

class Operator {
  get selectOperation() {
    return [
      'delete',
      'approve',
      'reject',
      'onetouchaccess',
      'submit',
      'generatedatafield',
      'deletefunction',
    ];
  }

  // 是否行可选
  isSelectable = (operation: string[] = []) => {
    return operation.reduce((selectable, current) => {
      if (lodash.includes(this.selectOperation, current) && !selectable) {
        selectable = true;
      }
      return selectable;
    }, false);
  };
}

export const { isSelectable } = new Operator();
