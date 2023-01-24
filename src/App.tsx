import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import state from './redux/state'



function App() {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={()=><Profile  />}/>
                    <Route path='/dialogs' render={()=><Dialogs  />}/>

                    <Route path='/news' render={() => <News />}/>
                    <Route path='/music' render ={()=> <Music />}/>
                    <Route path='/settings' component={()=> <Settings />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
