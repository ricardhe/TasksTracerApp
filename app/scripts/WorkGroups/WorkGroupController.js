/**
 * Created by PAULA on 19/09/2014.
 */

//angular.module('taskTrackerApp',[])
app.controller('WorkGroupCtrl', ['$scope','workgroupManager','WorkgroupFactory', function($scope,workgroupManager,WorkgroupFactory) {

    var self = this;
    self.status={message:"",state:null};
    self.workgroups = {};

    self.ItemSelected = WorkgroupFactory.create();

    this.setMessage = function(message,state)
    {
        self.status.message=message;
        self.status.state=state;
    }

    this.LoadController = function() {
        workgroupManager.getAllWorkGroups().then(function (workgroups) {
            self.workgroups = workgroups
        },
            function(e){
                self.setMessage("Error when load the workgroups",0);
            }
        );
    }

    this.SaveWorkGroup= function() {

        if (self.ItemSelected.idWorkGroup)
        {
           self.ItemSelected.update().then(
                                               function(item) {
                                                   workgroupManager.setItem(item);
                                                   self.setMessage("workgroup updated satisfactory",1);
                                                   self.ItemSelected = WorkgroupFactory.create();
                                               }
                                               ,
                                               function(errorMessage) {
                                                   self.setMessage("Error inserting new workgroup",0);
                                               }
                                          );
        }
        else
        {
            self.ItemSelected.insert().then(
                                                function(newITem) {
                                                    self.workgroups.push(newITem);
                                                    workgroupManager.setItem(newITem);
                                                    self.ItemSelected = WorkgroupFactory.create();
                                                    self.setMessage("workgroup inserted satisfactory",1);
                                                }
                                                ,
                                                function(errorMessage) {
                                                    self.setMessage("Error inserting new workgroup",0);
                                                }
                                            );
        }
    }

    this.deleteWorkGroup=function(workgroup) {

        workgroup.delete().then(    //delete from DB
                                    function(newITem) {
                                        var index = self.workgroups.indexOf(newITem);
                                        if (index > -1) {
                                            self.workgroups.splice(index, 1); //delete from local controller collection
                                            workgroupManager.deleteItem(newITem.idWorkGroup) //delete from service pool
                                        }
                                        self.status.message="workgroup delete satisfactory";
                                        self.status.state=1;
                                        self.ItemSelected = new Workgroup();
                                    }
                                ,
                                    function(errorMessage) {
                                        self.status.message="Error inserting new workgroup";
                                        self.status.state=0;
                                    }
                                );

    }

    this.selectItem = function(newSelectedItem)
    {
       self.ItemSelected=newSelectedItem;
    }

    this.isInvalid = function(field){
        return $scope.frmWrkgrp[field].$invalid && $scope.frmWrkgrp[field].$dirty;
    };

    this.isValid = function(field){
        return $scope.frmWrkgrp[field].$valid && $scope.frmWrkgrp[field].$dirty;
    };

}]);


