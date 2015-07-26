var options = {
  // String - Animation easing effect
  // Possible effects are:
  // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
  //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
  //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
  //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
  //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
  //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
  //  easeOutElastic, easeInCubic]
  animation: true,
  animationSteps: 60,
  animationEasing: "easeOutQuart",

  showScale: true,
  scaleShowGridLines: true,
  scaleGridLineColor : "rgba(0,0,0,.05)",
  scaleGridLineWidth : 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
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

  bezierCurve : true,
  bezierCurveTension : 0.4,

  pointDot : true,
  pointDotRadius : 4,
  pointDotStrokeWidth : 1,
  pointHitDetectionRadius : 20,

  responsive: true,
  maintainAspectRatio: true,

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

  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}