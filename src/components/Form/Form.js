import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'
import Preloader from '../Preloader/Preloader'
import './Form.scss'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { setSingleIsLoading, setSingleOperator } from '../../reducer/reducer'
import { getOperator, onSubmit } from '../../services/services'

const TextMaskCustom = props => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
      allowLeadingZeros={false}
      prefix='₽'
    />
  )
}

const Form = ({
  singleOperator,
  singleIsLoading,
  onChangePhoneNumber,
  phoneNumberValue,
  phoneError,
  isPhoneError,
  onChangeAmount,
  amountValue,
  isAmountError,
  amountError,
}) => {
  const dispatch = useDispatch()
  const { operatorId } = useParams()
  const navigate = useNavigate()
  const [isSubmitLoading, setIsLoading] = useState(false)
  const [errorMessage, setError] = useState('')

  useEffect(() => {
    dispatch(setSingleIsLoading(true))
    getOperator(+operatorId).then(res => {
      dispatch(setSingleOperator(res[0]))
      dispatch(setSingleIsLoading(false))
    })
    return () => {
      onChangePhoneNumber('')
      onChangeAmount('')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async e => {
    e.preventDefault()

    isPhoneError(false)
    isAmountError(false)

    if (phoneNumberValue === '') {
      isPhoneError(true)
      return
    }
    if (amountValue === '' || Number(amountValue) > 1000 || Number(amountValue) < 1) {
      isAmountError(true)
      return
    }

    if (phoneNumberValue && amountValue) {
      setIsLoading(true)
      setError('')
      const isSuccessResult = await onSubmit({ phoneNumberValue, amountValue })
      setIsLoading(false)
      if (isSuccessResult) {
        navigate('/')
      } else {
        setError('Something went wrong')
      }
    }
  }

  let spinner2 = singleIsLoading ? <Preloader /> : null
  let content = singleIsLoading ? null : (
    <div>
      <div className='slogan'>
        {singleOperator ? (
          <span>
            {singleOperator.name} - {singleOperator.slogan}
          </span>
        ) : null}
      </div>
      <div className='inner-logo'>
        <img src={singleOperator ? singleOperator.url : null} alt='' />
      </div>
      <Card style={{ maxWidth: 600, margin: '0 auto', padding: '0 5px' }}>
        <CardContent>
          {isSubmitLoading && <Preloader />}
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <OutlinedInput
                    value={phoneNumberValue}
                    onChange={e => {
                      onChangePhoneNumber(e.target.value)
                    }}
                    placeholder='Enter you phone number'
                    id='formatted-text-mask-input'
                    inputComponent={TextMaskCustom}
                    required={true}
                    error={phoneError}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  onChange={e => {
                    onChangeAmount(e.target.value)
                  }}
                  value={amountValue}
                  label='Payment amount'
                  placeholder='Enter enter payment amount'
                  variant='outlined'
                  fullWidth
                  required={true}
                  error={amountError}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid xs={12} item>
                <Button type='submit' variant='contained' fullWidth color='primary'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className='form-content'>
      {spinner2}
      {content}
    </div>
  )
}

export default Form
