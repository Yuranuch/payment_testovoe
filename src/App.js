import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import { useDispatch, useSelector } from 'react-redux'
import Form from './components/Form/Form'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router'
import { getOperators } from './services/services'
import {
  getAllOperators,
  setAmount,
  setAmountError,
  setIsLoading,
  setPhoneError,
  setPhoneNumber,
} from './reducer/reducer'
import Footer from './components/Footer/Footer'

function App() {
  const operators = useSelector(state => state.operators)
  const isLoading = useSelector(state => state.isLoading)
  // const operatorId = useSelector(state => state.operatorId)
  const singleOperator = useSelector(state => state.singleOperator)
  const singleIsLoading = useSelector(state => state.singleIsLoading)
  const phoneNumberValue = useSelector(state => state.phoneNumberValue)
  const phoneError = useSelector(state => state.phoneError)
  const amountValue = useSelector(state => state.amountValue)
  const amountError = useSelector(state => state.amountError)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoading(true))
    getOperators().then(res => {
      dispatch(getAllOperators(res))
      dispatch(setIsLoading(false))
    })
  }, [dispatch])

  const onChangePhoneNumber = event => {
    isPhoneError(false)
    dispatch(setPhoneNumber(event))
  }
  const isPhoneError = status => {
    dispatch(setPhoneError(status))
  }
  const onChangeAmount = event => {
    isAmountError(false)
    dispatch(setAmount(event))
  }
  const isAmountError = status => {
    dispatch(setAmountError(status))
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Content operators={operators} isLoading={isLoading} />} />
          <Route
            exact
            path='/form/:operatorId'
            element={
              <Form
                singleOperator={singleOperator}
                singleIsLoading={singleIsLoading}
                onChangePhoneNumber={onChangePhoneNumber}
                phoneNumberValue={phoneNumberValue}
                phoneError={phoneError}
                isPhoneError={isPhoneError}
                onChangeAmount={onChangeAmount}
                amountValue={amountValue}
                isAmountError={isAmountError}
                amountError={amountError}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
