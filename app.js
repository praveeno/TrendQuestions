var app = angular.module('app', ['ngMaterial']);
app.controller('MainCtrl', function($scope, $http) {
  $scope.posts = [];
  $scope.data;
  $scope.sites = ['stackoverflow', 'space', 'arduino', 'musicfans', 'hinduism'];
  getQuestions('stackoverflow');
  $scope.selectionSite = 'stackoverflow';
  $scope.onSelection = function(selectedSite) {
    getQuestions(selectedSite);
  }
  function getQuestions(site) {
    $http.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=' + site)
    .then(function(resp) {
      if (resp.status === 200) {
        $scope.posts =  resp.data.items;
        $scope.data = resp;
      }
      return resp; 
    }) 
  }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() { console.log('Service Worker Registered'); });
}