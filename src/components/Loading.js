import React, { Component } from 'react';

export default class Loading extends Component {
	render() {
		return (
			<div className="loading">
				<div className="loading-animate">
					<span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
					<div className="base">
						<span></span>
						<div className="face"></div>
					</div>
				</div>
				<div className="longfazers">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	}
}
