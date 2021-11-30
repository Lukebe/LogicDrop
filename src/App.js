import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClickerComponent from './components/clicker.component';
import NavComponent from './components/nav.component';
// If you exported the connected component as a default export
// ensure you importing that component with a default import (no {})
import PokeComponent from './components/poke.component';
import { PokeListComponent } from './components/pokelist.component';
import { PokePageComponent } from './components/pokepage.component';
import { PokeNameProvider } from './contexts/PokeNameContext';
 
const App = () => {
  return (
    <PokeNameProvider>
      <BrowserRouter>
        <NavComponent />
        <Switch>
          <Route path="/clicker" component={ClickerComponent} />
          <Route path="/poke" component={PokeComponent} />
          <Route path="/pokelist" component={PokeListComponent}/>
          <Route path="/pokepage" component={PokePageComponent}/>
          <Route component={ClickerComponent} />
        </Switch>
      </BrowserRouter>
    </PokeNameProvider>
  );
}

export default App;
