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

            let arr = this.state.timeZone.split(' ')[0].split('/');
            let outputStr = arr.length === 1 ? arr[0] : `${arr[arr.length - 1].split('_').join(' ')} (${arr[0]})`

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
                        {outputStr}
                    </p>
                </div>
            );
        }
    }
}

export default SmallClock;