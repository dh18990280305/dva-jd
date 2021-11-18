import Fly from "flyio/dist/npm/fly"
let fly = new Fly

const version = {
    test: 'http://test.com/jd/api/',
    office: 'https://test.com/jd/api/',
}

let URL = process.env.API_ROOT

console.log(URL)
// baseUrl
fly.config.baseURL = 'http://baoming.51xiangzhu.com/jd/api/'

// 设置超时
fly.config.timeout = 10000

// 请求前拦截
fly.interceptors.request.use((request) => {
	// 给所有请求添加自定义header，带上token信息让服务器验证用户登陆
	// request.headers['Authorization'] = 'Bearer '+ ls.getItem('access_token');

	return request
})

// 请求后拦截
fly.interceptors.response.use(
	(response, promise) => {
		return promise.resolve(response.data)
	},
	(error, promise) => {

		return promise.resolve()
	}
)

const request = fly

export default request
