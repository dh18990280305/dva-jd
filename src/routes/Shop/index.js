import './index.scss'
import React,{ Component,Fragment } from 'react'
import { SearchBar } from 'antd-mobile'
import { connect } from 'dva'
import { LoadMore,goDetailInfo } from '../../utils/com'
import Loading from '../../components/Loading'
import { withRouter } from "dva/router"

@connect(({ shop,loading }) => ({
  ...shop,loading
}))
class Shop extends Component {
	goSearch(){
		this.props.history.push('/search')
	}
  componentDidMount(){
    this.props.dispatch({type: 'shop/getClassify'})
  }
  changeActive(para){
    this.props.dispatch({type: 'shop/getFlLists',payload: para})
    this.shopList.scrollTop = 0
  }
  _onScrollEvent(){
    LoadMore(this.shopList,() => {
      this.props.dispatch({type: 'shop/getFlLists',payload: 'more'})
    })
  }
	render(){
    const { classify,active,classFlList,loading,firstLoading } = this.props
    const isLoading = loading.global
    if(!firstLoading){
      return (
      	<Fragment>
      		<div className="serach-input">
      			<SearchBar onFocus={this.goSearch.bind(this)} placeholder="搜索商品您需要的商品" ref={ref => this.autoFocusInst = ref} />
      		</div>
      		<div className="shop-container">
      		  <div className="shop-screening">
              {
                 classify && classify.length && classify.map((item,index) => {
                   return <p onClick={() => this.changeActive({id:item.id,index,name:item.name})} className={active == index && 'active' || ''} key={+new Date() + index}>{item.name}</p>
                 })
              }
      		  </div>
      		  <div className="class-list" ref={c => this.shopList = c} onScrollCapture={() => this._onScrollEvent()}>
      		    <div className="class-item">
      		      <p className="class-title">家具家装</p>
      		      <div className="class-bx">
                  {
                    classFlList.result && classFlList.result.map((item,index) => {
                      return (
                      	<div className="class-exhi" key={+new Date()+index} onClick={goDetailInfo.bind(this,item)}>
                      	  <img alt="" src={'https:'+item.itemAnnexVos[0].annexUrl}/>
                      	  <p>{item.itemName}</p>
                      	</div>
                      )
                    })
                  }
      		      </div>
      		    </div>
      		  </div>
      		</div>
          {
            isLoading && <Loading/>
          }
      	</Fragment>
      )
    }else{
      return <Loading/>
    }
	}
}

export default withRouter(Shop)
