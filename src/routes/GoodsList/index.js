import './index.scss'
import React,{ Component } from 'react'
import ShopList from '../../components/Shop_list'
import Loading from '../../components/Loading'
import apis from '../../services'
import { Spinner } from 'reactstrap'
import { LoadMore } from '../../utils/com'

export default class GoodsList extends Component {
	constructor(props) {
	  super(props)
	  let searchVal = this.props.history.location.state && this.props.history.location.state.name
		this.state = {
			searchVal,
			page: 1,
			searchRes: {},
			loading: false,
			noMore: false
		}
		this.handleScroll = this.handleScroll.bind(this)
	}
	componentDidMount(){
		this.getSearchData()
		window.addEventListener('scroll', this.handleScroll)
	}
	async getSearchData(){
		const res = await apis.searchShop(this.state.searchVal,this.state.page)
		let val = res.data.data
		if(val && val instanceof Object){
			if(this.state.searchRes && this.state.searchRes.result){
				this.setState({
					searchRes: {
						...val,
						result: [
							...this.state.searchRes.result,
							...val.result
						]
					}
				})
			}else{
				if(val.result && val.result.length <= 6) {
					this.setState({
						searchRes: val,
						noMore: true
					})
					return
				}
				this.setState({
					searchRes: val
				})
			}
		}else{
			if(this.state.searchRes && this.state.searchRes.result){
				this.setState({
					noMore: true
				})
			}else{
				this.setState({
					searchRes: null
				})
			}
		}
	}
	handleScroll(){
		LoadMore(document.documentElement, () => {
			if(!this.state.noMore){
				if(this.state.searchRes && this.state.searchRes.length >= this.state.searchRes.totalCount){
					this.setState({
						noMore: true
					})
					return
				}
				this.setState({
					page: this.state.page + 1
				},() => {
					this.getSearchData()
				})
			}
		})
	}
	render(){
		const { searchRes,loading,noMore } = this.state
		if(searchRes && searchRes.result){
			return (
				<div className="search-container">
					<ShopList list={searchRes}></ShopList>
					{
						!noMore
						&&
						<div className="more-msg loadSty">
							<Spinner style={{ width: '1.5rem', height: '1.5rem' }} color="primary" />
						</div>
						||
						<div className="more-msg"> - 到底了 - </div>
					}
					{
						loading && <Loading fullScreen={true}/>
					}
				</div>
			)
		}
		else if(searchRes === null){
			return <div className="not-res"> - 暂无此类商品 - </div>
		}
		else{
			return <Loading fullScreen={true}/>
		}
	}
}
