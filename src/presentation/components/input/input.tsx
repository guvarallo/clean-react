import React, { useContext, useRef } from 'react'

import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=' '
        data-testid={props.name}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Looks good'}
        className={Styles.status}
      >
        {error ? '⚠️' : '✔'}
      </span>
    </div>
  )
}

export default Input
