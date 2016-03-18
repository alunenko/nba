angular.module('nba')
  .controller('PlayersCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('../database/data.result-2.json')
      .success(function(response) {
        $scope.playersData = response;
      });

    $scope.calculateProj = function(player) {
      var sum = 0;

      /* aliases */
      var min    = player.statsCurrentSeason.minutes.new
        , man_ea = player.manualEffAdj.new
        , ur     = player.statsCurrentSeason.usageRate.new
        , rr     = player.statsCurrentSeason.reboundRate.new
        , ar     = player.statsCurrentSeason.assistsRate.new
        , max_r  = Math.max(ur, rr, ar)

      sum = min * man_ea * (ur + rr + ar) / 3 / max_r;

      return sum;
    };

    $scope.range = 25;
    $scope.rangeHide = false;
    $scope.showMore = function() {
      if(($scope.playersData.players.length - $scope.range) > 25) {
        $scope.range += 25;
      } else {
        $scope.range = $scope.playersData.players.length;
        $scope.rangeHide = true;
      }
    };
  }]);
