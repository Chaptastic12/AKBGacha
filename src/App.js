import CharacterSummon from './components/CharacterSummon/CharacterSummon';
import NavBar from './components/NavBar/navbar';

import './App.css';

function App() {
  //As this is the highest component in our app, we could load ourstate here and pass it through all props..
  //...or use redux instead
  return (
      <div>
        <NavBar />
          <CharacterSummon />
      </div>
    )
}

export default App;
