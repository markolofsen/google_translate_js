var axios = require('axios');


GLOBAL_DOMAIN = 'http://kupi.net'
GLOBAL_API_KEY = false


function apiRoute(arr) {
    let url = `${GLOBAL_DOMAIN}/api/v1/${GLOBAL_API_KEY}/`
        url += arr.join('/')
        url = url.toLowerCase()

    console.log(url)

    let data = axios.get(url).then(response => {
    	return response.data
    }).catch(error => {
    	console.log(error);
    });

    return data
}

function KUPINET(apikey) {
    // Set api key as global
    GLOBAL_API_KEY = apikey
}

KUPINET.prototype.getStocksAllPairs = function(stock_name) {
    return apiRoute(['stocks', stock_name, 'all-pairs'])
}
KUPINET.prototype.getStocksOrders = function(stock_name, coin_from, coin_to) {
    return apiRoute(['stocks', stock_name, 'orders', coin_from, coin_to])
}
KUPINET.prototype.getAllStocks = function() {
    return apiRoute(['stocks-list'])
}
KUPINET.prototype.getPairBestPrices = function(coin_from, coin_to) {
    return apiRoute(['pairs', 'best-prices', coin_from, coin_to])
}
KUPINET.prototype.getCoinBestPricesAsk = function(coin) {
    return apiRoute(['best-prices', 'ask', coin])
}
KUPINET.prototype.getCoinBestPricesBid = function(coin) {
    return apiRoute(['best-prices', 'bid', coin])
}
KUPINET.prototype.getCalcData = function(coin) {
    return apiRoute(['calc', 'data'])
}
KUPINET.prototype.getCalculation = function(coin_from, coin_to, amount) {
    return apiRoute(['calc', 'math', coin_from, coin_to, amount])
}

getAllStocks() {
    return 'getAllStocks!!!'
}

module.exports = () => {
  console.log('WORKING GOOD!!!!')
};
module.exports.getAllStocks = getAllStocks;
// async getAllStocks = (apikey) => {
//     let KUPI = new KUPINET(apikey);
//     return await KUPI.getAllStocks()
// }

// async function check() {
//     let KUPI = new KUPINET('freeApi');
//
//     let getAllStocks = await KUPI.getAllStocks()
//     let getStocksOrders = await KUPI.getStocksOrders('Binance','ETH','BTC')
//     let getStocksAllPairs = await KUPI.getStocksAllPairs('Binance')
//     let getPairBestPrices = await KUPI.getPairBestPrices('LTC','ETH')
//     let getCoinBestPricesAsk = await KUPI.getCoinBestPricesAsk('LTC')
//     let getCoinBestPricesBid = await KUPI.getCoinBestPricesBid('LTC')
//     let getCalcData = await KUPI.getCalcData()
//     let getCalculation = await KUPI.getCalculation('LTC','ETH', 10)
//
//     console.log( getCalculation )
// }
//
// check()




// Token for API Authorization
let GLOBAL_RESPONSE_STATUS = true
function applyAxiosSettings() {
    axios.interceptors.response.use(response => {
        GLOBAL_RESPONSE_STATUS = true
        return response;
    }, error => {

        if (!error.response) {
            // console.log('Network error!')
            GLOBAL_RESPONSE_STATUS = 'Network error!'
        } else {
            console.log(error.response.status)
            GLOBAL_RESPONSE_STATUS = error.response.status
            return error.response
        }
        return Promise.reject(error.response);
    })


} applyAxiosSettings()
