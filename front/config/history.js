import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
export default history;

export function redirectToHome() {
  history.replace('/');
}
