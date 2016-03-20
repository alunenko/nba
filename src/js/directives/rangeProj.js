nba.directive('proj', function() {
  return {
    scope: {
      name: '@',
      max: '=',
      min: '=',
      range: '=search'
    },
    templateUrl: '../views/directives/rangeProj.html'
  }
});
