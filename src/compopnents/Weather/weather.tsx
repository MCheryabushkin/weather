import React from "react";
import { IMain, IWeather, IWind } from "../../interfaces";
import { tempConvert, windDirection, getLocalTime } from "../../utils";

import * as s from "./weather.scss";

interface IProps {
	data: {
		weather: IWeather[],
		main: IMain,
		wind: IWind,
        timezone: number
	};
}

class Weather extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { main, wind, weather, timezone } = this.props.data;
        
        return (
            <div className={s.weather}>
                <div className={s.temperature}>{tempConvert(main.temp)}&#8451;</div>
                <div>
                    <p>Wind: <span dangerouslySetInnerHTML={{ __html: windDirection(wind.deg) }}></span> {wind.speed} meter/sec</p>
                    <p>Humidity: {main.humidity}%</p>
                </div>
                <div className={s.time}>
                    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                    <div>{getLocalTime(timezone)}</div>
                </div>
            </div>
        )
    }
}

export default Weather;