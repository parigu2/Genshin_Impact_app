import { Route, Switch } from 'react-router-dom'

import './App.css'

import Nav from './components/Nav'
import Info from './components/Info'
import AverageATKCalculator from './components/AverageATKCalculator'

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <Switch>
          <Route exact path='/' component={AverageATKCalculator} />
          <Route path='/info' component={Info} />
        </Switch>
      </header>
    </div>
  );
}

export default App
