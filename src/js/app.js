import React, {Component} from 'react';
import Auth from './components/Auth';

class App extends Component {
    render() {
        return (
            <div className='global-container'>
                <Auth />
            </div>
        )
    }
}

export default App;