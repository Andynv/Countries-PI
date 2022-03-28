import { Route, Routes } from 'react-router-dom'
import Home from './components/PrincipalsPage/Home.jsx'
import LandingPage from './components/PrincipalsPage/LandingPage.jsx'
import CountryDetail from './components/Details/CountryDetail.jsx';
import CreateActivity from './components/Create/CreateActivity.jsx';

function App() {
  return (
    <Routes>
      <Route exact path ='/' element={<LandingPage />}/>
      <Route exact path ='/home' element={<Home />}/>
      <Route exact path ='/home/:countryId' element={<CountryDetail />}/>
      <Route exact path ='/activity/create' element={<CreateActivity />}/>
    </Routes>
  );
};

export default App;

