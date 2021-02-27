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
                            .then(() => this.fillRandomList())
                            .catch(err => console.log(err));
  }

  fillRandomList(amount = 10){

    if(!this.state.responseList){
      return;
    }

    let scope = this.state.responseList.length - 1;
    let indexes = [];
    let elements = [];
    let validAreas = [
      'Africa', 'America', 'Antarctica', 'Antarctica', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific'
    ];
    let cnt = 0;

    while(cnt < amount){

      let random = Math.round(Math.random() * scope);
      let isValidZone = false;

      for(let i = 0; i < validAreas.length; ++i){
        let regex = new RegExp(validAreas[i]);

        if(regex.test(this.state.responseList[random])){
          isValidZone = true;
          break;
        }
      }

      if(!indexes.includes(random) && isValidZone){
        indexes.push(random);
        cnt++;
      }
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
              <SmallClock key={index} timeZone={timezone} />
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
