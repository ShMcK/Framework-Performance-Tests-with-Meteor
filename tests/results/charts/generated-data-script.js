(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var data = require('./generated-data.js');

// chartData
var chartData = {
  paint: {
    labels: ["100", "1,000", "5,000", "10,000", "20,000"],
    datasets: []
  },
  repaint: {
    labels: ["100", "1,000", "5,000", "10,000", "20,000"],
    datasets: []
  }
};

//var ng2ReactData = {
//  labels: ["10,000", "20,000", "30,000", "40,000", "50,000"],
//  datasets: [{
//    label: 'React 0.13.3',
//    fillColor: "rgba(90, 82, 85, 0.2)",
//    strokeColor: "rgba(90, 82, 85, 1)",
//    pointColor: "rgba(90, 82, 85, 1)",
//    pointStrokeColor: "#fff",
//    pointHighlightFill: "#fff",
//    pointHighlightStroke: "rgba(90, 82, 85, 1)",
//    data: [316, 1465, 2050, 1831, 3096]
//  }, {
//    label: 'Angular 2.0.0 alpha-42',
//    fillColor: "rgba(174, 90, 65, 0.2)",
//    strokeColor: "rgba(174, 90, 65, 1)",
//    pointColor: "rgba(174, 90, 65, 1)",
//    pointStrokeColor: "#fff",
//    pointHighlightFill: "#fff",
//    pointHighlightStroke: "rgba(174, 90, 65, 1)",
//    data: [10, 19, 26, 37, 44]
//  }]
//};

data.forEach(function (sample) {
  var paintObject = {
    label: sample.label,
    fillColor: "rgba(" + sample.color + ",0.2)",
    strokeColor: "rgba(" + sample.color + ",1)",
    pointColor: "rgba(" + sample.color + ",1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(" + sample.color + ",1)",
    data: sample.data.paint
  };
  var repaintObject = {
    label: sample.label,
    fillColor: "rgba(" + sample.color + ",0.2)",
    strokeColor: "rgba(" + sample.color + ",1)",
    pointColor: "rgba(" + sample.color + ",1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(" + sample.color + ",1)",
    data: sample.data.repaint
  };
  // paint chart
  chartData.paint.datasets.push(paintObject);
  // repaint chart
  chartData.repaint.datasets.push(repaintObject);

});

// generate legends
var legends = document.getElementsByClassName('shmck-chart--legend');
for (var i = 0; i < legends.length; ++i) {
  var element = legends[i];
  data.forEach(function (field) {
    // add colored legend box
    var coloredBox = document.createElement('span');
    coloredBox.classList.add('shmck-chart--legend--box');
    coloredBox.style.color = 'rgb(' + field.color + ')';
    coloredBox.innerHTML = '&#9632;';
    element.appendChild(coloredBox);
    // add label names
    var legendLabel = document.createElement('span');
    if (field.version) {
      legendLabel.textContent = ' ' + field.label + ' ' + field.version + '  ';
    } else {
      legendLabel.textContent = ' ' + field.label + '  ';
    }
    element.appendChild(legendLabel);
  });
}

var defaults = function () {
  return {
    showScale: true,
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    scaleOverride: false,
    scaleLineColor: "rgba(0,0,0,.1)",
    scaleLineWidth: 1,
    scaleShowLabels: true,
    scaleLabel: "<%=value%>",
    scaleIntegersOnly: true,
    scaleBeginAtZero: false,
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    scaleFontSize: 12,
    scaleFontStyle: "normal",
    scaleFontColor: "#666",
    bezierCurve: true,
    bezierCurveTension: 0.4,

    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,

    responsive: true,

    showTooltips: true,
    customTooltips: false,
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
    tooltipFillColor: "rgba(0,0,0,0.8)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    multiTooltipTemplate: "<%= value %>",

    //datasetFill: true,
    datasetStrokeWidth: 2,
    datasetStroke: true,

    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  };
};

//  var loadingChart = document.getElementById("renderLoadingChart").getContext("2d");
//  var renderChart = new Chart(loadingChart).Bar(loadingData, {responsive: true});

// adjust scale to fit data
var custom = new defaults();
custom.scaleOverride = true;
custom.scaleSteps = 11;
custom.scaleStepWidth = 500;
custom.scaleStartValue = 0;

var paintChart = document.getElementById("renderPaintChart").getContext("2d");
var renderChart2 = new Chart(paintChart).Line(chartData.paint, custom);

var repaintChart = document.getElementById("renderRepaintChart").getContext("2d");
var renderChart3 = new Chart(repaintChart).Line(chartData.repaint, custom);

//var reactNg2Chart = document.getElementById('renderReactNg2Chart').getContext('2d');
//var renderReactNg2Chart = new Chart(reactNg2Chart).Line(ng2ReactData, custom);
},{"./generated-data.js":2}],2:[function(require,module,exports){
module.exports = [
{ label: 'angular-1',
  color: '27, 133, 184',
  data: 
   { paint: [ '9.08', '20.48', '68.54', '123.45', '10000' ],
     find: [ '1.54', '2.64', '5.04', '16.77', '10000' ] } }
,
{ label: 'angular-2',
  color: '90, 82, 85',
  data: 
   { paint: 
      [ '7.58',
        '25.95',
        '126.10',
        '271.28',
        '739.21',
        '1342.24',
        '2065.34',
        '2928.81' ],
     find: 
      [ '1.81',
        '2.00',
        '5.09',
        '10.42',
        '19.58',
        '26.03',
        '37.29',
        '44.78' ] } }
,
{ label: 'blaze',
  color: '174, 90, 65',
  data: 
   { paint: [ '28.06', '373.58', '1683.08', '3709.87', '25372.87' ],
     find: [ '5.22', '14.42', '52.18', '19.21', '112.09' ] } }
,
{ label: 'react',
  color: '195, 203, 113',
  data: 
   { paint: 
      [ '6.49',
        '32.50',
        '137.96',
        '267.01',
        '520.65',
        '767.20',
        '1022.30',
        '1916.60' ],
     find: 
      [ '5.71',
        '32.32',
        '176.10',
        '316.31',
        '1465.48',
        '2050.35',
        '1831.76',
        '3096.76' ] } }
];

},{}]},{},[1]);
