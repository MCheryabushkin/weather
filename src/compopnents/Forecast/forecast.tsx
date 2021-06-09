import React from "react";
import api from "../../api/api";
import ForecastItem from "../ForecastItem/forecastItem";

import * as s from "./forecast.scss";

interface ISForecastList {
    list: any,
    isLoad: boolean
}
interface IPForecastList {
    coord: {
        lat: number,
        lon: number
    }
}

class ForecastList extends React.Component<IPForecastList, ISForecastList> {
    constructor(props: IPForecastList) {
        super(props);

        this.state = {
            list: [],
            isLoad: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: IPForecastList) {
        if (prevProps.coord.lat !== this.props.coord.lat) {
            this.getData();
        }
    }

    getData = () => {
        const { lat, lon } = this.props.coord;

        api.get7DaysForecast(lat, lon)
            .then(res => {
                this.setState({ 
                    list: res,
                    isLoad: true
                })
            })
            .catch(err => console.log(err));
    }

    renderForecastCards = () => {
        return this.state.list.daily.map((el: any, iDx: number) => {
            if (iDx) return <ForecastItem key={iDx} data={el} />;
        })
    }

    render () {
        if (!this.state.isLoad) return false;
        console.log(this.state.list);
        return(
            <div className={s.forecast}>
                <h3>Forecast for week:</h3>
                <div className={s.forecastList}>
                    { this.renderForecastCards() }
                </div>
            </div>
        );
    }
}

export default ForecastList;