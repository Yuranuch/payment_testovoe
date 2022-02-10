import React from 'react'
import './Content.scss'
import { Link } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'

const Content = ({ operators, isLoading }) => {
  let elements = operators
    ? operators.map(operator => (
        <li key={operator.id}>
          {/*let elements = (operators)? operators.map( (operator) =><li key={operator.id} onClick={getOperatorId()}>*/}
          <Link to={`/form/${operator.id}`}>
            <img src={operator.url} alt='' />
            <span>{'Payment terminal for the ' + operator.name}</span>
          </Link>
        </li>
      ))
    : null
  let spinner = isLoading ? <Preloader /> : null

  return (
    <div className='content'>
      {spinner}
      <ul className='operators-list'>{elements}</ul>
    </div>
  )
}

export default Content
