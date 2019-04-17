/**
 * Created by cheng on 2017/9/1.
 */

import React, {Component} from 'react';

export default class Weather extends Component {

    state = {
        weather: null
    }


    componentDidMount = () => {
        var result ={};
        result.dayPictureUrl = '/static/public/images/weather/Sunny.png'
        this.setState({
            weather: result
        })
    }


    render() {
        const {weather} = this.state;
        return (
            <div>
                {this.state.weather ?
                    <div style={{fontSize: '11pt', display: 'flex', color: '#cecece'}}>
                        <img style={{height: '30px'}} src={weather.dayPictureUrl}/>
                        <span style={{fontSize: '18px', lineHeight: '35px', marginLeft: '10px'}}>16-27
                            <span style={{fontSize: '10pt'}}>℃</span>
                        </span>
                    </div>
                    : <span>暂无数据</span>
                }
                </div>
        )
    }

}