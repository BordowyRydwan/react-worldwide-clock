import './Clock.css';
import React from 'react';

class Clock extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            time: null,
            timeZone: null,
        }
        this.updateTime = this.updateTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    fillZeros(num){
        if(num.toString().length < 2){
            return '0' + num;
        }

        return num.toString();
    }

    startTimer(){
        this.timer = setInterval(this.updateTime, 1000);
    }

    updateTime(){
        let time = this.state.time;

        time.seconds++;

        if(time.seconds === 60){
            time.seconds = 0;
            time.minutes++;
        }

        if(time.minutes === 60){
            time.minutes = 0;
            time.hours++;
        }

        if(time.hours === 24){
            time.hours = 0;
        }

        this.setState({time});
    }

    getTimeFromUTCString(str){
        const [hours, minutes, seconds] = str.match(/(\d{2}):(\d{2}):(\d{2})/)[0].split(':');

        let time = {
            hours,
            minutes,
            seconds,
        }

        return time;
    }

    componentDidMount(){
        let apiURL;

        if(this.props.timeZone === 'local'){
            apiURL = 'https://worldtimeapi.org/api/ip';
        }
        else{
            apiURL = `https://worldtimeapi.org/api/timezone/${this.props.timeZone}`;
        }

        this._asyncRequest = fetch(apiURL)
                                .then(res => res.json())
                                .then(data => {
                                    this._asyncRequest = null;
                                    this.setState({
                                        time: this.getTimeFromUTCString(data.datetime),
                                        timeZone: `${data.timezone} ${data.utc_offset}`
                                    })
                                })
                                .then(() => this.startTimer())
                                .catch(err => console.log(err))
    }
    
    render(){
        const time = this.state.time;

        if(this.state.time === null){
            return(<div className="clock__preloader"></div>);
        }
        else{
            Object.keys(time).map((key, index) => time[key] = this.fillZeros(time[key]));

            return(
                <div className="clock">
                    <p className="clock__time">
                        <span className="clock__time__number">
                            {time.hours}
                        </span>
                        :
                        <span className="clock__time__number">
                            {time.minutes}
                        </span>
                        :
                        <span className="clock__time__number">
                            {time.seconds}
                        </span>
                    </p>
                    <p className="clock__description">
                        {this.state.timeZone}
                    </p>
                </div>
            );
        }
    }
}

export default Clock;