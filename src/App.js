import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import CharacterSummon from './components/CharacterSummon/CharacterSummon';
import CharacterInventory from './components/Inventory/Characters/CharacterInventory';
import NavBar from './components/NavBar/NavBar';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import SongSelectPage from './components/SongChallenge/SongSelectPage/SongSelectPage';
import SongChallenge from './components/SongChallenge/SongChallenge';
import GearInventory from './components/Inventory/Gear/GearInventory';

import CharacterInventoryProvider from '../src/Shared/CharacterInventory-Context';
import UserDetailsProvider from '../src/Shared/UserDetails-Context';
import GearInventoryProvider from './Shared/GearInventory-Context';

import './App.css';

function App() {
  //As this is the highest component in our app, we could load ourstate here and pass it through all props..
  //...or use redux instead
  return (
      <GearInventoryProvider>
        <UserDetailsProvider>
          <CharacterInventoryProvider>
            <Router>
              <NavBar />
              <Switch>
                <Route
                  path="/:playerID/inventory/idols"
                  exact
                  component={CharacterInventory}
                />
                <Route
                  path="/:playerID/inventory/items"
                  exact
                  component={GearInventory}
                />
                <Route
                  path="/:playerID/inventory/character/:characterName"
                  exact
                  component={CharacterDetails}
                />
                <Route path="/banners" exact component={CharacterSummon} />
                <Route
                  path="/play/songBattle/"
                  exact
                  component={SongSelectPage}
                />
                <Route
                  path="/play/songBattle/song"
                  exact
                  component={SongChallenge}
                />
                <Redirect to="/banners" exact />
              </Switch>
            </Router>
          </CharacterInventoryProvider>
        </UserDetailsProvider>
      </GearInventoryProvider>
  );
}

export default App;
