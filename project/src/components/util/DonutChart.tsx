import * as d3 from 'd3'
import React, { Fragment, useEffect, useRef } from 'react'

export function DonutChart(props: { wholeNumber: number; partNumber: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const data = [
        { name: 'part', value: props.partNumber },
        { name: 'whole', value: props.wholeNumber - props.partNumber },
      ]

      d3.select(ref.current).selectAll('svg').remove()

      const width = 40
      const height = Math.min(width, 40)
      const radius = Math.min(width, height) / 2

      const arc = d3
        .arc<d3.PieArcDatum<{ name: string; value: number }>>()
        .innerRadius(radius * 0.5)
        .outerRadius(radius - 1)

      const pie = d3
        .pie<{ name: string; value: number }>()
        .sort(null)
        .value(d => d.value)

      const color = d3
        .scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(['var(--color-primary-default)', 'var(--color-secondary-default)'])

      const svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;')
        .append('g')
        .selectAll()
        .data(pie(data))
        .join('path')
        .attr('fill', d => color(d.data.name) as string)
        .attr('d', arc)
        .append('title')
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`)
    }
  }, [props.partNumber])

  return <div ref={ref} />
}
