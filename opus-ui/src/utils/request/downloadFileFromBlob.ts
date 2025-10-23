import lodash from 'lodash';

export default ({ blob, headers }: any): void => {
  // e.g: content-disposition: attachment; filename=test.txt
  const fileName = lodash
    .chain(headers.get('Content-Disposition'))
    .split(';')
    .filter((item) => item.includes('filename'))
    .get(0)
    .split('=')
    .get(1)
    .value();
  if (!fileName) {
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.replace(new RegExp('"', 'g'), '');
  document.body.appendChild(a);
  a.click();
  a.remove();
};
