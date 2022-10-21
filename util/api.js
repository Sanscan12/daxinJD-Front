import request from './@/util/request.js'
export function newList(params) {
    return request({
        url: 'news_list',
        method: 'get',
        data: params
    })
}
// 登录
export function userLogin(params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params,
        header: {
            "Authorization": 'token'
        }
    })
}
// 搜索
export function goodSearch(params) {
    return request({
        url: '/goods/search',
        method: 'post',
        data: params
    })
}
// 按sku查询商品详细
export function goodsDetail(params) {
    return request({
        url: `/goods/find/${params}`,
        method: 'get',
        data: {}
    })
}
// 修改商品
export function goodsEdit(params) {
    return request({
        url: `/goods/edit/${params.id}`,
        method: 'post',
        data: params
    })
}
