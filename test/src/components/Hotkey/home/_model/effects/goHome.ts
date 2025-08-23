import { history } from 'umi';

function* goHome() {
  history.push('/');
}

export default goHome;
