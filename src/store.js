import Vue from 'vue';
import Vuex from 'vuex';
import Stocks from './data/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockList: Stocks,
    money: 8000,
  },
  getters: {
    getStocks(state) {
      return state.stockList.map(company => ({
        name: company.companyName,
        price: company.price,
      }));
    },
    getPortfolio(state) {
      return state.stockList
        .filter(company => company.quantity > 0)
        .map(company => ({
          name: company.companyName,
          price: company.price,
          quantity: company.quantity,
        }));
    },
    getMoney(state) {
      return state.money;
    },
  },
  mutations: {
    buyStock(state, payload) {
      const company = state.stockList.find(stock => stock.companyName === payload.stockName);
      const value = company.price * payload.quantity;
      state.money -= value;
      company.quantity += payload.quantity;
    },
    sellStock(state, payload) {
      const company = state.stockList.find(stock => stock.companyName === payload.stockName);
      const value = company.price * payload.quantity;
      state.money += value;
      company.quantity -= payload.quantity;
    },
  },
  actions: {

  },
});
/*


        name: company.companyName,
            price: company.price,
            quantity: company.quantity,

      */
