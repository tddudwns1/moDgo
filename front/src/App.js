import GoogleLogin from 'react-google-login';
import './App.css';

function App() {
  return (
    <div className="App">
      <GoogleLogin
        clientId={'813123317206-o4mo2eas1kbve8e0914g5uev9ru27he9.apps.googleusercontent.com'}>
        구글로 로그인</GoogleLogin>
    </div>
  );
}

export default App;