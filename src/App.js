import { useCallback, useState } from 'react';
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'

function App() {
  const [auth, setAuth] = useState({
    token: "",
    user: {},
    meta: {}
  });

  const onLoginSuccess = (auth) => {
    setAuth(auth);
  };

  const onLogOut = (e) => {
    setAuth({
      token: "",
      user: {},
      meta: {}
    });
  };

  const suggestPasswordChangeOff = useCallback(() => {
    const newAuth = {
      ...auth,
      meta: {
        suggestPasswordChange: false,
        breachedAccounts: []
      }
    };

    setAuth(newAuth);
  }, [auth, setAuth]);

  const currentPage = () => {
    return auth.token ? (
      <Dashboard
        suggestPasswordChange={
          auth.meta ? auth.meta.suggestPasswordChange : false
        }
        breaches={auth.meta ? auth.meta.breachedAccounts : null}
        onDismissBreachAlert={suggestPasswordChangeOff}
      />
    ) : (
      <LoginForm onLoginSuccess={onLoginSuccess} />
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-info">
        <a className="navbar-brand mr-auto" href="https://github.com/zuoaoyuan">
          AppCo
        </a>

        {auth.token && (
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tasks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={onLogOut}>
                Log out
              </a>
            </li>
          </ul>
        )}
      </nav>
      <div className="container">{currentPage()}</div>
    </div>
  );
}

export default App;
