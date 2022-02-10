const GET_ALL_OPERATORS = 'GET_ALL_OPERATORS'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_SINGLE_OPERATOR = 'SET_SINGLE_OPERATOR'
const SET_SINGLE_IS_LOADING = 'SET_SINGLE_IS_LOADING'
const SET_PARAMS_ID = 'SET_PARAMS_ID'
const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER'
const SET_PHONE_ERROR = 'SET_PHONE_ERROR'
const SET_AMOUNT = 'SET_AMOUNT'
const SET_AMOUNT_ERROR = 'SET_AMOUNT_ERROR'

const initialState = {
  operators: null,
  isLoading: false,
  singleOperator: null,
  singleIsLoading: false,
  paramId: 1,
  phoneNumberValue: '',
  phoneError: false,
  amountValue: '',
  amountError: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OPERATORS:
      return {
        ...state,
        operators: action.data,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.status,
      }

    case SET_SINGLE_OPERATOR:
      return {
        ...state,
        singleOperator: action.operator,
      }
    case SET_SINGLE_IS_LOADING:
      return {
        ...state,
        singleIsLoading: action.status,
      }
    case SET_PARAMS_ID:
      return {
        paramId: action.id,
      }
    case SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumberValue: action.value,
      }
    case SET_PHONE_ERROR:
      return {
        ...state,
        phoneError: action.status,
      }
    case SET_AMOUNT:
      return {
        ...state,
        amountValue: action.value,
      }
    case SET_AMOUNT_ERROR:
      return {
        ...state,
        amountError: action.status,
      }
    default:
      return state
  }
}

export const getAllOperators = data => ({ type: GET_ALL_OPERATORS, data })
export const setIsLoading = status => ({ type: SET_IS_LOADING, status })
export const setSingleOperator = operator => ({ type: SET_SINGLE_OPERATOR, operator })
export const setSingleIsLoading = status => ({ type: SET_SINGLE_IS_LOADING, status })
export const setParamsId = id => ({ type: SET_PARAMS_ID, id })
export const setPhoneNumber = value => ({ type: SET_PHONE_NUMBER, value })
export const setPhoneError = status => ({ type: SET_PHONE_ERROR, status })
export const setAmount = value => ({ type: SET_AMOUNT, value })
export const setAmountError = status => ({ type: SET_AMOUNT_ERROR, status })
