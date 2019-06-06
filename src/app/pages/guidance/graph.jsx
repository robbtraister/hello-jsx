'use strict'

import React, { PureComponent } from 'react'
import * as d3 from 'd3'

const data = [5, 2, 6, 2, 7, 8, 3, 9]

class Graph extends PureComponent {
  constructor (props) {
    super(props)

    this.height = this.props.height || 300
    this.width = this.props.width || 400

    this.svg = React.createRef()

    this.x = d3.scaleLinear().domain([0, 10]).range([10, this.width - 10])
    this.y = d3.scaleLinear().domain([0, 10]).range([this.height - 10, 10])
  }

  componentDidMount () {
    this.draw()
  }

  draw () {
    const svg = d3.select(this.svg.current)
    const line = svg.select('.line')

    const d = d3.line()
      .x((d, i) => this.x(i))
      .y((d, i) => this.y(d))

    line
      .datum([...new Array(data.length)].map(() => 0))
      .attr('d', d)

    line
      .datum(data)
      .transition()
      .duration(1000)
      .attr('d', d)
  }

  render () {
    return (
      <svg
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${this.width} ${this.height}`}
        ref={this.svg}
      >
        <path d='M5,5h390v290h-390z' stroke='#000' fill='none' />
        <path className='line' stroke='#0a0' strokeWidth='5' fill='none' />
      </svg>
    )
  }
}

export default Graph
