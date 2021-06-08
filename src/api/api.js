import { KEYS } from './keys';


class api {
    _apiBase = 'http://api.openweathermap.org/data/2.5/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not get resource ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getOneDayWeather(city) {
        return this.getResource(`weather?q=${city}&appid=${KEYS.API_KEY}`);
    }

    getSomeDaysWeather(city, days) {
        return this.getResource(`forecast/daily?q=${city}&cnt=${days}&appid=${KEYS.API_KEY}`);
    }
}

export default new api();