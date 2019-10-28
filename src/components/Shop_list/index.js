import React,{ Component } from 'react'
import './index.scss'
import { goDetailInfo } from '../../utils/com'

export default class ShopList extends Component {
	//避免运算误差
	accSub(arg1,arg2){
	    var r1,r2,m,n
	    try{ r1 = arg1.toString().split(".")[1].length } catch(e){ r1 = 0 }
	    try{ r2 = arg2.toString().split(".")[1].length } catch(e){ r2 = 0 }
	    m = Math.pow(10,Math.max(r1,r2))
	    n = (r1 >= r2) ? r1 : r2
	    return ((arg1 * m - arg2 * m) / m).toFixed(n)
	}
	render(){
		const { list } = this.props
		return (
			<div className="shop-list">
				{
					list.result && list.result.map( (item,index) => {
						return (
							<div className="shop-item" key={+new Date() + index} onClick={goDetailInfo.bind(this,item)}>
							  <img alt="" src={'https:'+item.itemAnnexVos[0].annexUrl} />
							  <div className="shop-info">
							    <div className="info-title">
								  {
									  item.jdSelfSaleFlag != 0 && <img alt="" className="js-store" src={require('../../assets/images/index/jd-store.png')} />
								  }
							      <span>{item.itemName}</span>
							    </div>
							    <div className="jd-pirce">
							      <p>京东价 ￥{item.referPrice}</p>
								  <div className="coupons">券 ¥{this.accSub(item.referPrice,item.salePrice)}</div>
							    </div>
							    <div className="info-price">
							      <p>￥{item.salePrice}</p>
								  <div className="earnings">预估收益 ￥{item.rebatePrice}</div>
							    </div>
							  </div>
							</div>
						)
					})
				}
			</div>
		)
	}
}
