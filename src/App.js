import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import CharacterSummon from './components/CharacterSummon/CharacterSummon';
import CharacterInventory from './components/Inventory/Characters/CharacterInventory';
import NavBar from './components/NavBar/navbar';

import CharacterInventoryProvider from '../src/Shared/CharacterInventory-Context';
import UserDetailsProvider from '../src/Shared/UserDetails-Context';

import './App.css';

function App() {
  //As this is the highest component in our app, we could load ourstate here and pass it through all props..
  //...or use redux instead
  return (
      <div>
        <UserDetailsProvider>
          <CharacterInventoryProvider>
            <Router>
              <NavBar />
              <Switch>
                <Route path='/:playerID/inventory/characters' exact>
                  <CharacterInventory />
                </Route>
                <Route path='/banners' exact>
                  <CharacterSummon />
                </Route>
                <Redirect to='/banners' exact />
              </Switch>
            </Router>
          </CharacterInventoryProvider>
        </UserDetailsProvider>
      </div>
    )
}

export default App;
