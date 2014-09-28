/**
 * Created by PAULA on 18/09/2014.
 */

/*
app.factory('workRsrc', ['$resource','apiUrl', function($resource,apiUrl) {

    var apiurl = apiUrl + "api/WorkGroup/:id";

    return $resource(apiurl, {id:@idWorkGroup},{});

}]);
*/

//angular.module('taskTrackerApp', [])

app.service('workgroupSrv', ['$http','apiUrl', function($http,apiUrl) {

    //var workRsrc = new workRsrc();
    var apiurl = apiUrl + "api/WorkGroup";
// GET api/WorkGroup
    this.GetWorkGroups = function() {
       return $http.get(apiurl);
    }
// GET api/WorkGroup/5
    this.GetWorkGroup = function(id) {
       return $http.get(apiurl+"/"+id);
    }
// PUT api/WorkGroup/5
    this.PutWorkGroup = function(item) {
       return $http.put(apiurl+"/"+item.idWorkGroup,item)
    }
// POST api/WorkGroup
    this.PostWorkGroup = function(item) {
       return $http.post(apiurl,item)
    }
// DELETE api/WorkGroup/5
    this.DeleteWorkGroup = function(id) {
       return $http.delete(apiurl+"/"+id);
    }
}

]);


/*

 app.service('WorkGroupSrv', ['$http','apiUrl','workRsrc', function($http,apiUrl) {

 var apiurl = apiUrl + "api/WorkGroup";

 // GET api/WorkGroup
 this.GetWorkGroups = function() {
 return $http.get(apiurl);
 }
 // GET api/WorkGroup/5
 this.GetWorkGroup = function(id) {
 return $http.get(apiurl+"/"+id);
 }
 // PUT api/WorkGroup/5
 this.PutWorkGroup = function(item) {
 return $http.put(apiurl+"/"+item.idWorkGroup,item)
 }
 // POST api/WorkGroup
 this.PostWorkGroup = function(item) {
 return $http.post(apiurl,item)
 }
 // DELETE api/WorkGroup/5
 this.DeleteWorkGroup = function(id) {
 return $http.delete(apiurl+"/"+id);
 }

 }

 ]);

 */
