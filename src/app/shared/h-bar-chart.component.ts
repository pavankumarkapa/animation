import { Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'h-bar-chart',
  template: `
    <div class="h-bar-chart"></div>
  `,
  styles: [`
    ::ng-deep .h-bar-chart-axis text {
      fill: #FFFFFF;
    }
  `]
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() xLegend;
  @Input() yLegend;
  @Input() axis = true;
  constructed = false;
  svg;
  g;
  width = 400;
  height = 275;
  margin = {
    top: 25,
    right: 25,
    bottom: 40,
    left: 40
  };

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.g) {
      // console.log('HBARCHART INITIALIZE');
      this.initializeChart();
    }

    if (this.data) {
      this.clearChart();
      this.renderChart();
    }
  }

  private initializeChart() {
    this.svg = d3.select(this.el.nativeElement.querySelector('.h-bar-chart'))
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

    const t = [
        { key: 'pp_pokerauto997109', value: 115000 },
        { key: 'pp_pokerauto997111', value: 285000 },
        { key: 'pp_pokerauto997125', value: 1285000 },
        { key: 'pp_pokerauto997199', value: 1395000 },
        { key: 'pp_pokerauto997309', value: 85000 }
    ];
    this.data = this.data || t;
  }

  private clearChart() {
    // d3.select(this.el.nativeElement.querySelector('.h-bar-chart')).select('svg').remove();
    this.g.selectAll('*').remove();
  }

  private renderChart() {
    this.data.sort((a, b) => a.value - b.value);
    const xScale = d3.scaleLinear()
      .range([0, this.width]);

    const yScale = d3.scaleBand()
      .range([this.height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    xScale.domain([0, d3.max(this.data, (d: any): number => d.value)]);
    yScale.domain(this.data.map((d) => d.key)).padding(0.1);

    this.g.append('g')
      .attr('class', 'chart')
      .selectAll('rect.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.key))
      .attr('height', yScale.bandwidth())
      .attr('width', (d) => xScale(d.value))
      .attr('fill', colorScale);

    if (this.axis) {
      this.g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(xScale).ticks(5));

      this.g.append('g')
        .attr('class', 'axis')
        .attr('class', 'h-bar-chart-axis')
        .call(d3.axisRight(yScale));

      this.g.append('g')
        .attr('class', 'x-legend')
        .attr('transform', `translate(${this.width / 2}, ${this.height + this.margin.bottom - 10})`)
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', '#000')
        .text(this.xLegend)
        .call(d3.axisRight(yScale));

      this.g.append('g')
        .attr('class', 'y-legend')
        .append('text')
        .attr('transform', `translate(-10, ${this.height / 2}) rotate(-90)`)
        .style('text-anchor', 'middle')
        .style('fill', '#000')
        .text(this.yLegend)
        .call(d3.axisRight(yScale));
    }
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
