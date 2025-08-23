import lodash from 'lodash';
import { history } from 'umi';

let keyCodeArry: number[] = [];

function addKeyCodeArray(keyCode: number, arr: number[]) {
  if (lodash.indexOf(arr, keyCode) === -1) {
    arr.push(keyCode);
  }

  return arr;
}

function deletKeyCodeArry(keyCode: number, arr: number[]) {
  return lodash.remove(arr, (c) => c === keyCode);
}

window.addEventListener('keydown', (e) => {
  keyCodeArry = addKeyCodeArray(e.keyCode, keyCodeArry);
});

window.addEventListener('keyup', (e) => {
  if (lodash.indexOf(keyCodeArry, 17) !== -1 && lodash.indexOf(keyCodeArry, 81) !== -1) {
    history.go(-1);
  }

  keyCodeArry = deletKeyCodeArry(e.keyCode, keyCodeArry);
});
