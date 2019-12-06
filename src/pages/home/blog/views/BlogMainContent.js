import React, { Component } from 'react';
import listBlog from '../data/data.json';

export default class BlogMainContent extends Component {
	renderListBlog = () => {
		if (listBlog) {
			return listBlog.map((item, index) => {
				return (
					<div className="blog-item" key={index}>
						<div className="blog-wrap">
							<img src={item.hinhAnh} />
							<div className="date">
								<div>
									<p className="day">{item.day}</p>
									<p className="month">{item.month}</p>
								</div>
							</div>
						</div>
						<div className="blog-item-content">
							<h4>{item.title}</h4>
							<p>
								<span>ThimPress</span> / <span>Uncategorized</span> / <span>No Comment</span>
							</p>
							<p className="blog-text">
								If you are a newbie to managing a WordPress website, then congratulations! You are here
								at the right track with us because we are going to introduce you one of the most basic
								knowledge when…
							</p>
							<button className="btn--blue pulse">READ MORE ></button>
						</div>
					</div>
				);
			});
		}
	};
	render() {
		return (
			<section className="blog-main-content">
				{this.renderListBlog()}
				<div id="blog"></div>
			</section>
		);
	}
}
