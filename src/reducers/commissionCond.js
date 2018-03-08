const commissionCond = (state = {
  pickedUser: [],
  pickedDate: [],
  pageId: 0,
  category: '',
  customer: '',
}, action = {}) => {
  switch (action.type) {
    case 'SET_COMMISSION_COND':
      return Object.assign({}, state, action.commissionCond)
    default:
      return state
  }
}

export default commissionCond
