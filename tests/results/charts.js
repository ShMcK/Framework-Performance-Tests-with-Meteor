var data = [{
  label: 'Blaze',
  version: '2.1.3',
  color: '27, 133, 184',
  data: {
    paint: [26.85, 185.80, 974.39, 2128.02],
    repaint: [4.11, 15.22, 18.69, 25.87]
  }
}, {
  label: 'React',
  version: '0.13.3',
  color: '90, 82, 85',
  data: {
    paint: [6.49, 32.50, 137.96, 267.01, 520.65, 767.20, 1022.30, 1916.60],
    repaint: [5.71, 32.32, 176.10, 316.31, 1465.48, 2050.35, 1831.76, 3096.76]
  }
}, {
  label: 'Angular 1',
  version: '1.4.7',
  color: '174, 90, 65',
  data: {
    paint: [9.08, 20.48, 68.54, 123.45],
    repaint: [1.54, 2.64, 5.04, 16.77]
  }
}, {
  label: 'Angular 2',
  version: 'alpha-40',
  color: '195, 203, 113',
  data: {
    paint: [8.28, 24.91, 121.63, 262.20, 742.12, 1339.14, 2211.64, 2887.15],
    repaint: [1.26, 2.32, 5.23, 9.56, 19.00, 27.28, 35.34, 43.14]
  }
}];

// chartData
var chartData = {
  paint: {
    labels: ["100", "1,000", "5,000", "10,000", "20,000", "30,000", "40,000", "50,000"],
    datasets: []
  },
  repaint: {
    labels: ["100", "1,000", "5,000", "10,000", "20,000", "30,000", "40,000", "50,000"],
    datasets: []
  }
};

data.forEach(function (sample) {
  var chartObject = {
    label: sample.label,
    fillColor: "rgba(" + sample.color + ",0.2)",
    strokeColor: "rgba(" + sample.color + ",1)",
    pointColor: "rgba(" + sample.color + ",1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(" + sample.color + ",1)"
  };
  // paint chart
  var paintObject = chartObject;
  paintObject.data = sample.data.paint;
  chartData.paint.datasets.push(paintObject);
  // repaint chart
  var repaintObject = chartObject;
  repaintObject.data = sample.data.repaint;
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
var options2 = new defaults();
options2.scaleOverride = true;
options2.scaleSteps = 11;
options2.scaleStepWidth = 1000;
options2.scaleStartValue = 0;

var paintChart = document.getElementById("renderPaintChart").getContext("2d");
var renderChart2 = new Chart(paintChart).Line(chartData.paint, options2);

var repaintChart = document.getElementById("renderRepaintChart").getContext("2d");
var renderChart3 = new Chart(repaintChart).Line(chartData.repaint, defaults());