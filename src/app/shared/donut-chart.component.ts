import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'donut-chart',
  template: `
    <div class="donut-chart"></div>
  `,
  styles: []
})
export class DonutChartComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() radius = 60;
  @Input() innerRadius = 35;
  @Input() showHealthPercentage = false;
  @Input() showHealth = false;
  @Input() threshold = 50;
  svg;
  g;
  width = 120;
  height = 120;
  duration = 1000;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // this.initializeChart();
    // this.renderChart();
  }

  ngOnChanges() {
    if (!this.g) {
      // console.log('DONUTCHART INITIALIZE');
      this.initializeChart();
    }

    if (this.data) {
      this.clearChart();
      this.renderChart();
    }
  }

  private initializeChart() {
    this.svg = d3.select(this.el.nativeElement.querySelector('.donut-chart'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(this.responsivefy)
    // .style('background-color', 'grey')
      ;

    this.g = this.svg.append('g')
      .attr('class', 'body');

    this.data = this.data || [{
      key: 'flopCBetOOP',
      value: 70
    }, {
      key: 'turnCBetIP',
      value: 30
    }];
  }

  private clearChart() {
    // d3.select(this.el.nativeElement.querySelector('.h-bar-chart')).select('svg').remove();
    this.g.selectAll('*').remove();
  }

  private renderChart() {
    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value((d: any) => d.value);

    const arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.innerRadius);

    if (this.showHealth && this.data.length === 2) {
      const alertInfo = this.data.filter((d) => d.failure === true)
        .reduce((p = {}, c) => c);
      const alert = alertInfo.value > this.threshold;
      this.g.append('g')
        .attr('class', 'health-status')
        .append('circle')
        .attr('r', this.innerRadius - 5)
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .style('fill', alert ? '#ef0302' : '#219f3b');
    }

    if (this.showHealthPercentage) {
      const healthInfo = this.data.filter((d) => d.failure === false)
        .reduce((p = {}, c) => c);
      this.g.append('g')
        .attr('class', 'health-percentage')
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height / 2 + 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 30)
        .style('fill', 'white')
        .text(healthInfo.value);
    }

    const pieG = this.g.append('g')
      .attr('class', 'pie')
      .attr('transform', `translate(${this.radius}, ${this.radius})`);

    const pieSlices = pieG.selectAll('path.arc')
      .data(pie(this.data));

    pieSlices.enter()
      .append('path')
      .attr('class', 'arc')
      .attr('fill', (d, i) => colors(i))
      .transition()
      .duration(this.duration)
      .attrTween('d', (d) => {
        const startAngle = {
          startAngle: 0,
          endAngle: 0
        };
        const interpolate = d3.interpolate(startAngle, d);
        return (t) => arc(interpolate(t));
      });
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
