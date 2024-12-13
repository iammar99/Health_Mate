import './App.scss'
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './pages/Routes'
import ScreenLoader from './components/ScreenLoader/ScreenLoader'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { isAppLoading } = useAuthContext()
  if (isAppLoading) {
    return <ScreenLoader />
  }
  else {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
