/**
 * Created by PAULA on 25/09/2014.
 */

app.factory('Workgroup', ['$http','$q','workgroupSrv','UserFactory', function($http,$q,workgroupSrv,UserFactory) {

    function Workgroup(workgroupData) {

        if (workgroupData) {
            this.setData(workgroupData);
        }

        // Some other initializations related to workgroup
    }

    Workgroup.prototype = {

        RelatedUsers: {},

        /* Depending Objects */
        setUsers:function(items) {
            var self = this;
            self.RelatedUsers = [];
            if (items) {
                angular.forEach(items, function (itemData) {
                    var item = UserFactory.create(itemData);
                    self.RelatedUsers.push(item);
                });
            }

        },

        setData: function(workgroupData) {
            angular.extend(this, workgroupData);
            this.setUsers(workgroupData.Users);
        },
        delete: function() {

            var scope = this;
            var deferred = $q.defer();
            //comentari
            workgroupSrv.DeleteWorkGroup(this.idWorkGroup).then(
                function() {
                    deferred.resolve(scope);
                    console.log("WorkGroup deleted: " + scope.idWorkGroup);
                },
                function(error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
            return  deferred.promise;

        },
        update: function() {
            var scope = this;
            var deferred = $q.defer();
            workgroupSrv.PutWorkGroup(this).then(
                function(res) {
                    scope.setData(res.data);
                    deferred.resolve(scope);
                    console.log("WorkGroup Updated: " + res.data);
                },
                function(error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
            return  deferred.promise;

        },
        insert: function() {

            var scope = this;
            var deferred = $q.defer();

            workgroupSrv.PostWorkGroup(this).then(
                function(res) {
                    scope.setData(res.data);
                    deferred.resolve(scope);
                    console.log("WorkGroup Inserted: " + res.data);
                },
                function(error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
            return  deferred.promise;
        }

    };

    return Workgroup;
}]);

app.factory('WorkgroupFactory', ['Workgroup', function(Workgroup) {

    //return Workgroup;
    // Public API (only for creating new instances)
    return {
        create: function(itemData)
        {
            return new Workgroup(itemData);
        }
    }

}]);


app.factory('workgroupManager', ['$http', '$q', 'WorkgroupFactory','workgroupSrv', function($http, $q, WorkgroupFactory,workgroupSrv) {

    var workgroupManager = {

        _pool: {},

        _retrieveInstance: function(id, itemData) {
                                                        var instance = this._pool[id];
                                                        if (instance) {
                                                            instance.setData(itemData);
                                                        } else {
                                                            instance = WorkgroupFactory.create(itemData);
                                                            this._pool[id] = instance;
                                                        }
                                                        return instance;
                                                }
        ,

        _search: function(id) {
            return this._pool[id];
        },

        _load: function(id, deferred) {
                                        var self = this;

                                        workgroupSrv.GetWorkGroup(id).success(function(itemData) {
                                                                                                    var item = self._retrieveInstance(itemData.idWorkGroup, itemData);
                                                                                                    deferred.resolve(item);
                                                                                }
                                                                             ).error( function() {
                                                                                                    deferred.reject();
                                                                                                 }
                                                                                     );
                                     }
        ,

        /* Public Methods */

        //Use this function to delete item from the pool
        deleteItem: function(id){
                                    if (this._pool[id]) {
                                        delete this._pool[id];
                                    }
                                }
        ,

        /*  This function is useful when we got somehow the Item data and we wish to store it or update the pool and get a Item instance in return */
        setItem: function(itemData) {

                                        var scope = this;
                                        var item = this._search(itemData.idWorkGroup);
                                        if (item) {
                                            item.setData(itemData);
                                        } else {
                                            item = scope._retrieveInstance(itemData.idWorkGroup,itemData);
                                        }
                                        return item;
                                    }
        ,

        /* Use this function in order to get a item instance by it's id */
        getWorkGroup: function(id) {
                                        var deferred = $q.defer();
                                        var item = this._search(id);
                                        if (item) {
                                            deferred.resolve(item);
                                        } else {
                                            this._load(id, deferred);
                                        }
                                        return deferred.promise;
                                    }
        ,

        /* Use this function in order to get instances of all the Items */
        getAllWorkGroups: function() {
            var deferred = $q.defer();
            var self = this;
            workgroupSrv.GetWorkGroups().then(
                                                function(itemArray){

                                                    var listItems = [];
                                                    angular.forEach(itemArray.data,function(itemData) {
                                                        var item = self._retrieveInstance(itemData.idWorkGroup, itemData);
                                                        listItems.push(item);
                                                    });

                                                    deferred.resolve(listItems);
                                                }
                                            ,
                                                function(e){
                                                    deferred.reject(e.message);
                                                }
                                            );
            return  deferred.promise;
        }

    };

    return workgroupManager;

}]);


