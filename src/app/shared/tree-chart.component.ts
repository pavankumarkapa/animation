import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3/index';
import { select } from 'd3-selection';

@Component({
  selector: 'tree-chart',
  template: `
    <div class="tree-chart"></div>
  `,
  styles: [`
    ::ng-deep .node circle {
      cursor: pointer;
      fill: #fff;
      stroke: steelblue;
      stroke-width: 1.5px;
    }

    ::ng-deep .node text {
      font-size: 1em;
    }

    ::ng-deep path.link {
      fill: none;
      stroke: #ccc;
      stroke-width: 1.5px;
    }
  `]
})
export class TreeChartComponent implements OnInit, OnChanges {
  @Input() data;
  svg;
  g;
  width = 1000;
  height = 750;
  duration = 300;
  root;
  nodes;
  margin = {
    top: 25,
    right: 200,
    bottom: 25,
    left: 200
  };

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.initializeChart();
    this.renderChart();
  }

  ngOnChanges() {
    if (!this.g) {
      console.log('TREECHART INITIALIZE');
      this.initializeChart();
    }

    if (this.data) {
      this.clearChart();
      this.renderChart();
    }
  }

  private initializeChart() {
    this.svg = d3.select(this.el.nativeElement.querySelector('.tree-chart'))
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

    this.data = {
      'name': 'partypoker390',
      'online': true,
      'details': '',
      'children': [
        {
          'name': 'pokerauto93',
          'online': true,
          'details': 'Both are colluding aganist each other',
          'children': [
            {'name': 'spartanit1', 'online': true, 'details': 'Has same ucid'},
            {'name': 'spartanit9', 'online': false, 'details': 'Email ids are same'},
            {'name': 'HierarchicalCluster', 'online': false, 'details': 'Both are colluding aganist each other'}
          ]
        },
        {
          'name': 'graph',
          'online': true,
          'details': 'Playing from same location',
          'children': [
            {'name': 'bwinit90', 'online': true, 'details': 'Playing from same location'},
            {'name': 'premiums908', 'online': true, 'details': 'Has same ucid'},
            {'name': 'spartanit1', 'online': true, 'details': 'Both are colluding aganist each other'},
            {'name': 'spartanit9', 'online': false, 'details': 'Email ids are same'},
            {'name': 'HierarchicalCluster', 'online': true, 'details': 'Playing from same location'}
          ]
        }
      ]
    };
  }

  private clearChart() {
    // d3.select(this.el.nativeElement.querySelector('.h-bar-chart')).select('svg').remove();
    this.g.selectAll('*').remove();
  }

  private renderChart() {
    this.nodes = this.data;
    this.root = d3.hierarchy(this.nodes);
    this.render(this.root);
  }

  private render(root: any) {
    const tree = d3.tree()
      .size([this.height, this.width]);
    tree(this.root);
    this.renderNodes(this.root);
    this.renderLinks(this.root);
  }

  private renderNodes(root: any) {
    const nodes = root.descendants();

    const nodeElements = this.g.selectAll('g.node')
      .data(nodes, function (d, i) {
        return d.id || (d.id = ++i);
      });

    const that = this;

    const nodeEnter = nodeElements.enter().append('g')
      .attr('class', 'node')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('transform', function (d) {
        return 'translate(' + d.y
          + ',' + d.x + ')';
      })
      .on('click', function (d) {
        that.toggle(d);
        that.render(this.root);
      })
      .on('mouseover', function(d) {
        const g = d3.select(this);
        const info = g.append('g')
          .attr('class', 'hover-a');
        info.append('text')
          .style('fill', '#FFFFFF')
          .attr('x', 30)
          .attr('y', 30)
          .text(d.data.details);
      })
      .on('mouseout', function(d) {
        d3.select(this).select('.hover-a').remove();
      });

    nodeEnter.append('circle')
      .attr('r', 5);

    const nodeUpdate = nodeEnter.merge(nodeElements)
      .transition().duration(this.duration)
      .attr('transform', function (d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate.select('circle')
      .style('fill', function (d) {
        return d.data.online ? 'green' : '#fff';
      });

    const nodeExit = nodeElements.exit()
      .transition().duration(this.duration)
      .attr('transform', function (d) {
        return 'translate(' + d.y
          + ',' + d.x + ')';
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6)
      .remove();

    this.renderLabels(nodeEnter, nodeUpdate, nodeExit);
  }

  private renderLabels(nodeEnter, nodeUpdate, nodeExit) {
    nodeEnter.append('text')
      .attr('x', function (d) {
        return d.children || d._children ? -10 : 10;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function (d) {
        return d.data.name;
      })
      .style('fill-opacity', 1e-6);

    nodeUpdate.select('text')
      .style('fill-opacity', 1);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6)
      .remove();
  }

  private renderLinks(root) {
    const nodes = root.descendants().slice(1);

    const link = this.g.selectAll('path.link')
      .data(nodes, function (d, i) {
        return d.id || (d.id = ++i);
      });

    const that = this;

    link.enter().insert('path', 'g')
      .attr('class', 'link')
      .merge(link)
      .transition().duration(this.duration)
      .attr('d', function (d) {
        return that.generateLinkPath(d, d.parent);
      });

    link.exit().remove();
  }

  private generateLinkPath(target, source) {
    const path = d3.path();
    path.moveTo(target.y, target.x);
    path.bezierCurveTo((target.y + source.y) / 2, target.x,
      (target.y + source.y) / 2, source.x, source.y, source.x);
    return path.toString();
  }

  private toggle(d: any) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
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
