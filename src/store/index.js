import Vue from 'vue'
import Vuex from 'vuex'
import ControlPanelService from './../services/ControlPanelService.js'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      menuOne: true,
      menuTwo: false,
      // menuList: [{
      //   icon: 'inbox',
      //   label: 'Inbox',
      //   separator: true
      // },
      // {
      //   icon: 'send',
      //   label: 'Outbox',
      //   separator: false
      // },
      // {
      //   icon: 'delete',
      //   label: 'Trash',
      //   separator: false
      // },
      // {
      //   icon: 'error',
      //   label: 'Spam',
      //   separator: true
      // },
      // {
      //   icon: 'settings',
      //   label: 'Settings',
      //   separator: false
      // }
      // ],
      tasks: [],
      routines: [],
      total_actual_income: 0,
      total_projected_income: 0,
      income_projected: 0,
      income_actual: 0,
      expenses: [],
      expense: null,
      active_expenses: [],
      inactive_expenses: [],
      expense_categories: [],
      expense_by_category: [],
      credit: [],
      savings: []
    },
    mutations: {
      setMenuState (state) {
        this.state.menuOne = !this.state.menuOne
        this.state.menuTwo = !this.state.menuTwo
      },
      // setDrawerOptions (state, menu) {
      //   this.state.menuList = menu
      // },
      setTasks (state, data) {
        this.state.tasks = data
      },
      setRoutines (state, data) {
        this.state.routines = data
      },
      setIncomes (state, payload) {
        this.state.total_actual_income = 0
        this.state.total_projected_income = 0

        this.state.income_projected = payload.filter(item => item.type === 'projected')
        this.state.income_projected.forEach(item => this.state.total_projected_income += Number(item.amount))

        this.state.income_actual = payload.filter(item => item.type === 'actual')
        this.state.income_actual.forEach(item => this.state.total_actual_income += Number(item.amount))
      },
      setExpenses (state, payload) {
        this.state.expenses = payload
        this.state.active_expenses = payload.filter(i => i.active === 'yes')
        this.state.inactive_expenses = payload.filter(i => i.active === 'no')
      },
      setExpense (state, val) {
        this.state.expense = val
        // this.state.active_expenses = payload.filter(i => i.active === 'yes')
        // this.state.inactive_expenses = payload.filter(i => i.active === 'no')
      },
      setExpenseCategory (state, payload) {
        state.expense_categories = payload
      },
      setExpensesByCategory (state, payload) {
        state.expense_by_category = payload
      },
      setCredit (state, payload) {
        console.log(payload)
        state.credit = payload
      },
      setSavings (state, payload) {
        state.savings = payload
      }
    },
    actions: {
      setMenuState ({
        commit
      }) {
        commit('setMenuState')
      },
      // setDrawerOptions ({
      //   commit
      // }, menu) {
      //   console.log(menu)
      //   commit('setDrawerOptions', menu)
      // },
      getTasks ({
        commit
      }) {
        ControlPanelService.getTasks()
          .then(res => {
            commit('setTasks', res.data)
          })
          .catch(error => console.log(error))
      },
      getRoutines ({
        commit
      }) {
        ControlPanelService.getDailies()
          .then(res => {
            commit('setRoutines', res.data)
          })
          .catch(error => console.log(error))
      },

      getIncomes ({
        commit
      }) {
        console.log('getIncomes')
        ControlPanelService.getIncomes().then(res => {
          console.log(res.data)
          commit('setIncomes', res.data)
        })
      },
      getExpenses ({
        commit
      }) {
        ControlPanelService.getExpenses()
          .then(res => {
            // console.log(res.data)
            commit('setExpenses', res.data)
          })
          .catch(err => console.log(err))
      },
      getExpense ({
        commit
      }, id) {
        ControlPanelService.getExpense(id)
          .then(res => {
            // console.log(res.data)
            commit('setExpense', res.data)
          })
          .catch(err => console.log(err))
      },
      addExpense ({
        commit

      }, expense) {
        ControlPanelService.addExpense(expense)
          .then(res => {
            commit('setExpenses', res.data)
          })
      },
      deleteExpense ({
        commit
      }, id) {
        ControlPanelService.deleteExpense(id)
          .then(res => {
            commit('setExpenses', res.data)
          })
          .catch(err => console.log(err))
      },
      updateExpense ({
        commit
      }, expense) {
        ControlPanelService.updateExpense(expense._id, expense)
          .then(res => {
            commit('setExpense', res.data)
          })
          .catch(err => console.log(err))
      },
      getExpensesByCategory ({
        commit
      }, category) {
        console.log('category')
        ControlPanelService.getExpensesByCategory(category)
          .then((res) => {
            console.log(res.data)
            commit('setExpensesByCategory', res.data)
          })
      },

      getExpenseCategories ({
        commit
      }) {
        ControlPanelService.getExpenseCategories().then(res => {
          commit('setExpenseCategory', res.data)
        })
      },
      addExpenseCategory ({
        commit
      }, category) {
        ControlPanelService.addExpenseCategory(category)
          .then((res) => commit('setExpenseCategory', res.data))
      },
      updateCategory ({
        commit
      }, payload) {
        ControlPanelService.updateCategory(payload)
          .then((res) => commit('setExpenseCategory', res.data))
      },
      deleteCategory ({
        commit
      }, id) {
        console.log('ID ' + id)
        ControlPanelService.deleteCategory(id)
          .then((res) => commit('setExpenseCategory', res.data))
      },
      getCredit ({
        commit
      }) {
        ControlPanelService.getCredit().then(res => {
          commit('setCredit', res.data)
        })
      },
      insertCredit ({
        commit
      }, payload) {
        ControlPanelService.insertCredit(payload)
          .then(res => {
            console.log('insert' + JSON.stringify(res.data))
            commit('setCredit', res.data)
          })
          .catch(() => console.log(e))
      },
      deleteCredit ({
        commit
      }, id) {
        ControlPanelService.deleteCredit(id)
          .then(res => {
            commit('setCredit', res.data)
          })
          .catch(err => console.log(err))
      },
      updateCredit ({
        commit
      }, credit) {
        ControlPanelService.updateCredit(credit)
          .then(res => {
            commit('setCredit', res.data)
          })
          .catch(err => console.log(err))
      },
      getSavings ({
        commit
      }) {
        ControlPanelService.getSavings().then(res => {
          commit('setSavings', res.data)
        })
      },
      insertSavings ({
        commit
      }, payload) {
        ControlPanelService.insertSavings(payload)
          .catch(() => console.log(e))
      },
      deleteSavings ({
        commit
      }, id) {
        ControlPanelService.deleteSavings(id)
          .catch(err => console.log(err))
      },
      updateSavings ({
        context
      }, savings) {
        ControlPanelService.updateSavings(savings._id, savings)
          .catch(err => console.log(err))
      }
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}
