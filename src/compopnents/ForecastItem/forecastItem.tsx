import React from "react";
import api from "../../api/api";
import { tempConvert } from "../../utils";

import * as s from "./forecastItem.scss";

interface IPropsItem {
    data: any;
}

enum Days {
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
}

class ForecastItem extends React.Component<IPropsItem, {}> {

    constructor(props: IPropsItem) {
        super(props);
    }

    getDay = () => {
        const date = new Date(this.props.data.dt * 1000);
        return `${Days[date.getDay()]}, ${date.getDate()}`
    }

    render() {
        const { weather, temp } = this.props.data;
        return(
            <div>
                <div>{this.getDay()}</div>
                <img src={api.getImgUrl(weather[0].icon)} alt="" />
                <div className={s.tempList}>
                    <p>Night: {tempConvert(temp.night)}&#8451;</p>
                    {/* <p>Morning: {tempConvert(temp.morn)}&#8451;</p> */}
                    <p>Day: {tempConvert(temp.day)}&#8451;</p>
                    {/* <p>Evening: {tempConvert(temp.eve)}&#8451;</p> */}
                </div>
            </div>
        );
    }
}

export default ForecastItem;