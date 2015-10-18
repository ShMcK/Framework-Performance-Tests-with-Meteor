var data = [{
  label: 'Blaze',
  version: '2.1.3',
  color: '27, 133, 184',
  data: {
    paint: [28, 373, 1683, 3709, 10000],
    repaint: [5, 14, 52, 19, 112]
  }
}, {
  label: 'React',
  version: '0.13.3',
  color: '90, 82, 85',
  data: {
    paint: [6, 32, 137, 267, 520],
    repaint: [5, 32, 176, 316, 1465]
  }
}, {
  label: 'Angular 1',
  version: '1.4.7',
  color: '174, 90, 65',
  data: {
    paint: [9, 20, 68, 123, 10000],
    repaint: [1, 2, 5, 16, 10000]
  }
}, {
  label: 'Angular 2',
  version: 'alpha-40',
  color: '195, 203, 113',
  data: {
    paint: [7, 25, 126, 271, 739],
    repaint: [1, 2, 5, 10, 19]
  }
}];

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
  element = legends[i];
  data.forEach(function (field) {
    // add colored legend box
    var coloredBox = document.createElement('span');
    coloredBox.classList.add('shmck-chart--legend--box');
    coloredBox.style.color = 'rgb(' + field.color + ')';
    coloredBox.innerHTML = '&#9632;';
    element.appendChild(coloredBox);
    // add label names
    var legendLabel = document.createElement('span');
    legendLabel.textContent = ' ' + field.label + ' ' + field.version + '  ';
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