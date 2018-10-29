import React from 'react'
import { FILTERS } from '../redux/filter'

const TodoFilter = props => (
  <div>
    {FILTERS.map(filter => (
      <span key={filter}>
        <a 
          onClick={() => props.setFilter(filter)}
          style={{ color: props.currentFilter === filter ? 'red' : 'blue' }}
        >{filter}</a>
        {' '}
      </span>
    ))}
  </div>
)

export default TodoFilter