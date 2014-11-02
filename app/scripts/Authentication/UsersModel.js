/**
 * Created by PAULA on 29/09/2014.
 */

app.factory('User', ['$http','$q','apiUrl', function($http,$q,apiUrl) {

    function User(itemData) {
        if (itemData) {
            this.setData(itemData);
        }
        // Some other initializations related to Users
    };

    User.prototype = {

        setData: function (itemData) {
            angular.extend(this, itemData);
        },
        delete: function () {

            var scope = this;
            var deferred = $q.defer();
/*
            userSrv.DeleteUser(this.idUser).then(
                function () {
                    deferred.resolve(scope);
                    console.log("User deleted: " + scope.idUser);
                },
                function (error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
            */
            return  deferred.promise;

        },
        update: function () {

            var scope = this;
            var deferred = $q.defer();
/*
            userSrv.PutUser(this).then(
                function (res) {
                    scope.setData(res.data);
                    deferred.resolve(scope);
                    console.log("User Updated: " + res.data);
                },
                function (error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
*/
            return  deferred.promise;

        },
        insert: function () {

            var scope = this;
            var deferred = $q.defer();
/*
            userSrv.PostUser(this).then(
                function (res) {
                    scope.setData(res.data);
                    deferred.resolve(scope);
                    console.log("User Inserted: " + res.data);
                },
                function (error) {
                    deferred.reject(error.message);
                    console.log(error.message);
                }
            );
  */
            return  deferred.promise;
        }
    };

    return User;
}]);

app.factory('UserFactory', ['User', function(User) {
    return {
            create: function(itemData){
                return new User(itemData);
            }
    };
}]);


//
//app.factory('userManager', ['$http', '$q', 'User','userSrv', function($http, $q, User, userSrv) {
//
//    var userManager = {
//
//        _pool: {},
//
//        _retrieveInstance: function(id, itemData) {
//            var instance = this._pool[id];
//            if (instance) {
//                instance.setData(itemData);
//            } else {
//                instance = new User(itemData);
//                this._pool[id] = instance;
//            }
//            return instance;
//        }
//        ,
//
//        _search: function(id) {
//            return this._pool[id];
//        },
//
//        _load: function(id, deferred) {
//            var scope = this;
//
//            userSrv.GetUserById(id).success(function(itemData) {
//                    var item = scope._retrieveInstance(itemData.idUser, itemData);
//                    deferred.resolve(item);
//                }
//            ).error( function() {
//                    deferred.reject();
//                }
//            );
//        }
//        ,
//
//        /* Public Methods */
//
//        //Use this function to delete item from the pool
//        deleteItem: function(id){
//            if (this._pool[id]) {
//                delete this._pool[id];
//            }
//        }
//        ,
//
//        /*  This function is useful when we got somehow the Item data and we wish to store it or update the pool and get a Item instance in return */
//        setItem: function(itemData) {
//
//            var scope = this;
//            var item = this._search(itemData.idUser);
//            if (item) {
//                item.setData(itemData);
//            } else {
//                item = scope._retrieveInstance(itemData.idUser,itemData);
//            }
//            return item;
//        }
//        ,
//
//        /* Use this function in order to get a item instance by it's id */
//        getUser: function(id) {
//            var deferred = $q.defer();
//            var item = this._search(id);
//            if (item) {
//                deferred.resolve(item);
//            } else {
//                this._load(id, deferred);
//            }
//            return deferred.promise;
//        }
//        ,
//
//        /* Use this function in order to get instances of all the Items */
//        getAllUsers: function() {
//            var deferred = $q.defer();
//            var scope = this;
//            userSrv.getAllUsers().then(
//                function(itemArray){
//
//                    var listItems = [];
//                    angular.forEach(itemArray.data,function(itemData) {
//                        var item = scope._retrieveInstance(itemData.idUser, itemData);
//                        listItems.push(item);
//                    });
//
//                    deferred.resolve(listItems);
//                }
//                ,
//                function(e){
//                    deferred.reject(e.message);
//                }
//            );
//            return  deferred.promise;
//        }
//
//    };
//
//    return userManager;
//
//}]);

