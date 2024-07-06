const width = 500;
const height = 470;

// Pie size
const pieWidth = 250;
const pieHeight = 250;
const pieRadius = Math.min(pieWidth, pieHeight);

// Donut shape
const arc = d3.arc()
    .outerRadius(pieRadius - 80)
    .innerRadius(80);

// Pie
const pie = d3.pie()
    .sort(null)
    .value(d => d.number);

// Colors
const colors = d3.scaleOrdinal()
    .range(['rgb(201,242,196)','rgb(168,149,235)','rgb(252,241,206)','rgb(242,209,117)','rgb(229,148,189)']);

// Custom data
const data = [
    { item: 'child care home', number: 40 },
    { item: 'cleanliness program', number: 35 },
    { item: 'helping people', number: 10 },
    { item: 'excursions', number: 10 },
    { item: 'feeding the poor', number: 5 }
];

// SVG canvas middle
const canvasMiddle = d3.select('#middle-canvas')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(250, 200)');

// Slices of pie charts
const pieGroup = canvasMiddle.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

// Adding colors
pieGroup.append('path')
    .data(pie(data))
    .attr('d', arc)
    .attr('fill', (d, i) => colors(d.data.item))
    .transition()
    .duration(2000)
    .attrTween('d', tweenPie)
    .each(function(d) { this._current = d; });

function tweenPie(b) {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => arc(i(t));
}

// Labels
const labels = d3.select('.labels')
    .selectAll('.label')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'label')
    .style('margin-bottom', '10px');

labels.append('div')
    .style('width', '20px')
    .style('height', '20px')
    .style('background-color', (d, i) => colors(d.item))
    .style('margin-right', '5px')
    .style('margin-bottom', '10px')
    .style('border-radius', '5px');

labels.append('span')
.text((d, i) => `${d.number}% ${d.item}`);
