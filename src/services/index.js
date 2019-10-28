import fly from './init'


const apis = {
  //转链
  getJdlink: (skuId,agenttoken) => fly.get(`/good/sort/uri/${skuId}/${agenttoken}`),
  //搜索
  searchShop: (keyword,page) => fly.get(`/good/query/${keyword}?page=${page}`),
  //分类
  getCateGory: () => fly.get(`/good/category`),
  //分类列表
  getCateGoryList: (id,pageSize = 15,pageNum) => fly.get(`/good/for/category/${id}?page_size=${pageSize}&page_num=${pageNum}`),
  //获取wx用户信息
  getWXUserInfo: (id) => fly.get(`/user/${id}`),
  //获取app用户信息
  getAppUserInfo: (agentId) => fly.get(`/agent/${agentId}`)
}

export default apis
