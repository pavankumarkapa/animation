import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'system-animation',
  templateUrl: './system-animation.component.html',
  styleUrls: ['./system-animation.component.scss']
})
export class SystemAnimationComponent implements OnInit, OnChanges {

  @Input() data;
  svg;
  g;
  width = 1000;
  height = 750;
  margin = {
    top: 75,
    right: 150,
    bottom: 25,
    left: 55
  };

  constructor(private el: ElementRef) {
    this.data = [
      { key: '', value: 250 },
      { key: '', value: 200 },
      { key: '', value: 150 },
      { key: '', value: 100 },
      { key: '', value: 50 }
    ];
  }

  ngOnInit() {
    this.initializeChart();
    this.renderChart();
  }

  ngOnChanges() {
    // if (!this.g) {
    //   console.log('TREECHART INITIALIZE');
    //   this.initializeChart();
    // }
    //
    // if (this.data) {
    //   this.clearChart();
    //   this.renderChart();
    // }
  }

  private initializeChart() {
    this.svg = d3.select(this.el.nativeElement.querySelector('.system-animation'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      // .call(this.responsivefy)
      .style('background-color', 'light-grey')
    ;

    this.width = this.width - ( this.margin.right + this.margin.left );
    this.height = this.height - ( this.margin.top + this.margin.bottom );

    this.g = this.svg.append('g')
      .attr('class', 'body')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private renderChart() {
    const blackBar = this.g.append('g')
      .attr('class', 'right-bar');
    blackBar.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('width', (d) => this.width)
      .attr('y', (d, i) => 50 * i)
      .attr('height', 20)
      .attr('stroke-width', 0.25)
      .attr('stroke', 'white')
      .attr('fill', 'black')
    ;

    const greyBar = this.g.append('g')
      .attr('class', 'grey-bar');
    greyBar.selectAll('rect.left')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'left')
      .attr('x', 0)
      .attr('width', (d) => d.value)
      .attr('y', (d, i) => 50 * i)
      .attr('height', 20)
      .attr('fill', 'grey')
      ;

    const greyBarRight = this.g.append('g')
      .attr('class', 'red-bar');
    greyBarRight.selectAll('rect.right')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'right')
      .attr('x', (d) => this.width - d.value)
      .attr('width', (d) => d.value)
      .attr('y', (d, i) => 50 * i)
      .attr('height', 20)
      .attr('fill', 'grey')
    ;
  }

  private clearChart() {
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
