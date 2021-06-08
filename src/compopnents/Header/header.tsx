import React from "react";
import * as s from "./header.scss";
// import * as countries from "all-countries-and-cities-json/countries.json";

interface IProps {
	name: String;
	changeCity(city: string): void;
}

export default class Header extends React.Component<IProps, { inputVal: string }> {

	public inputVal: string;

	constructor(props: IProps) {
		super(props);

		this.state =  {inputVal : ""};
	}

	onChange = (val: any) => {
		this.setState({ inputVal: val.target.value })
	}
	onClick = (e: any) => {
		e.preventDefault();
		this.props.changeCity(this.state.inputVal);
		this.setState({ inputVal: "" })
	}

	render() {return (
			<div className={s.header}>
				<p className={s.city}>{this.props.name}</p>
				<form>
					<input type="text" 
						onChange={this.onChange} 
						value={this.state.inputVal}
						placeholder="Find city"
						className={s.input} />
					<button 
						onClick={this.onClick}
						className={s.button} >
							<span>Find</span>
					</button>
				</form>
			</div>
		)
	}
}