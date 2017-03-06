var app = angular.module('elmenusRestaurants',[]);
app.controller('elmenusRestaurantsCtrl', function($scope, $http) {
  $scope.data = [];
  $scope.url = "/api/restaurants";
  var request = $http.get($scope.url);
  request.success(function(data) {
      $scope.data = data.hits.hits;
  });
  request.error(function(data){
      console.log('Error: ' + data);
  });

  $scope.allRestaurantsCtrl = function() {
    $scope.data = [];
    $scope.url = "/api/restaurants";
    $scope.currentPage = 0;
    var request = $http.get($scope.url);
    request.success(function(data) {
        $scope.data = data.hits.hits;
        $scope.total = data.hits.total;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
  };

  $scope.getOpenedRestaurants = function() {
    $scope.data = [];
    $scope.url = "/api/restaurants/opened";
    $scope.currentPage = 0;
    var request = $http.get($scope.url);
    request.success(function(data) {
        $scope.data = data.hits.hits;
        $scope.total = data.hits.total;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
  };

  // Pagination
  $scope.itemsPerPage = 10;
  $scope.currentPage = 0;

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
    }
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {
    var request = $http.get($scope.url+"?page="+newValue);
    request.success(function(data) {
        $scope.data = data.hits.hits;
        $scope.total = data.hits.total;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
  });
});
  