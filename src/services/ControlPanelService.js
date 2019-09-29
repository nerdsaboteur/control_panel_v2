import axios from 'axios'

// baseURL: 'https://mp-personal-planner.herokuapp.com',
const ApiClient = axios.create({
  baseURL: 'http://localhost:8088',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTasks() {
    return ApiClient.get('/tasks')
  },
  getReminders() {
    return ApiClient.get('/tasks/reminders')
  },
  getPriorities() {
    return ApiClient.get('/tasks/priorities')
  },
  deleteTask(id) {
    return ApiClient.get('/tasks/delete/' + id)
  },
  addTask(task) {
    return ApiClient.post('/tasks/insert/', task)
  },
  updateTask(id, task) {
    return ApiClient.post('/tasks/update/' + id, task)
  },
  getIncomes() {
    return ApiClient.get('incomes')
  },
  getIncomesProjected() {
    return ApiClient.get('incomes/projected')
  },
  getIncomesActual() {
    return ApiClient.get('incomes/actual')
  },
  updateIncome(id, income) {
    return ApiClient.post('/income/update/' + id, income)
  },
  deleteIncome(id) {
    return ApiClient.get('/income/delete/' + id)
  },
  addIncome(income) {
    return ApiClient.post('/income/insert/', income)
  },
  getExpenses() {
    return ApiClient.get('/expenses')
  },
  getExpense(id) {
    return ApiClient.get('/expense/' + id)
  },
  getExpenseCategories() {
    return ApiClient.get('/categories')
  },
  getExpensesByCategory(cat) {
    return ApiClient.get('expenses/cat/' + cat)
  },
  updateCategory(category) {
    return ApiClient.post('/category/update/' + category.id, category)
  },
  updateExpense(id, expense) {
    return ApiClient.post('/expense/update/' + id, expense)
  },
  updateRecurranceExpense(id, expense) {
    return ApiClient.post('/expense/recurrance/update/' + id, expense)
  },
  addExpense(expense) {
    return ApiClient.post('/expense/insert/', expense)
  },
  addRecurringExpense(expense) {
    return ApiClient.post('/expense/recurring/insert/', expense)
  },
  addExpenseCategory(category) {
    return ApiClient.post('/category/insert/', category)
  },
  deleteExpense(id) {
    return ApiClient.get('/expense/delete/' + id)
  },
  deleteCategory(id) {
    return ApiClient.get('/category/delete/' + id)
  },
  getCredit() {
    return ApiClient.get('/credit')
  },
  getCreditItem(id) {
    return ApiClient.get('/credit/' + id)
  },
  getCreditPayments() {
    return ApiClient.get('/credit/payments')
  },
  deleteCreditPayment(id) {
    return ApiClient.get('/credit/payment/delete/' + id)
  },
  updateCredit(credit) {
    return ApiClient.post('/credit/update/' + credit._id, credit)
  },
  deleteCredit(id) {
    return ApiClient.get('/credit/delete/' + id)
  },
  insertCredit(credit) {
    return ApiClient.post('/credit/insert/', credit)
  },
  getSavings() {
    return ApiClient.get('/savings')
  },
  updateSavings(id, savings) {
    return ApiClient.post('/savings/update/' + id, savings)
  },
  deleteSavings(id) {
    return ApiClient.get('/savings/delete/' + id)
  },
  insertSavings(credit) {
    return ApiClient.post('/savings/insert/', credit)
  },
  getDailies() {
    return ApiClient.get('/daily')
  },
  getDailyItem(id) {
    return ApiClient.get(`/daily/${id}`)
  },
  deleteDaily(id) {
    return ApiClient.get('/daily/delete/' + id)
  },
  addDaily(Daily) {
    return ApiClient.post('/daily/insert/', Daily)
  },
  updateDaily(id, Daily) {
    return ApiClient.post('/daily/update/' + id, Daily)
  },
  getSavingsTransactions() {
    return ApiClient.get('/savings/transactions')
  },
  insertSavingsTransaction(transaction) {
    return ApiClient.post('/savings/transaction/insert/', transaction)
  },
  getBudgetTransactions() {
    return ApiClient.get('/budget/transactions')
  },
  insertBudgetTransaction(transaction) {
    return ApiClient.post('/budget/transaction/insert/', transaction)
  },
  deleteBudgetTransaction(id) {
    console.log('inside delete' + id)
    return ApiClient.get('/budget/transaction/delete/' + id)
  },
  setCurrentExpenses(expenses) {
    console.log('setting')
    console.log(expenses)
    return ApiClient.post('/current/insert', expenses)
  },
  getCurrentExpenses() {
    return ApiClient.get('/current')
  },
  removeCurrentExpense(id) {
    return ApiClient.get('/current/delete/' + id)
  },
  getAllEvents() {
    return ApiClient.get('/events')
  },
  insertEvent(payload) {
    return ApiClient.post('/events/insert', payload)
  },
  updateEvent(id, payload) {
    return ApiClient.post(`/events/update/${id}`, payload)
  },
  deleteEvent(id) {
    return ApiClient.get(`/events/delete/${id}`)
  }
}
