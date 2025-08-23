import { notification } from 'antd';

const copy = (text) => {
  console.log('text', text);
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(input);
  notification.success({ message: 'Copy Success' });
};
export { copy };
