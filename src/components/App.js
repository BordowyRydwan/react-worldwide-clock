import './App.css';
import React from 'react';
import Clock from './clock/Clock.js'
import SmallClock from './clock/SmallClock.js'

class App extends React.Component
{
  constructor(){
    super();
    this.state = {
      responseList: null,
      randomList: null,
    }
    this.fillRandomList = this.fillRandomList.bind(this);
  }

  componentDidMount(){
    let apiURL = 'http://worldtimeapi.org/api/timezone';

    this._asyncRequest = fetch(apiURL)
                            .then(res => res.json())
                            .then(data => this.setState({responseList: data.slice()}))
                            .then(() => this.fillRandomList(14))
                            .catch(err => console.log(err));
  }

  fillRandomList(amount = 10){

    if(!this.state.responseList){
      return;
    }

    let scope = this.state.responseList.length - 1;
    let indexes = [];
    let elements = [];

    for(let i = 0; i < amount; ++i){
      let random = Math.round(Math.random() * scope);

      if(indexes.includes(random)){
        while(indexes.includes(random)){
          random = Math.round(Math.random() * scope);
        }
      }

      indexes.push(random);
    }

    indexes.forEach(index => elements.push(this.state.responseList[index]));
    this.setState({randomList: elements});
  }

  render(){
    const randomList = this.state.randomList;

    if(this.state.randomList !== null){
      return (
        <div className="app">
          <h1>World time overview</h1>
          <Clock timeZone="local"/>
          <div className="smallclocks">
            {randomList.map((timezone, index) => (
              <SmallClock timeZone={timezone} />
            ))}
          </div>
          <footer>
            Thanks to the creators of: 
            <a 
              href="http://worldtimeapi.org/"
              rel="noreferrer noopener"
              target="_blank"
            >
              http://worldtimeapi.org/
            </a>
          </footer>
        </div>
      );
    }

    else{
      return (<div className="app"></div>)
    }

    
  }
  
}

export default App;
