angular.module('nba')
  .controller('PlayersCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('players controller works!');

    $http.get('../database/data.result-2.json')
      .success(function(response) {
        $scope.playersData = response;
      });
  }]);
