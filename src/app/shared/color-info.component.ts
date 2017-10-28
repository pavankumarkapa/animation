import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'color-info',
  template: `
    <div class="color-info"></div>
  `,
  styles: []
})
export class ColorInfoComponent implements OnInit, OnChanges {
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
      // console.log('COLORCHART INITIALIZE');
      this.initializeChart();
    }

    if (this.data) {
      this.clearChart();
      this.renderChart();
    }
  }

  private initializeChart() {
    d3.select(this.el.nativeElement.querySelector('.color-info')).select('svg').remove();
    this.svg = d3.select(this.el.nativeElement.querySelector('.color-info'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(this.responsivefy)
      // .style('background-color', 'grey')
    ;

    this.width = this.width - ( this.margin.right + this.margin.left );
    this.height = this.height - ( this.margin.top + this.margin.bottom );

    this.g = this.svg.append('g')
      .attr('class', 'body')
      ;

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
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const tg = this.g.selectAll('g')
      .data(this.data)
      .enter()
      .append('g');

    tg.append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 35)
      .attr('width', 25)
      .attr('height', 25)
      .attr('fill', (d, i) => colorScale(i));

    tg.append('text')
      .attr('x', 35)
      .attr('y', (d, i) => i * 35 + 8)
      .attr('font-size', 25)
      .attr('dominant-baseline', 'central')
      .text(d => d.key);
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
