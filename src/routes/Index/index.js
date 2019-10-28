import './index.scss'
import React,{ Component,Fragment } from 'react'
import { connect } from "dva"
import { SearchBar } from 'antd-mobile'
import { project } from "./index.json"
import ShopList from '../../components/Shop_list'
import Loading from "../../components/Loading"
import { withRouter } from "dva/router"

@connect(({ index,loading }) => ({
  ...index,loading
}))
class Index extends Component{
  state = {
    keyword: '热门',
    page: 1
  }
	goSearch(){
		this.props.history.push('/search')
	}
	componentDidMount(){
    if(!this.props.isFirstLoad) return
    const { keyword,page } = this.state
    this.props.dispatch({type: 'index/lists',payload: { keyword,page }})
	}
	toSearch(event){
		let name = event.target && event.target.getAttribute('data-keyword')
		if(!name) return
		this.props.history.push({pathname:'list',state: {name}})
	}
	render(){
    const { listsGater,loading } = this.props
    const isLoading = loading.effects['index/lists']
    if(isLoading){
      return <Loading/>
    }else{
      return (
        <Fragment>
        	<div className="serach-input">
        		<SearchBar onFocus={this.goSearch.bind(this)} placeholder="搜索商品您需要的商品" ref={ref => this.autoFocusInst = ref} />
        	</div>
        	<div className="options-list">
        		{
        			project.map((v,k) => {
        				return (
        					<div className="options-item" key={k} onClick={this.toSearch.bind(this)}>
        					  <img alt="" data-keyword={v.keyword} src={require(`../../assets/images/index/list-pic${k+1}.png`)} />
        					  <span>{v.name}</span>
        					</div>
        				)
        			})
        		}
        	  </div>
        	  <div className="shop-box">
        			{
                listsGater.result && <ShopList list={listsGater}/>
        			}
        	  </div>
        </Fragment>
      )
    }
	}
}

export default withRouter(Index)
