import React from "react";
import api from "../../api/api";
import ForecastList from "../Forecast/forecast";
import Header from "../Header";
import Weather from "../Weather/weather";

import "./app.scss";

interface IState {
    isLoad: boolean;
    data: any;
}
class App extends React.Component<{}, IState> {

    public city: string;

    constructor(props = {}) {
        super(props);
        this.state = {
            data: null,
            isLoad: false,
        }
        this.city = "Saint Petersburg";
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (e) => {
            const { latitude, longitude } = e.coords;

            api.getCityByCoord(latitude, longitude)
                .then(res => {
                    this.city = res.name;
                    this.setState({
                        data: res,
                        isLoad: true
                    })
                })
                .catch(() => this.getData());
        },
        () => this.getData());

    }

    getData() {
        api.getOneDayWeather(this.city)
            .then(res => this.setState({
                data: res,
                isLoad: true
            }))
            .catch(err => alert("City not found"));
    }

    changeCity = (city: string) => {
        this.city = city;
        this.getData();
    }

    render() {
        const { isLoad, data } = this.state;

        if (!isLoad) return <p>Load data...</p>;

        return (
            <>
                <Header 
                    name={this.city}
                    changeCity={this.changeCity} />
                <Weather data={data} />
                <ForecastList coord={data.coord} />

                {/* <pre>
                    {JSON.stringify(this.state.data, undefined, 2)}
                </pre> */}
            </>
        )
    }
}

export default App;