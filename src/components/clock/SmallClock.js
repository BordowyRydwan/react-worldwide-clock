import './SmallClock.css';
import React from 'react';
import Clock from './Clock.js'

class SmallClock extends Clock
{
    render(){
        const time = this.state.time;

        if(this.state.time === null){
            return(
                <div className="smallclock">
                    <div className="smallclock__preloader">

                    </div>
                </div>
            );
        }
        else{
            Object.keys(time).map((key, index) => time[key] = this.fillZeros(time[key]));

            return(
                <div className="smallclock">
                    <p className="smallclock__time">
                        <span className="smallclock__time__number">
                            {time.hours}
                        </span>
                        :
                        <span className="smallclock__time__number">
                            {time.minutes}
                        </span>
                        :
                        <span className="smallclock__time__number">
                            {time.seconds}
                        </span>
                    </p>
                    <p className="smallclock__description">
                        <span className="small_bolder">{this.state.timeZone.split(' ')[0]}</span>
                    </p>
                </div>
            );
        }
    }
}

export default SmallClock;