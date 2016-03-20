nba.controller('PlayersCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('../database/data.result-2.json')
    .success(function(response) {
      $scope.playersData = response;

      for (var i = 0; i < $scope.playersData.players.length; i++) {
        $scope.calculateProj($scope.playersData.players[i]);
      };
    });

  $scope.calculateProj = function(player) {
    var calcProj = 0
      , calcProjRound = 0;

    /* aliases */
    var min    = player.statsCurrentSeason.minutes.new
      , man_ea = player.manualEffAdj.new
      , ur     = player.statsCurrentSeason.usageRate.new
      , rr     = player.statsCurrentSeason.reboundRate.new
      , ar     = player.statsCurrentSeason.assistsRate.new
      , max_r  = Math.max(ur, rr, ar)

    calcProj = min * man_ea * (ur + rr + ar) / 3 / max_r;
    calcProjRound = Math.round(calcProj * 1000) / 1000;

    player.proj = calcProjRound;

    return calcProjRound;
  };

  $scope.showMoreCount = 25;
  $scope.showMoreHide = false;
  $scope.showMore = function() {
    if(($scope.playersData.players.length - $scope.showMoreCount) > 25) {
      $scope.showMoreCount += 25;
    } else {
      $scope.showMoreCount = $scope.playersData.players.length;
      $scope.showMoreHide = true;
    }
  };

  $scope.rangeProj = {
    search: {
      proj: 0
    }
  };
  $scope.greaterThan1 = function(prop, val) {
    return function(item) {
      return item[prop] >= val[prop];
    };
  };

  $scope.rangeSalary = {
    search: {
      salary: 1
    }
  };
  $scope.greaterThan2 = function(prop, val) {
    return function(item) {
      var a = prop.split('.');
      return item[a[0]][a[1]] >= val[a[1]];
    };
  };
}]);
