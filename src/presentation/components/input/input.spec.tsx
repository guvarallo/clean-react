import React from 'react'

import Context from '@/presentation/contexts/form/form-context'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import Input from './input'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should focus input on lable click', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
