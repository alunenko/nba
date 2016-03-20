nba.directive('salary', function() {
  return {
    scope: {
      name: '@',
      max: '=',
      min: '=',
      range: '=search'
    },
    templateUrl: '../views/directives/rangeSalary.html'
  }
});
