import React from "react";
import { IMain, IWeather, IWind } from "../../interfaces";
import { tempConvert, windDirection } from "../../utils";

import * as s from "./weather.scss";

interface IProps {
	data: {
		weather: IWeather[],
		main: IMain,
		wind: IWind,
        timezone: number,
        dt: number
	};
}

class Weather extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

	getDate() {
        const { dt, timezone } =this.props.data;
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		const date = new Date(utc + timezone * 1000);
		const hours = date.getHours();
		const minutes = JSON.stringify(date.getMinutes());
		return `${hours}:${minutes.length > 1 ? minutes : "0" + minutes}`;
	}

    render() {
        const { main, wind, weather } = this.props.data;
        return (
            <div className={s.weather}>
                <div className={s.temperature}>{tempConvert(main.temp)}&#8451;</div>
                <div>
                    <p>Wind: <span dangerouslySetInnerHTML={{ __html: windDirection(wind.deg) }}></span> {wind.speed} meter/sec</p>
                    <p>Humidity: {main.humidity}%</p>
                </div>
                <div className={s.time}>
                    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                    <div>{this.getDate()}</div>
                </div>
            </div>
        )
    }
}

export default Weather;