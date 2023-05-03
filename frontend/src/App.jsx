import { Navigate,Route, Routes} from 'react-router-dom'
import { useContext } from "react";
import UserContext, { UserContextProvider } from './components/UserContext.js';

import Store from './pages/Store.jsx';
import Detail from './pages/Detail.jsx';
import Create from './pages/Create.jsx';
import Edit from './pages/Edit.jsx'

import './App.css'

const App = () => {
  return(
    <div className='bg-dark'>
      <UserContextProvider>
          <Routes>
            <Route path='/' element={<Store/>} />
            <Route path='/detail/:id' element={<Detail/>} />

            {/*Routes for admin*/}
            <Route path='/create' element={<RequireAdmin><Create/></RequireAdmin>} />
            <Route path='/edit/:id' element={<RequireAdmin><Edit/></RequireAdmin>} />

          </Routes>
      </UserContextProvider>
    </div>
  );
}

const RequireAdmin = ({children}) => {
  let isLogged = useContext(UserContext);
  {console.log(isLogged)}
  if(isLogged) {
    return children
  }
  return <Navigate to='/'/>
}

export default App;