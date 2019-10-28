import React,{ Component } from 'react'
import './index.scss'

export default class My extends Component{
	render(){
		return (
			<div className="myCenter">
			  <div className="user-info">
			    <div className="user-fx">
			      <img alt="" className="user-head" src={require('../../assets/images/index1.png')} />
			      <span>像风一样</span>
			    </div>
			  </div>
			  {/* 我的订单 */}
			  <div className="my-options">
			    <div className="options-title">
			      <div className="title">我的订单</div>
			      <div className="look-link">查看全部订单</div>
			    </div>
			    <div className="options-list">
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/order1.png')} />
			        <span>待付款</span>
			      </div>
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/order2.png')} />
			        <span>已付款</span>
			      </div>
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/order3.png')} />
			        <span>待收货</span>
			      </div>
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/order4.png')} />
			        <span>已完成</span>
			      </div>
			    </div>
			  </div>
			  {/* 我的活动 */}
			  <div className="my-options">
			    <div className="options-title">
			      <div className="title">我的活动</div>
			      <div className="look-link">查看全部活动</div>
			    </div>
			    <div className="options-list">
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/hd1.png')} />
			        <span>砍价</span>
			      </div>
			      <div className="options-item">
			        <img alt="" src={require('../../assets/images/myCenter/hd2.png')} />
			        <span>拼团</span>
			      </div>
			    </div>
			  </div>
			  {/* 预估收益 */}
			  <div className="forecast-earnings">
			    <span className="title">预估收益</span>
			    <div className="fore-box">
			      <div className="fore-item">
			        <span className="price">0.00</span>
			        <span className="text">今日预估收益</span>
			      </div>
			      <div className="fore-item">
			        <span className="price">0.00</span>
			        <span className="text">今日推广收益</span>
			      </div>
			      <div className="fore-item">
			        <span className="price">0.00</span>
			        <span className="text">今日返利收益</span>
			      </div>
			      <div className="fore-item">
			        <span className="price">0.00</span>
			        <span className="text">累计收益</span>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}