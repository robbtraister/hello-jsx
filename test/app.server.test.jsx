'use strict'

/* global describe, expect, it */

import React from 'react'
import renderer from 'react-test-renderer'

import { Page } from '../src/app/_entry/server'

describe('snapshots', () => {
  it('render home page', () => {
    const tree = renderer
      .create(<Page location='/home' />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('render score page', () => {
    const tree = renderer
      .create(<Page location='/score' />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('render guidance page', () => {
    const tree = renderer
      .create(<Page location='/guidance' />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
