import './App.scss'
import 'bootstrap/dist/js/bootstrap.bundle'
import Header from './components/Header'
import Footer from './components/Footer'
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
        <Header />
        <Routes />
        <Footer />
      </>
    );
  }
}

export default App;
