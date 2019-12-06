import React, { Component, Fragment } from 'react';
import Intro from './views/Intro';
import Category from './views/Category';
import StepBuyCourse from './views/StepBuyCourse';
import ListCourse from './views/ListCourse';
import InfoElearning from './views/InfoElearning';
import Feel from './views/Feel';
import Loading from '../../../components/Loading';
export default class Home extends Component {
	componentDidMount() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
	render() {
		return (
			<Fragment>
				<Loading />
				<div className="home">
					<Intro />
					<Category />
					<ListCourse />
					<InfoElearning />
					<StepBuyCourse />
					<Feel />
				</div>
			</Fragment>
		);
	}
}
