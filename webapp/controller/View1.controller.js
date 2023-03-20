sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast,MessageBox,) {
        "use strict";

        return Controller.extend("idodata1.project50000.controller.View1", {
            onInit: function () {
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZEMPLOYEE_EEE_SRV/");
                oModel.read("/userSet", {
                    success: function (odata) {
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "Data1");
                        alert("Success");
                        //  MessageBox.success(oModel1);

                    },
                    error: function (oError) {
                        alert("error");
                        //MessageBox.error(oError);
                    }
                });
            },
            onDelite: function (oEvent) {
                var that = this;
                that.mode = "delete";

                var sData = oEvent.getSource().getModel("Data1").getData();
                var oTable = this.byId("idProductsTable");
                var selectedRowData = oTable.getSelectedContexts();
                if (selectedRowData.length === 0) {
                    MessageToast.show("please select atleast one row");
                    return;
                } else {
                    for (var i = selectedRowData.length - 1; i >= 0; i--) {
                        var oThisObj = selectedRowData[i].getObject();
                        var index = $.map(sData.results, function (obj, index) {
                            if (obj === oThisObj) {
                                return index;
                            }
                        });

                        var id = sData.results[index].Name;
                    }

                    var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZEMPLOYEE_EEE_SRV/");
                    oModel.remove("/userSet('" + id + "')", {
                        success: function (odata) {
                            oModel.read("/userSet", {
                                success: function (odata) {
                                    var oModel1 = new sap.ui.model.json.JSONModel();
                                    oModel1.setData(odata);
                                    that.getView().setModel(oModel1, "Data1");
                                    // alert("Success");
                                      MessageBox.success("Success");

                                }
                            })
                        },
                        error: function (oError) {
                            // alert("error");
                            MessageBox.error("error");
                        }
                    });
                }
            }, onAdd: function (oEvent) {

                var myView = this.getView();
                // var oDialog1 = myView.byId("id1Dialog");
                this._oDialog = myView.byId("id1Dialog");
                if (!this._oDialog) {

                    this._oDialog = sap.ui.xmlfragment(myView.getId(), "idodata1.project50000.view.Dialog1", this);
                    myView.addDependent(this._oDialog);
                    this._oDialog.open();

                }
                else {

                    this.byId("id1Dialog").open();
                }

            },
            CancelPress1: function () {

                this.byId("id1Dialog").close();

            },

            AddPress: function (oEvent) {
                // this.mode = "Add";

                var that = this;
                var Name = that.getView().byId("name").getValue();
                var Zemprole = that.getView().byId("Zemprole").getValue();
                var Zgender = that.getView().byId("Zgender").getValue();
                var Znumber = that.getView().byId("Znumber").getValue();
                var Zcity = that.getView().byId("Zcity").getValue();

                var array = { Name, Zemprole, Zgender, Znumber, Zcity };


                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZEMPLOYEE_EEE_SRV/");
                oModel.create("/userSet", array, {
                    success: function (odata) {

                        oModel.read("/userSet", {
                            success: function (odata) {
                                var oModel1 = new sap.ui.model.json.JSONModel();
                                oModel1.setData(odata);
                                that.getView().setModel(oModel1, "Data1");
                                alert("Success");
                                //  MessageBox.success(oModel1);

                            }
                        })

                    },
                    error: function (oError) {
                        alert("error");

                    }
                });
                that.byId("id1Dialog").close();

            },
            onEdit: function (oEvent) {

                this.mode = "edit";
                var that = this;

                var myView = that.getView();
                // var oDialog = myView.byId("idDialog");

                this._oDialog = myView.byId("idDialog");

                var sData = oEvent.getSource().getModel("Data1").getData();
                var oTable = that.byId("idProductsTable");
                var selectedRowData = oTable.getSelectedContexts();
                if (selectedRowData.length === 0) {
                    MessageToast.show("please select atleast one row");
                    return;
                } else {
                    if (!this._oDialog) {

                        this._oDialog = sap.ui.xmlfragment(myView.getId(), "idodata1.project50000.view.Dialog", this);
                        myView.addDependent(this._oDialog);
                        this._oDialog.open();
                    }
                    else {

                        that.byId("idDialog").open();
                    }

                    for (var i = selectedRowData.length - 1; i >= 0; i--) {
                        var oThisObj = selectedRowData[i].getObject();
                        var index = $.map(sData.results, function (obj, index) {
                            if (obj === oThisObj) {
                                return index;
                            }
                        });
                        sData.results[index];
                    }
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(sData.results[index]);
                    that.getView().setModel(oModel, "Data3");
                }

            },
            SavePress: function (oEvent) {
                var that = this;
                var payload = oEvent.oSource.oPropagatedProperties.oModels.Data3.oData;
                var id = oEvent.oSource.oPropagatedProperties.oModels.Data3.oData.Name;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZEMPLOYEE_EEE_SRV/");
                oModel.update("/userSet('" + id + "')", payload, {
                    success: function (odata) {
                        oModel.read("/userSet", {
                            success: function (odata) {
                                var oModel1 = new sap.ui.model.json.JSONModel();
                                oModel1.setData(odata);
                                that.getView().setModel(oModel1, "Data1");
                                // alert("Success");
                                 MessageBox.success("Success");

                            }
                        })
                    },
                    error: function (oError) {
                        // alert("error");
                        MessageBox.error("error");
                    }
                });
                that.byId("idDialog").close();

            }
            ,

            dialogAftercloseadd: function (oEvent) {

                this._oDialog.destroy();
            },
            dialogAfterclosedit: function (oEvent) {

                this._oDialog.destroy();
            },

            Lock: function (oEvent) {

                if (oEvent.getSource().getText() === "Unlocked") {
                    oEvent.getSource().setText("Locked");

                    oEvent.getSource().setIcon("sap-icon://locked");
                    this.byId("editmode").setVisible(false);
                    this.byId("addButton").setVisible(false);
                    this.byId("deleteButton").setVisible(false);
                    this.byId("idProductsTable").setMode("None");

                    // this.byId("editmode").setEnabled(false);
                    // this.byId("addButton").setEnabled(false);
                    // this.byId("deleteButton").setEnabled(false);
                }
                else {
                    oEvent.getSource().setText("Unlocked");
                    oEvent.getSource().setIcon("sap-icon://unlocked");

                    this.byId("editmode").setVisible(true);
                    this.byId("addButton").setVisible(true);
                    this.byId("deleteButton").setVisible(true);
                    this.byId("idProductsTable").setMode("MultiSelect");
                    // this.byId("editmode").setEnabled(true);
                    // this.byId("addButton").setEnabled(true);
                    // this.byId("deleteButton").setEnabled(true);


                }
            }
        });
    });
