import apis from '../services'

export const store = window.localStorage
const wx = window.wx
let [jlTag] = [
	true
]

// 获取url参数
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2]); return null
}

//加载更多
export function LoadMore(element,callback){
	let clientHeight = element.clientHeight
	let scrollTop  = element.scrollTop
	let scrollHeight = element.scrollHeight
	if(clientHeight + scrollTop === scrollHeight){
		callback()
	}
}

//设置缓存
export function setCache(key,item){
	let his = store.getItem(key) || JSON.stringify([])
	his = JSON.parse(his)
	his.length && his.map((v,k) => v.name === item.name && his.splice(k,1))
	his.push(item)
	if(his.length >= 8) his.splice(0,1)
	store.setItem(key,JSON.stringify(his))
}

//读取缓存
export function getCache(key,that){
	let his = store.getItem(key) || JSON.stringify([])
	let hisObj = JSON.parse(his)
	if(hisObj && hisObj.length) that.setState({history: hisObj})
}

// 商品转链
export function goDetailInfo(item){
	jlTag = false
	const { skuId,referPrice,salePrice,itemName } = item,gdPic = 'https:'+item.itemAnnexVos[0].annexUrl
	apis.getJdlink(skuId,'1f998e74e052a952e7db8557c529ee19').then( res => {
	  let url = res.data.data
	  if(url){
	    sceneJudg(
		() => {
			wx.miniProgram.navigateTo({
				url: `/pages/turn_chain/main?url=${url}&gdPic=${gdPic}&itemName=${itemName}&referPrice=${referPrice}&salePrice=${salePrice}`
			})
			jlTag = true
		},
		() => {
			window.location.href = url
			jlTag = true
		}
		)
	  }
	})
}


//场景判断
function sceneJudg(wxUser,appUser){
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === "micromessenger") {
     wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
            //小程序
            wxUser()
        } else {
            return
        }
        })
   } else {
     //不在微信中
     appUser()
   }
}

//获取用户信息
export function getUserInfo(id,agentId){
  sceneJudg(
    () => {
      apis.getWXUserInfo(id)
      .then( res => {
        
      })
    },
    () => {
      apis.getAppUserInfo(agentId)
      .then( res => {
         
      })
    }
  )
}