import "./index.scss"
import React,{ Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { setCache,getCache,store } from "../../utils/com"

export default class Search extends Component {
	constructor(props){
		super(props)
		this.state = {
			inputSearch: '',
			hotArr: [
				{name: '限时秒杀'},
				{name: '买一送一'},
				{name: 'HUAWEI'},
				{name: '篮球鞋'}
			],
			history: []
		}
		this.goGoodsList = this.goGoodsList.bind(this)
		this.tapSearch = this.tapSearch.bind(this)
		this.clearCache = this.clearCache.bind(this)
	}
	goGoodsList(){
		if(!this.state.inputSearch) return
		setCache('searchHistory',{name: this.state.inputSearch})
    this.props.history.push({pathname:'list',state: {name: this.state.inputSearch}})
	}
	changeSearch(v){
		this.setState({
			inputSearch: v
		})
	}
	tapSearch(e){
		let name = e.target && e.target.getAttribute('data-name')
		if(!name) return
		setCache('searchHistory',{name})
    this.props.history.push({pathname:'list',state: {name}})
	}
	componentDidMount(){
		this.getHistory()
	}
	getHistory(){
		getCache('searchHistory',this)
	}
	clearCache(){
		store.removeItem('searchHistory')
		this.setState({
			history: []
		})
	}
	render(){
		const { hotArr,history } = this.state
		return (
			<div className="search">
			  <div className="serach-input">
			  	<SearchBar onChange={this.changeSearch.bind(this)} value={this.state.inputSearch} placeholder="搜索商品您需要的商品" onSubmit={this.goGoodsList} ref={ref => this.autoFocusInst = ref} />
			  </div>
			  <div className="com-container">
				{/* 热门搜索 */}
			    <div className="com-list">
			      <p className="title">热门搜索</p>
			      <div className="list-box">
					{
						hotArr && hotArr.map((v,k) => {
							return (
								<p onClick={this.tapSearch} key={k} data-name={v.name}>{v.name}</p>
							)
						})
					}
			      </div>
			    </div>
				{/* 历史搜索 */}
			    <div className="com-list">
			      <div className="options-head">
			        <p className="title">历史搜索</p>
			        <p className="clear" onClick={this.clearCache}>清除</p>
			      </div>
			      <div className="list-box">
			        {
			        	history.length && history.map((v,k) => {
			        		return (
			        			<p onClick={this.tapSearch} key={k} data-name={v.name}>{v.name}</p>
			        		)
			        	})
                || <div className="no-record">-暂无历史搜索-</div>
			        }
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}
