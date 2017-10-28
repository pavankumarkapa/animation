import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'g-bar-chart',
  template: `
    <div class="g-bar-chart"></div>
  `,
  styles: []
})
export class GroupedBarChartComponent implements OnInit, OnChanges {
  @Input() data;
  svg;
  g;
  width = 400;
  height = 275;
  margin = {
    top: 50,
    right: 25,
    bottom: 20,
    left: 40
  };

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.g) {
      // console.log('GBARCHART INITIALIZE');
      this.initializeChart();
    }

    if (this.data) {
      this.clearChart();
      this.renderChart();
    }
  }

  private initializeChart() {
    d3.select(this.el.nativeElement.querySelector('.g-bar-chart')).select('svg').remove();
    this.svg = d3.select(this.el.nativeElement.querySelector('.g-bar-chart'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(this.responsivefy)
      .style('background-color', 'grey')
    ;

    this.width = this.width - ( this.margin.right + this.margin.left );
    this.height = this.height - ( this.margin.top + this.margin.bottom );

    this.g = this.svg.append('g')
      .attr('class', 'body')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.data = this.data || [
        { type: 'flopCBetIP', MICRO: 0.6, MEDIUM: 0.5},
        { type: 'flopCBetOOP', MICRO: 1.0, MEDIUM: 0.2},
        { type: 'turnCBetIP', MICRO: 0.3, MEDIUM: 0.7},
        { type: 'turnCBetOOP', MICRO: 1.0, MEDIUM: 1.0}
      ];

    this.data.columns = ['NETLOSS', 'NETWIN'];
  }

  private clearChart() {
    // d3.select(this.el.nativeElement.querySelector('.h-bar-chart')).select('svg').remove();
    this.g.selectAll('*').remove();
  }

  private renderChart() {
    this.data = this.data || [
        { type: 'player1', MICRO: 0.6, MEDIUM: 0.5},
        { type: 'player2', MICRO: 1.0, MEDIUM: 0.2},
        { type: 'player3', MICRO: 0.3, MEDIUM: 0.7},
        { type: 'player4', MICRO: 1.0, MEDIUM: 1.0}
      ];
    this.data.columns = ['NETLOSS', 'NETWIN'];

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const legend = this.svg.append('g')
      .attr('font-size', 10)
      .attr('text-anchor', 'start')
      .attr('class', 'legend')
      .attr('transform', `translate(${this.width}, 5)`)
      .selectAll('g')
      .data(this.data.columns)
      .enter()
      .append('g');

    legend.append('rect')
      .attr('y', (d, i) => (i * 15) + 2)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colorScale);

    legend.append('text')
      .attr('x', 15)
      .attr('y', (d, i) => ((i + 1) * 12))
      .text((d) => d);

    const xScale = d3.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.1);

    const yScale = d3.scaleLinear()
      .rangeRound([this.height, 0]);

    const typeScale = d3.scaleBand()
      .paddingOuter(.5);

    // console.log(this.data);
    const keys = this.data.columns;

    xScale.domain(this.data.map((d) => d.type));
    typeScale.domain(keys).rangeRound([0, xScale.bandwidth()]);
    yScale.domain([0, d3.max(this.data, (d): number => {
      return d3.max(keys, (key: string): number => d[key]);
    })]);

    this.g.append('g')
      .attr('class', 'chart')
      .selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d.type)}, 0)`)
      .selectAll('rect')
      .data((d) => {
        return keys.map((key) => {
          const temp = {
            key: key,
            value: d[key]
          };
          // console.log(d);
          // console.log(temp);
          return temp;
        });
      })
      .enter()
      .append('rect')
      .attr('x', (d) => typeScale(d.key))
      .attr('y', (d) => yScale(d.value))
      .attr('width', typeScale.bandwidth())
      .attr('height', (d) => this.height - yScale(d.value))
      .attr('fill', (d) => colorScale(d.key));

    this.g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(xScale));

    this.g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(yScale));
  }

  responsivefy(svg) {
    // get container + svg aspect ratio
    const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('perserveAspectRatio', 'xMinYMid')
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on('resize.' + container.attr('id'), resize);

    // get width of container and resize svg to fit it
    function resize() {
      const targetWidth = parseInt(container.style('width'), 10);
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    }
  }
}
