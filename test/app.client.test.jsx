'use strict'

/* global describe, expect, it */

import React from 'react'
import renderer from 'react-test-renderer'

import { Page } from '../src/app/_entry/client'

describe('snapshots', () => {
  it('render home page', () => {
    const tree = renderer
      .create(<Page />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  // it('render score page', () => {
  //   const tree = renderer
  //     .create(<App />)
  //     .toJSON()

  //   expect(tree).toMatchSnapshot()
  // })

  // it('render guidance page', () => {
  //   const tree = renderer
  //     .create(<App />)
  //     .toJSON()

  //   expect(tree).toMatchSnapshot()
  // })
})
