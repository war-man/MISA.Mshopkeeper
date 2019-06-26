
// Form chung cho các thao tác thêm mới, xem, sửa , xóa ..
// Người tạo: ntxuan (4/5/2019)
class PurchaseFormDialog {

    // Hàm khởi tạo
    // Người tạo: NTXUAN (28/04/2019)
    constructor() {
        // Chạy các hàm khởi tạo
        this.init();
    }

    // Khởi tạo các sự kiện
    // Người tạo: NTXUAN (28/04/2019)
    init() {
        this.setExspectAndCollasp();
        this.setResizeAble();
        this.setValueDefault();
        this.setAsyncValueDate();
        this.setMethodPayment();
        this.setEventRadioClick();
        this.setStatusChecked();
        this.setShowHideDialog();
        this.addDatePickerForInput();
        this.checkValidateValue();
        this.excuteEventDelete();
        this.setEventClickButtonMenu();
        this.setEventUploadFile();
        this.setDragFileImport();
        this.validateAllInputText();
        this.setEventTabIndex();
        this.checkValidSupplierAndEmployeeInput();
        this.loadMerchandise();
        this.chooseMerchandise();
        this.validateFormatCurrency();
    }

    // Định dạng tiền tệ
    // Người tạo: ntxuan (29/5/2019)
    validateFormatCurrency() {
        $('[data-thousands="."]').maskNumber({ integer: true });
        $(".row-empty [fieldName]").data("value", 0);
        $(".row-empty [fieldName='Quantity']").data("value", 1);
    }

    // Load các hàng hóa vào bảng
    // Người tạo: ntxuan (28/5/2019)
    loadMerchandise() {
        dataStorage.listSKU = [];
        common.callAjaxToServer("Get", "/purchase/getListMerchandise", null, function (result) {
            if (result.Success) {
                $(".table-sku_body").html("");
                $.each(result.Data, function (index, product) {
                    dataStorage.listSKU.push(product.SKU);
                    $(".table-sku_row-clone .row-left").text(product.SKU);
                    $(".table-sku_row-clone .row-center").text(product.Barcode);
                    $(".table-sku_row-clone .row-right").text(product.ProductName);
                    $(".table-sku_row-clone .table-sku_body_row").data("product", product);

                    $(".table-sku_body").append($(".table-sku_row-clone .table-sku_body_row").clone(true));
                });
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Kiểm tra importNumber có trùng trong hệ thống không
    // Người tạo: ntxuan (24/6/2019)
    checkDuplicateImportNumber(isEdit, importNumber,id) {
        var check = false;
        var url = "/purchase/GetInvoiceByImportNumber?importNumber=" + importNumber;
        $.ajax({
            method: "Post",
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.Success) {
                    if (result.Data.ImportNumber !== null) {
                        if (importNumber !== result.Data.ImportNumber && !isEdit) {
                            check = true;
                        } else if (isEdit && result.Data.InvoiceID === id && importNumber === result.Data.ImportNumber) {
                            check = true;
                        } else if (isEdit && result.Data.InvoiceID !== id && importNumber !== result.Data.ImportNumber) {
                            check = true;
                        }
                    } else {
                        check = true;
                    }
                } else {
                    purchase.showDialogError(result.Messenger);
                }
            }
        });
        return check;
    }

    // Kiểm tra expenditureNumber có trùng trong hệ thống không
    // Người tạo: ntxuan (24/6/2019)
    checkDuplicateExpenditureNumber(isEdit, expenditureNumber, id) {
        var check = false;
        var url = "/purchase/GetInvoiceByExpenditureNumber?expenditureNumber=" + expenditureNumber;
        $.ajax({
            method: "Post",
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.Success) {
                    if (result.Data.ImportNumber !== null) {
                        if (expenditureNumber !== result.Data.ExpenditureNumber && !isEdit) {
                            check = true;
                        } else if (isEdit && result.Data.InvoiceID === id && expenditureNumber === result.Data.ExpenditureNumber) {
                            check = true;
                        } else if (isEdit && result.Data.InvoiceID !== id && expenditureNumber !== result.Data.ExpenditureNumber) {
                            check = true;
                        }
                    } else {
                        check = true;
                    }
                } else {
                    purchase.showDialogError(result.Messenger);
                }
            }
        });
        return check;
    }

    // Chọn hàng hóa vào form
    // Người tạo: ntxuan (28/5/2019)
    chooseMerchandise() {
        $(".form-addNew").on("mousedown", ".table-sku_body_row", function () {
            let product = $(this).data("product");
            let rowCurrent = $(".detail-data.row-current");
            if (rowCurrent.hasClass("row-empty")) {
                $(".form-addNew .list-data-bottom").append(rowCurrent.clone(true));
                rowCurrent.removeClass("row-empty").addClass("other-row");
            }
            rowCurrent.find('[fieldname="Quantity"]').val(1);
            rowCurrent.find('[fieldname="ProductName"]').text(product.ProductName).data("value", product.ProductName);
            rowCurrent.find('[fieldname="SKU"]').val(product.SKU).data("value", product.SKU);
            rowCurrent.find('[fieldname="Storage"]').text(product.Storage).data("value", product.Storage);
            rowCurrent.find('[fieldname="Unit"]').text(product.Unit).data("value", product.Unit);
            rowCurrent.find('[fieldname="UnitPrice"]').val(product.UnitPrice.formatNumber()).data("value", product.UnitPrice);

            let valueChange = rowCurrent.find(".detailData6 input").data("value") * rowCurrent.find(".detailData5 input").data("value");
            rowCurrent.find(".detailData7 input").val(valueChange.formatNumber()).data("value", valueChange);
            purchaseFormDialog.validateDataRow(rowCurrent);
            // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
            purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
            $(".row-current").removeClass("row-current");
        });
    }

    // Xóa nhiều hóa đơn
    // Người tạo: ntxuan (25/5/2019)
    deleteMultiInvoice() {
        let listInvoiceID = [];
        $(".content-right .wrapp-dataTable .row-clicked").each(function () {
            listInvoiceID.push($(this).data("InvoiceID"));
        });
        $(".item-index .check").attr("class", "check unchecked-img");
        common.callAjaxToServer("Post", "/purchase/DeleteMultiInvoice", listInvoiceID, function (result) {
            if (result.Success) {
                purchase.getDataFromServer();
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Thiết lập chức năng dùng tabindex cho form
    // Người tạo: ntxuan (20/5/2019)
    setEventTabIndex() {
        // Khi bấm shift tab vào ô mã nhà cung cấp
        $('input[fieldname="SupplierCode"]').keydown(function (event) {
            if (event.shiftKey && event.which === 9) {
                $('.row-empty [fieldname="TaxPercentage"]').focus();
                event.preventDefault();
            }
        });
        
        $(".detail-header-item13").focus(function () {
            $('.row-empty [fieldname="TaxPercentage"]').focus();
        });

        $('.invoicePress input[fieldname="ImportTime"]').keydown(function (event) {
            if (!event.shiftKey && event.which === 9) {
                $(".tabindex-row:first").focus();
                event.preventDefault();
            }
        });
        $(".footer-bottom").focus(function () {
            $(".tabindex-row:first").focus();
        });
    }

    // Lấy các thông tin nhà cung cấp từ server
    // Người tạo: ntxuan (13/5/2019)
    loadSuppliersFromServer() {
        // Thực hiện ajax gọi các nhà cung cấp từ server
        common.callAjaxToServer("Get", "/purchase/GetSuppliers", null, function (result) {
            if (result.Success) {
                dataStorage.supplierCodes = [];
                dataStorage.supplierNames = [];
                // Xóa trắng nội dung của bảng dữ liệu để đổ dữ liệu mới
                $(".purchaseForm .form-choose-supplier.supplier .form-choose-supplier_tables-body").html("");
                $(".purchaseForm .supplier-table.table1 .supplier-table_body").html("");
                // Thực hiện vòng lặp đổ dữ liệu từ mảng dữ liệu lấy từ server
                $.each(result.Data, function (i, supplier) {
                    // Đổ dữ liệu cho mảng
                    dataStorage.supplierCodes.push(supplier["SupplierCode"].trim());
                    dataStorage.supplierNames.push(supplier["SupplierName"].trim());

                    // Đổ dữ liệu cho chọn nhà cung cấp theo form
                    $(".supplier-row-clone div[fieldName]").each(function () {
                        let fieldName = $(this).attr("fieldName");
                        $(this).text(supplier[fieldName]);
                    });
                    $(".supplier-row-clone .row-supplier-item").data("SupplierID", supplier["SupplierID"]);
                    // Append div vừa đổ dữ liệu vào body
                    $(".purchaseForm .form-choose-supplier.supplier .form-choose-supplier_tables-body").append($(".supplier-row-clone .row-supplier-item").clone(true));
                    if (i % 2 !== 0) {
                        $(".form-choose-supplier.supplier .form-choose-supplier_tables-body .row-supplier-item:last-child").addClass("row-add");
                    }

                    // Đổ dữ liệu cho chọn nhà cung cấp nhanh
                    let listElements2 = $(".supplier-table-row-clone div[fieldName]");
                    $.each(listElements2, function (i, element) {
                        let fieldName = $(element).attr("fieldName");
                        $(element).text(supplier[fieldName]);
                    });
                    $(".supplier-table-row-clone .supplier-table_body-row").data("SupplierID", supplier["SupplierID"]);
                    $(".purchaseForm .supplier-table.table1 .supplier-table_body").append($(".supplier-table-row-clone .supplier-table_body-row").clone(true));
                });
                // Focus vào dòng dữ liệu đầu tiên
                $(".form-choose-supplier.supplier .form-choose-supplier_tables-body .row-supplier-item:first-child").addClass("row-checked");
                // Check vào button radio đầu tiên
                $(".form-choose-supplier.supplier .form-choose-supplier_tables-body .row-supplier-item:first-child input").prop("checked", true);
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Lấy các thông tin nhân viên từ server
    // Người tạo: ntxuan (13/5/2019)
    loadEmployeesFromServer() {
        // Thực hiện ajax gọi tới server lấy các nhân viên về
        common.callAjaxToServer("Get", "/purchase/GetEmployees", null, function (result) {
            if (result.Success) {
                dataStorage.employeeCodes = [];
                dataStorage.employeeNames = [];
                // Xóa trắng nội dung của body để đổ dữ liệu mới
                $(".purchaseForm .form-choose-supplier.employee .form-choose-supplier_tables-body").html("");
                $(".purchaseForm .supplier-table.table2 .supplier-table_body").html("");
                // Thực hiện vòng lặp đổ mảng dữ liệu nhân viên lấy từ server vào một div clone
                $.each(result.Data, function (i, employee) {
                    // Đổ dữ liệu cho mảng
                    dataStorage.employeeCodes.push(employee["EmployeeCode"].trim());
                    dataStorage.employeeNames.push(employee["EmployeeName"].trim());

                    let listElements = $(".employee-row-clone div[fieldName]");
                    $.each(listElements, function (i, element) {
                        let fieldName = $(element).attr("fieldName");
                        $(element).text(employee[fieldName]);
                    });
                    $(".employee-row-clone .row-supplier-item").data("EmployeeID", employee["EmployeeID"]);
                    // Append div clone đó vào phần body hiển thị
                    $(".purchaseForm .form-choose-supplier.employee .form-choose-supplier_tables-body").append($(".employee-row-clone .row-supplier-item").clone(true));
                    // Nếu dòng chẵn thì có background màu khác dòng lẻ
                    if (i % 2 !== 0) {
                        $(".form-choose-supplier.employee .form-choose-supplier_tables-body .row-supplier-item:last-child").addClass("row-add");
                    }

                    // Đổ dữ liệu cho chọn nhà cung cấp nhanh
                    let listElements2 = $(".employee-table-row-clone div[fieldName]");
                    $.each(listElements2, function (i, element) {
                        let fieldName = $(element).attr("fieldName");
                        $(element).text(employee[fieldName]);
                    });
                    $(".employee-table-row-clone .supplier-table_body-row").data("EmployeeID", employee["EmployeeID"]);
                    $(".purchaseForm .supplier-table.table2 .supplier-table_body").append($(".employee-table-row-clone .supplier-table_body-row").clone(true));
                });
                // Xét trạng thái checked cho dòng đầu tiên
                $(".form-choose-supplier.employee .form-choose-supplier_tables-body .row-supplier-item:first-child").addClass("row-checked");
                // Xét trạng thái checked cho input radio đầu tiên
                $(".form-choose-supplier.employee .form-choose-supplier_tables-body .row-supplier-item:first-child input").prop("checked", true);
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Hàm xử lý lưu dữ liệu khi chỉnh sửa
    // Người tạo: ntxuan (21/5/2019)
    saveEditInvoiceToServer(invoice, invoicesDetails) {
        let invoiceId = $(".content-right .wrapp-dataTable .row-clicked").data("InvoiceID");
        invoice["InvoiceID"] = invoiceId;
        // Gọi ajax post dữ liệu lên server
        common.callAjaxToServer("Post", "/purchase/SaveEditInvoice", invoice, function (result) {
            if (result.Success) {
                for (var i = 0; i < invoicesDetails.length; i++) {
                    invoicesDetails[i].invoiceId = result.Data;
                }
                purchaseFormDialog.pushListInvoiceDetailToServer(invoicesDetails);
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Hàm kiểm tra tên nhà cung cấp hợp lệ
    // Người tạo: ntxuan(21/5/2019)
    checkValidSupplierAndEmployeeInput() {
       
        // Khi nhập một từ nếu tồn tại từ đó trong tên hoặc mã thì hiển thị thì hiển thị
        $('input[fieldname="SupplierCode"]').keydown(function () {
            // Bấm enter thì chọn nhà cung cấp
            if (event.keyCode !== 9) {
                if (event.keyCode === 13) {
                    let supplierCode = $(".row-hover").find(".supplier-table_body-row-left").text().trim();
                    let nameSupplier = $(".row-hover").find(".supplier-table_body-row-right").text().trim();
                    $('.purchaseForm input[fieldName="SupplierID"]').val($(".row-hover").data("SupplierID"));
                    purchaseFormDialog.asyncSupplierInfor(supplierCode, nameSupplier);
                    $(".supplier-table.table1").hide();
                    $(".row-hover").removeClass("row-hover");
                } else if (event.keyCode === 40) {
                    if ($(".supplier-table.table1:visible").length > 0) {
                        if ($(".row-hover").nextAll(".supplier-table_body-row:visible").first().hasClass("supplier-table_body-row")) {
                            $(".row-hover").removeClass("row-hover").nextAll(".supplier-table_body-row:visible").first().addClass("row-hover");
                        }
                    } else {
                        $(".supplier-table.table1").show();
                        $(".supplier-table.table1 .supplier-table_body-row").show();
                        $(".row-hover").removeClass("row-hover");
                        $(".supplier-table.table1 .supplier-table_body-row:visible").eq(0).addClass("row-hover");
                        $(".table1 .supplier-table_body").scrollTop(0);
                    }
                } else if (event.keyCode === 38) {
                    if ($(".supplier-table.table1:visible").length > 0) {
                        if ($(".row-hover").prevAll(".supplier-table_body-row:visible").first().hasClass("supplier-table_body-row")) {
                            $(".row-hover").removeClass("row-hover").prevAll(".supplier-table_body-row:visible").first().addClass("row-hover");
                        }
                    }
                }
                else {
                    $(".table1 .supplier-table_body").scrollTop(0);
                    let value = $(this).val().toLowerCase();
                    $(".row-hover").removeClass("row-hover");
                    let checkHasValue = false;
                    $(".supplier-table.table1 .supplier-table_body-row").hide();
                    $(".supplier-table.table1 .supplier-table_body-row").each(function () {
                        let supplierCode = $(this).find('[fieldname="SupplierCode"]').text().trim().toLowerCase();
                        let supplierName = $(this).find('[fieldname="SupplierName"]').text().trim().toLowerCase();
                        if (supplierCode.includes(value) || supplierName.includes(value)) {
                            $(this).show();
                            checkHasValue = true;
                        } else {
                            $(this).hide();
                        }
                    });
                    if (checkHasValue) {
                        $(".supplier-table.table1").show();
                        $(".supplier-table.table1 .supplier-table_body-row:visible").eq(0).addClass("row-hover");
                    } else {
                        $(".supplier-table.table1").hide();
                    }
                }
                let scrollTop = $(".table1 .supplier-table_body .row-hover").offset().top - 352;
                let heightTableData = $(".table1 .supplier-table_body").height();
                if (scrollTop > heightTableData) {
                    $(".table1 .supplier-table_body").scrollTop($(".table1 .supplier-table_body").scrollTop() + heightTableData);
                } else if (scrollTop < 0) {
                    $(".table1 .supplier-table_body").scrollTop($(".table1 .supplier-table_body").scrollTop() - heightTableData + 32);
                }
            }
        });


        // Khi nhập một từ nếu tồn tại từ đó trong tên hoặc mã thì hiển thị thì hiển thị
        $('input[fieldname="EmployeeCode"]').keydown(function () {
            if (event.keyCode !== 9) {
                // Bấm enter thì chọn nhà cung cấp
                if (event.keyCode === 13) {
                    let employeeCode = $(".row-hover").find(".supplier-table_body-row-left").text().trim();
                    let employeeName = $(".row-hover").find(".supplier-table_body-row-right").text().trim();
                    $('.purchaseForm input[fieldName="EmployeeID"]').val($(".row-hover").data("EmployeeID"));
                    $(".invoicePress .multiItem.flex input").eq(1).val(employeeCode);
                    $(".invoicePress .name-company").eq(1).val(employeeName);
                    $(".supplier-table.table2").hide();
                    $(".row-hover").removeClass("row-hover");
                } else if (event.keyCode === 40) {
                    if ($(".supplier-table.table2:visible").length > 0) {
                        if ($(".row-hover").nextAll(".supplier-table_body-row:visible").first().hasClass("supplier-table_body-row")) {
                            $(".row-hover").removeClass("row-hover").nextAll(".supplier-table_body-row:visible").first().addClass("row-hover");
                        }
                    } else {
                        $(".supplier-table.table2").show();
                        $(".supplier-table.table2 .supplier-table_body-row").show();
                        $(".supplier-table.table2 .supplier-table_body-row:visible").eq(0).addClass("row-hover");
                        $(".table2 .supplier-table_body").scrollTop(0);
                    }
                }
                else if (event.keyCode === 38) {
                    if ($(".supplier-table.table2:visible").length > 0) {
                        if ($(".row-hover").prevAll(".supplier-table_body-row:visible").first().hasClass("supplier-table_body-row")) {
                            $(".row-hover").removeClass("row-hover").prevAll(".supplier-table_body-row:visible").first().addClass("row-hover");
                        }
                    }
                }
                else {
                    $(".table1 .supplier-table_body").scrollTop(0);
                    let value = $(this).val().toLowerCase();
                    $(".row-hover").removeClass("row-hover");
                    let checkHasValue = false;
                    $(".supplier-table.table2 .supplier-table_body-row").hide();
                    $(".supplier-table.table2 .supplier-table_body-row").each(function () {
                        let employeeCode = $(this).find('[fieldname="EmployeeCode"]').text().trim().toLowerCase();
                        let employeeName = $(this).find('[fieldname="EmployeeName"]').text().trim().toLowerCase();
                        if (employeeCode.includes(value) || employeeName.includes(value)) {
                            $(this).show();
                            checkHasValue = true;
                        } else {
                            $(this).hide();
                        }
                    });
                    if (checkHasValue) {
                        $(".supplier-table.table2").show();
                        $(".supplier-table.table2 .supplier-table_body-row:visible").eq(0).addClass("row-hover");
                    } else {
                        $(".supplier-table.table2").hide();
                    }
                }

                let scrollTop = $(".table2 .supplier-table_body .row-hover").offset().top - 182;
                let heightTableData = $(".table2 .supplier-table_body").height();
                if (scrollTop > heightTableData) {
                    $(".table2 .supplier-table_body").scrollTop($(".table2 .supplier-table_body").scrollTop() + heightTableData);
                } else if (scrollTop < 0) {
                    $(".table2 .supplier-table_body").scrollTop($(".table2 .supplier-table_body").scrollTop() - heightTableData + 32);
                }
            }
        });

        // Khi nhập một từ nếu tồn tại từ đó trong tên hoặc mã thì hiển thị thì hiển thị
        $('input[fieldname="SKU"]').keydown(function () {
            if (event.keyCode !== 9) {
                $(".row-current").removeClass("row-curent");
                $(this).closest(".detail-data").addClass("row-current");
                // Bấm enter thì chọn nhà cung cấp
                if (event.keyCode === 13) {
                    let product = $(".row-hover").data("product");
                    let rowCurrent = $(".detail-data.row-current");
                    if (rowCurrent.hasClass("row-empty")) {
                        $(".form-addNew .list-data-bottom").append(rowCurrent.clone(true));
                        rowCurrent.removeClass("row-empty").addClass("other-row");
                        $('.row-empty input[fieldname="SKU"]').val("");
                    }
                    rowCurrent.find('[fieldname="Quantity"]').val(1);
                    rowCurrent.find('[fieldname="ProductName"]').text(product.ProductName).data("value", product.ProductName);
                    rowCurrent.find('[fieldname="SKU"]').val(product.SKU).data("value", product.SKU);
                    rowCurrent.find('[fieldname="Storage"]').text(product.Storage).data("value", product.Storage);
                    rowCurrent.find('[fieldname="Unit"]').text(product.Unit).data("value", product.Unit);
                    rowCurrent.find('[fieldname="UnitPrice"]').val(product.UnitPrice.formatNumber()).data("value", product.UnitPrice);

                    let valueChange = rowCurrent.find(".detailData6 input").data("value") * rowCurrent.find(".detailData5 input").data("value");
                    rowCurrent.find(".detailData7 input").val(valueChange.formatNumber()).data("value", valueChange);
                    purchaseFormDialog.validateDataRow(rowCurrent);
                    // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
                    purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
                    $(".row-current").removeClass("row-current");
                    $(".table-sku").hide();
                    $(".row-hover").removeClass("row-hover");
                } else if (event.keyCode === 40) {
                    if ($(".table-sku:visible").length > 0) {
                        if ($(".row-hover").nextAll(".table-sku_body_row:visible").first().hasClass("table-sku_body_row")) {
                            $(".row-hover").removeClass("row-hover").nextAll(".table-sku_body_row:visible").first().addClass("row-hover");
                        }
                    } else {
                        $(".table-sku").show();
                        $(".table-sku .table-sku_body_row").show();
                        $(".table-sku .table-sku_body_row:visible").eq(0).addClass("row-hover");
                        $(".table-sku .table-sku_body").scrollTop(0);
                    }
                } else if (event.keyCode === 38) {
                    if ($(".table-sku:visible").length > 0) {
                        if ($(".row-hover").prevAll(".table-sku_body_row:visible").first().hasClass("table-sku_body_row")) {
                            $(".row-hover").removeClass("row-hover").prevAll(".table-sku_body_row:visible").first().addClass("row-hover");
                        }
                    }
                }
                else {
                    let value = $(this).val().toLowerCase();
                    $(".row-hover").removeClass("row-hover");
                    let checkHasValue = false;
                    $(".table-sku .table-sku_body_row").hide();
                    $(".table-sku .table-sku_body_row").each(function () {
                        let sku = $(this).find('.row-left').text().trim().toLowerCase();
                        let productName = $(this).find('.row-right').text().trim().toLowerCase();
                        if (sku.includes(value) || productName.includes(value)) {
                            $(this).show();
                            checkHasValue = true;
                        } else {
                            $(this).hide();
                        }
                    });
                    if (checkHasValue) {
                        $(".table-sku").show();
                        $(".table-sku .table-sku_body_row:visible").eq(0).addClass("row-hover");
                        $(".table-sku .table-sku_body").scrollTop(0);
                    } else {
                        $(".table-sku").hide();
                    }
                }
                let scrollTop = $(".table-sku_body .row-hover").offset().top - 420;
                let heightTableData = $(".table-sku_body").height();
                if (scrollTop > heightTableData) {
                    $(".table-sku_body").scrollTop($(".table-sku_body").scrollTop() + heightTableData);
                } else if (scrollTop < 0) {
                    $(".table-sku_body").scrollTop($(".table-sku_body").scrollTop() - heightTableData + 35);
                }

            }
           
        });

        // Kiểm tra mã nhà cung cấp hợp lệ
        $('input[fieldname="SKU"]').blur(function () {
            let value = $(this).val().trim().toUpperCase();
            // Nếu mã nhà cung cấp nhập vào không có trong hệ thống thì xóa trắng
            if (!dataStorage.listSKU.includes(value)) {
                if ($(this).closest(".detail-data").hasClass("other-row")) {
                    $(this).val($(this).data("value"));
                } else {
                    $(this).val("");
                }
            } else {
               // alert("XUAN");
                let product;
                // Nếu có tồn tại mã nhân viên thì hiển thị cả tên
                $('.table-sku .table-sku_body_row .row-left').each(function () {
                    let val = $(this).text().trim().toUpperCase();
                    if (value === val) {
                        product = $(this).parent().data("product");
                    }
                });
                let rowCurrent = $(this).closest(".detail-data");
                if (rowCurrent.hasClass("row-empty")) {
                    $(".form-addNew .list-data-bottom").append(rowCurrent.clone(true));
                    rowCurrent.removeClass("row-empty").addClass("other-row");
                    $('.row-empty input[fieldname="SKU"]').val("");
                }
                rowCurrent.find('[fieldname="Quantity"]').val(1);
                rowCurrent.find('[fieldname="ProductName"]').text(product.ProductName).data("value", product.ProductName);
                rowCurrent.find('[fieldname="SKU"]').val(product.SKU).data("value", product.SKU);
                rowCurrent.find('[fieldname="Storage"]').text(product.Storage).data("value", product.Storage);
                rowCurrent.find('[fieldname="Unit"]').text(product.Unit).data("value", product.Unit);
                rowCurrent.find('[fieldname="UnitPrice"]').val(product.UnitPrice.formatNumber()).data("value", product.UnitPrice);

                let valueChange = rowCurrent.find(".detailData6 input").data("value") * rowCurrent.find(".detailData5 input").data("value");
                rowCurrent.find(".detailData7 input").val(valueChange.formatNumber()).data("value", valueChange);
                purchaseFormDialog.validateDataRow(rowCurrent);
                // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
                purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
            }
        });

        // Kiểm tra mã nhà cung cấp hợp lệ
        $('input[fieldname="SupplierCode"]').blur(function () {
            let value = $(this).val().trim();
            // Nếu mã nhà cung cấp nhập vào không có trong hệ thống thì xóa trắng
            if (!dataStorage.supplierCodes.includes(value)) {
                $('input[fieldname="SupplierCode"]').val("");
                $('input[fieldname="SupplierName"]').val("");
                $('input[fieldname="SupplierID"]').val("");
            } else {
                // Nếu có tồn tại mã nhân viên thì hiển thị cả tên
                $('.form-choose-supplier.supplier div[fieldname="SupplierCode"]').each(function () {
                    if (value === $(this).text().trim()) {
                        let SupplierCode = $(this).text().trim();
                        let SupplierName = $(this).next().text().trim();
                        let SupplierID = $(this).parent().data("SupplierID");
                        $('input[fieldname="SupplierCode"]').val(SupplierCode);
                        $('input[fieldname="SupplierName"]').val(SupplierName);
                        $('input[fieldname="SupplierID"]').val(SupplierID);
                    }
                });
            }
        });

        // Kiểm tra tên nhà cung cấp hợp lệ
        $('input[fieldname="SupplierName"]').blur(function () {
            let value = $(this).val().trim();
            // Nếu tên nhà cung cấp không có trong hệ thống thì xóa trắng
            if (!dataStorage.supplierNames.includes(value)) {
                $('input[fieldname="SupplierCode"]').val("");
                $('input[fieldname="SupplierName"]').val("");
                $('input[fieldname="SupplierID"]').val("");
            } else {
                // Nếu có tồn tại tên nhà cung cấp thì hiển thị cả mã
                $('.form-choose-supplier.supplier div[fieldname="SupplierName"]').each(function () {
                    if (value === $(this).text().trim()) {
                        let SupplierName = $(this).text().trim();
                        let SupplierCode = $(this).prev().text().trim();
                        let SupplierID = $(this).parent().data("SupplierID");
                        $('input[fieldname="SupplierCode"]').val(SupplierCode);
                        $('input[fieldname="SupplierName"]').val(SupplierName);
                        $('input[fieldname="SupplierID"]').val(SupplierID);
                    }
                });
            }
        });

        // Kiểm tra mã nhân viên hợp lệ
        $('input[fieldname="EmployeeCode"]').blur(function () {
            let value = $(this).val().trim();
            // Nếu mã nhân viên không có trong hệ thống thì xóa trắng
            if (!dataStorage.employeeCodes.includes(value)) {
                $('input[fieldname="EmployeeCode"]').val("");
                $('input[fieldname="EmployeeName"]').val("");
                $('input[fieldname="EmployeeID"]').val("");
            } else {
                // Nếu có tồn tại mã nhân viên thì hiển thị cả tên
                $('.form-choose-supplier.employee div[fieldname="EmployeeCode"]').each(function () {
                    if (value === $(this).text().trim()) {
                        let EmployeeCode = $(this).text().trim();
                        let EmployeeName = $(this).next().text().trim();
                        let EmployeeID = $(this).parent().data("EmployeeID");
                        $('input[fieldname="EmployeeCode"]').val(EmployeeCode);
                        $('input[fieldname="EmployeeName"]').val(EmployeeName);
                        $('input[fieldname="EmployeeID"]').val(EmployeeID);
                    }
                });
            }
        });

        // Kiểm tra tên nhân viên hợp lệ
        $('input[fieldname="EmployeeName"]').blur(function () {
            let value = $(this).val().trim();
            // Nếu tên nhân viên không có trong hệ thống thì xóa trắng
            if (!dataStorage.employeeNames.includes(value)) {
                $('input[fieldname="EmployeeCode"]').val("");
                $('input[fieldname="EmployeeName"]').val("");
                $('input[fieldname="EmployeeID"]').val("");
            } else {
                // Nếu có tồn tại tên nhân viên thì hiển thị cả mã
                $('.form-choose-supplier.employee div[fieldname="EmployeeName"]').each(function () {
                    if (value === $(this).text().trim()) {
                        let EmployeeName = $(this).text().trim();
                        let EmployeeCode = $(this).prev().text().trim();
                        let EmployeeID = $(this).parent().data("EmployeeID");
                        $('input[fieldname="EmployeeCode"]').val(EmployeeCode);
                        $('input[fieldname="EmployeeName"]').val(EmployeeName);
                        $('input[fieldname="EmployeeID"]').val(EmployeeID);
                    }
                });
            }
        });
    }

    // Lưu một hóa đơn lên server
    // Người tạo: ntxuan 17/5/2019)
    saveNewInvoice() {
        dataStorage.allowHotKeyForm = false;
        dataStorage.allowHotKeyGrid = true;
        // KHởi tạo một đối tượng hóa đơn để truyền lên server
        let invoice = {};
        // Nạp dữ liệu vào cho đối tượng hóa đơn
        $(".Invoice input[fieldName]").each(function () {
            let fieldName = $(this).attr("fieldName");
            if ($(this).attr("fieldData") === "Date") {
                invoice[fieldName] = common.convertStringJSToStringCsharp(this);
            } else {
                invoice[fieldName] = $(this).val();
            }
        });

        // Khởi tạo mảng các sản phẩm
        let invoicesDetails = [];

        let listElement = $(".purchaseForm .footer-content-right .other-row");
        $.each(listElement, function (i, rowCurrent) {
            let colCurrents = $(rowCurrent).find('[fieldname]');
            let product = {};
            $.each(colCurrents, function (i, element) {
                let fieldName = $(element).attr("fieldname");
                product[fieldName] = $(element).data("value");
            });
            invoicesDetails.push(product);
        });

        if (dataStorage.checkEditForm) {
            purchaseFormDialog.saveEditInvoiceToServer(invoice, invoicesDetails);
        } else {
            // Gọi ajax post dữ liệu lên server
            common.callAjaxToServer("Post", "/purchase/SaveNewInvoice", invoice, function (result) {
                if (result.Success) {
                    for (var i = 0; i < invoicesDetails.length; i++) {
                        invoicesDetails[i].invoiceId = result.Data;
                    }
                    purchaseFormDialog.pushListInvoiceDetailToServer(invoicesDetails);
                } else {
                    purchase.showDialogError(result.Messenger);
                }
            });
        }
    }

    // Lưu danh sách các hóa đơn chi tiết lên server
    // Người tạo: ntxuan (28/5/2019)
    pushListInvoiceDetailToServer(invoicesDetails) {
        common.callAjaxToServer("Post", "/purchase/SaveListInvoiceDetail", invoicesDetails, function (result) {
            if (result.Success) {
                purchase.getDataFromServer();
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Dùng để lưu hóa đơn 
    // Người tạo: ntxuan (19/5/2019)
    btnSaveInvoice() {
        let checkValid = true;
        let checkBill = $(".form-menuPayment .check").hasClass("checked-img");
        let importNumber = $('input[fieldname="ImportNumber"]').val().trim();
        let expenditureNumber = $('input[fieldname="ExpenditureNumber"]').val().trim();
        let invoiceID = dataStorage.checkEditForm ? $(".content-right .wrapp-dataTable .row-clicked").data("InvoiceID") : "";
        // Kiểm tra xem nhà cung cấp đã được nhập vào chưa, nếu chua thì báo lỗi
        if ($(".purchaseForm .quick-supplier").prev().prev().val() === "") {
            dialogError.setMessageError("Phiếu nhập hàng không được bỏ trống nhà cung cấp. Vui lòng kiểm tra lại.");
            checkValid = false;
        } else if ($('.purchaseForm input[fieldname="EmployeeCode"]').val() === "") {
            dialogError.setMessageError("Phiếu nhập hàng không được bỏ trống nhân viên mua hàng. Vui lòng kiểm tra lại.");
            checkValid = false;
        } else if ($(".form-addNew .list-data-bottom .other-row").length === 0) {
            dialogError.setMessageError("Bạn phải nhập ít nhất một hàng hóa. Vui lòng kiểm tra lại.");
            checkValid = false;
        } else if (checkBill && $('[fieldname="InvoiceNumber"]').val() === "") {
            dialogError.setMessageError("Số hóa đơn không được bỏ trống. Vui lòng kiểm tra lại.");
            checkValid = false;
        } else if (!purchaseFormDialog.checkDuplicateImportNumber(dataStorage.checkEditForm, importNumber, invoiceID)) {
            dialogError.setMessageError("Số phiếu nhập đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.");
            checkValid = false;
        } else if (!purchaseFormDialog.checkDuplicateExpenditureNumber(dataStorage.checkEditForm, expenditureNumber, invoiceID)) {
            dialogError.setMessageError("Số phiếu chi đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.");
            checkValid = false;
        } 

        // Nếu dữ liệu chưa hợp lệ thì hiển thị dialog thông báo lỗi, nếu hợp lệ thì đóng form thêm mới
        if (checkValid) {
            $(".purchaseForm").hide();
            $(".wrapper-background-gray").hide();
            $(".list-content-invoice .background-loading").show();
            purchase.setResizeAble();
            purchaseFormDialog.saveNewInvoice();
        } else {
            $(".dialog-btnError").hide();
            $(".dialog-error .icon-errors").attr("class", "icon-errors icon-dialog-warning");
            $(".dialog-accept").show();
            dialogError.openDialog();
        }
    }

    // Hàm hiện thông báo khi muốn xóa nhiều
    // Người tạo: ntxuan (25/5/2019)
    showMessageDeleteInvoice() {
        let sumRowDelete = $('.content-right .wrapp-dataTable .row-clicked').length;
        if (sumRowDelete > 1) {
            dialogError.setMessageError("Bạn có chắc chắn muốn xóa các phiếu nhập hàng đã chọn?");
        } else {
            let ImportNumber = $('.content-right .wrapp-dataTable .row-clicked span[fieldname="ImportNumber"]').text();
            dialogError.setMessageError("Bạn có chắc chắn muốn xóa phiếu nhập hàng <b>" + ImportNumber + " </b> không?");
        }
        $(".dialog-btnError").hide();
        $(".dialog-deleteAccept").show();
        $(".dialog-cancel").show();
        $(".dialog-error .icon-errors").attr("class", "icon-errors icon-dialog-question");
        dialogError.openDialog();
    }
   
    // Thực hiện các chức năng khi click vào các button trên menu form như lưu, tiện ích, ...
    // Người tạo: ntxuan(8/5/2019)
    setEventClickButtonMenu() {

        // Nếu bấm vào tiện ích thì hiển thị chức năng đang cập nhật
        $(".form-addNew_listMenu  .extention,.form-addNew_listMenu  .print,.form-addNew_listMenu  .icon10, .content-right .printTem").click(function () {
            dialogError.setMessageError("Chức năng đang cập nhật.");
            $(".dialog-btnError").hide();
            $(".dialog-error .icon-errors").attr("class", "icon-errors icon-dialog-warning");
            $(".dialog-accept").show();
            dialogError.openDialog();
        });

        // Nếu bấm vào tiện ích thì hiển thị chức năng đang cập nhật
        $(".form-addNew_listMenu  .delete").click(function () {
            purchaseFormDialog.showMessageDeleteInvoice();
        });

        // Nếu bấm vào lưu thì hiển thị thông báo 
        $(".form-addNew_listMenu  .save,.form-addNew_listMenu  .icon7").click(function () {
            purchaseFormDialog.btnSaveInvoice();
        });

        // Nếu bấm vào sửa thì hiện form sửa
        $(".form-addNew_listMenu  .edit,.form-addNew_listMenu  .icon6").click(function () {
            purchaseFormDialog.closePurchaseForm();
            purchase.resetFormCommon();
            purchaseFormDialog.openPurchaseEditForm();
            purchase.loadProductToPurchaseForm();
        });

        // Nếu bấm vào hoãn thì về xem
        $(".form-addNew_listMenu  .stop,.form-addNew_listMenu  .icon9").click(function () {
            purchaseFormDialog.closePurchaseForm();
            purchase.resetFormCommon();
            purchaseFormDialog.openPurchaseViewForm();
            purchase.loadProductToPurchaseForm();
        });

        // Nếu bấm vào thêm mới thì về xem
        $(".form-addNew_listMenu  .add,.form-addNew_listMenu  .icon5").click(function () {
            purchaseFormDialog.closePurchaseForm();
            purchase.resetFormCommon();
            purchaseFormDialog.openPurchaseAddNewForm();
        });

        // Nếu bấm vào trước thì về xem
        $(".form-addNew_listMenu  .btn-prev-view").click(function () {
            purchaseFormDialog.closePurchaseForm();
            let rowFocus = $(".content-right .wrapp-dataTable .row-clicked");
            purchase.loadInvoicePreviousOrNext(rowFocus, "previous");
            purchase.resetFormCommon();
            purchaseFormDialog.openPurchaseViewForm();
            purchaseFormDialog.checkButtonNextAndPrev();
        });

        // Nếu bấm vào sau thì về xem
        $(".form-addNew_listMenu  .btn-next-view").click(function () {
            purchaseFormDialog.closePurchaseForm();
            let rowFocus = $(".content-right .wrapp-dataTable .row-clicked");
            purchase.loadInvoicePreviousOrNext(rowFocus, "next");
            purchase.resetFormCommon();
            purchaseFormDialog.openPurchaseViewForm();
            purchaseFormDialog.checkButtonNextAndPrev();
        });

        // Nếu bấm vào đóng thì ẩn form
        $(".form-addNew_listMenu  .closed,.form-addNew_listMenu  .icon14").click(function () {
            if (dataStorage.checkViewForm) {
                purchaseFormDialog.closePurchaseForm();
            } else {
                dialogError.setMessageError("Dữ liệu chưa được lưu, bạn có muốn lưu không?");
                $(".dialog-btnError").hide();
                $(".dialog-error .icon-errors").attr("class", "icon-errors icon-dialog-question");
                $(".dialog-Save").show();
                $(".dialog-UnSave").show();
                $(".dialog-cancel").show();
                dialogError.openDialog();
            }
        });
    }

    //Thực hiện hành động thêm file excel cho nhập hàng hóa
    // Người tạo: NTXUAN (07/05/2019)
    setEventUploadFile() {
        //Khi click vào nhập khẩu thì hiện form import excel
        $(".btnUpload").click(function () {
            $(".wrapper-background-gray2").show();
            $(".import").show();
        });
        //Khi click upload file thì hiện form chọn file trong window
        $(".file-upload").click(function () {
            $("#fileInputUpload").click();
        });
        // Nếu có thay đổi file chọn thì hiển thị đường dẫn
        $("#fileInputUpload").change(function () {
            $(".file-upload-name").val($(this).val()).css("opacity", 1);
        });
        // Khi bấm vào button tiếp tục thì chuyển tới bước tiếp theo
        $(".import .continue").click(function () {
            $(".start-import").show();
            $(".continue").hide();
            $(".form-choose-supplier_tables-step1").hide();
            $(".form-choose-supplier_tables-step2").show();
        });
        // Khi bấm vào nhập khẩu thì chuyển tới bước tiếp theo
        $(".start-import").click(function () {
            $(".form-choose-supplier_tables-step2").hide();
            $(".form-choose-supplier_tables-step3").show();
        });
    }

    //Thực hiện hành động xóa khi click biểu tượng xóa
    // Người tạo: NTXUAN (28/04/2019)
    excuteEventDelete() {
        $(".icon-trash").click(function () {
            $(this).parent().parent().remove();
            purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
        });

        $(".detailData13").keyup(function () {
            if (event.which == 13 && $(this).closest(".detail-data").hasClass("other-row")) {
                $(this).closest(".detail-data").remove();
                $(".row-empty input:last").focus();
            }
        });
    }

    // Cài đặt chức năng mở rộng form hoặc thu gọn form thêm mới
    // Người tạo: NTXUAN (28/04/2019)
    setExspectAndCollasp() {

        // Khi bấm thu gọn form
        $(".purchaseForm #colspan").click(function () {
            $(this).hide();
            dataStorage.coslap = false;
            $(".purchaseForm #exspect").show();
            $(".purchaseForm .form-menuPayment").hide();
            $(".purchaseForm .navigate-invoice").hide();
            $(".purchaseForm .Invoice").hide();
            $(".purchaseForm .footer-content-right").height($(".purchaseForm").height() - 92);
            $(".table-sku").attr("class", "table-sku option-showDown");
        });

        // Khi bấm mở rộng form
        $(".purchaseForm #exspect").click(function () {
            $(this).hide();
            dataStorage.coslap = true;
            $(".purchaseForm #colspan").show();
            $(".purchaseForm .form-menuPayment").show();
            $(".purchaseForm .navigate-invoice").show();
            $(".purchaseForm .Invoice").show();
            $(".purchaseForm .footer-content-right").height($(".purchaseForm").height() - 442);
            $(".table-sku").attr("class", "table-sku option-showUp");
        });
    }

    // Thiết lập chức năng kéo co dãn cho các cột trong form
    // Người tạo: NTXUAN (28/04/2019)
    setResizeAble() {
        for (let i = 1; i < 11; i++) {
            let also = ".purchaseForm .detailData" + i;
            $(`.purchaseForm .detail-header-item${i}`).resizable({
                alsoResize: also,
                handles: 'e',
                minWidth: 100
            });
        }
        $(".form-choose-supplier").draggable();
    }

    // Khi mới mở form sẽ nhận các giá trị mặc định ngày hiện tại và giờ hiện tại
    // Người tạo: NTXUAN (04/05/2019)
    setValueDefault() {
        var now = new Date(Date.now());
        $(".icon-clock").prev().val(now.getDateFormat()).attr("data-previous", now.getDateFormat());
        // Lưu giá trị gần nhất để sau này sử dụng
        $(".DateInput").val(now.getDateCurrent()).attr("data-previous", now.getDateCurrent());
    }

    // Thiết lập giá trị đồng bộ hóa giữa các ngày tháng của phiếu nhập, chi, và ủy nhiệm chi
    // Người tạo: NTXUAN (04/05/2019)
    setAsyncValueDate() {
      
        //Khi thay đổi giờ là khoảng trắng thì về giờ lần gần nhất
        $(".DateOutput").change(function () {
            if ($(this).val() === "") {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
        });

    }

    // Thiết lập phương thức thanh toán trên form thêm mới
    // Created by: ntxuan (3/5/2019)
    setMethodPayment() {
        $('.form-menuPayment select').change(function () {
            let value = $(this).val();
            if ($(".form-menuPayment .check").hasClass("checked-img")) {
                $(".bill").show();
            }
            // Nếu value = 1 thì là chọn tiền gửi, nếu = 0 thì là tiền gửi
            if (value === "1") {
                $(".infor-common").hide();
                $(".navigate-invoice div").removeClass("tab-focus");
                $(".navigate-invoice div").hide();
                $(".delegate-pupop").show();
                $(".delegate").show().addClass("tab-focus");
                $(".invoice-in").show();
                if ($(".form-menuPayment .check").hasClass("checked-img")) {
                    $(".bill").show();
                }
                $('.purchaseForm input[fieldName="TypeInvoice"]').val(3);
            } else {
                $(".delegate").hide();
                $(".infor-common").hide();
                purchaseFormDialog.setDefaultClickRadio2();
            }
        });
    }

    // sét sự kiện khi click vào radio2 thanh toán ngay
    // Người tạo: NTXUAN (03/05/2019)
    setEventRadioClick() {
        // Khi click vào radio ghi nợ nhà cung cấp
        $(".purchaseForm #radio1").change(function () {
            if ($(this).is(":checked")) {
                purchaseFormDialog.setDefaultClickRadio1();
            }
        });

        // Khi click vào radio thanh toán ngay
        $(".purchaseForm #radio2").change(function () {
            if ($(this).is(":checked")) {
                purchaseFormDialog.setDefaultClickRadio2();
            }
        });
        // Khi chọn select option
        $(".form-menuPayment select").change(function () {
            let value = $(this).val();
            console.log(value);
            if (value == 0) {
                $('.purchaseForm input[fieldName="TypeInvoice"]').val(2);
            } else {
                $('.purchaseForm input[fieldName="TypeInvoice"]').val(3);
            }
        });
    }

    // Các hiệu ứng khi click vào radio ghi nợ nhà cung cấp trong form thêm mới
    // Người tạo: NTXUAN (03/05/2019)
    setDefaultClickRadio1() {
        $('.purchaseForm input[fieldName="TypeInvoice"]').val(1);
        $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");
        $(".navigate-invoice div").removeClass("tab-focus");
        $(".navigate-invoice div").hide();
        $(".infor-common").hide();
        $(".invoice-in").show().addClass("tab-focus");
        $(".invoicePress").show();
        if ($(".form-menuPayment .check").hasClass("checked-img")) {
            $(".bill").show();
        }
        $('.form-menuPayment select').val("0");
    }

    // Các hiệu ứng khi click vào radio thanh toán ngay trong form thêm mới
    // Người tạo: NTXUAN (03/05/2019)
    setDefaultClickRadio2() {
        $(".invoice-out").show();
        $('.form-menuPayment .left select').prop('disabled', false).removeClass("div-disabled");
        $(".invoicePress").hide();
        $(".vouchers").show();
        $(".navigate-invoice div").removeClass("tab-focus");
        $(".invoice-out").addClass("tab-focus");
        $(".bill-pupop").hide();
        if ($(".form-menuPayment .check").hasClass("checked-img")) {
            $(".bill").show();
        }
        $('.form-menuPayment select').val("0");
        $('.purchaseForm input[fieldName="TypeInvoice"]').val(2);
    }

    showFormAddNew() {
        $(".form-menuPayment label").eq(0).click();
        $('.purchaseForm input[fieldName="TypeInvoice"]').val(1);

        $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");

        $(".navigate-invoice div").removeClass("tab-focus");
        $(".navigate-invoice div").hide();
        $(".invoice-in").show().addClass("tab-focus");

        $(".infor-common").hide();
        $(".invoicePress").show();

        $('.form-menuPayment select').val("0");
        $(".focus-first").focus();
    }

    showFormEditByInvoiceType(invoiceType, invoiceNumber) {
        if (invoiceType === 1) {
            $(".form-menuPayment label").eq(0).click();
            $('.purchaseForm input[fieldName="TypeInvoice"]').val(1);

            $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");

            $(".navigate-invoice div").removeClass("tab-focus");
            $(".navigate-invoice div").hide();
            $(".invoice-in").show().addClass("tab-focus");

            $(".infor-common").hide();
            $(".invoicePress").show();

            $('.form-menuPayment select').val("0");
        } else if (invoiceType === 2) {
            $(".form-menuPayment label").eq(1).click();

            $('.form-menuPayment .left select').prop('disabled', false).removeClass("div-disabled");
            $('.form-menuPayment select').val("0");

            $(".navigate-invoice div").hide();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(".invoice-out").show();
            $(".invoice-in").show().addClass("tab-focus");

            $(".infor-common").hide();
            $(".invoicePress").show();

            $('.purchaseForm input[fieldName="TypeInvoice"]').val(2);
        } else if (invoiceType === 3) {
            $(".form-menuPayment label").eq(1).click();

            $('.form-menuPayment .left select').prop('disabled', false).removeClass("div-disabled");
            $('.form-menuPayment select').val("1");

            $(".navigate-invoice div").hide();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(".invoice-in").show().addClass("tab-focus");
            $(".delegate").show();

            $(".infor-common").hide();
            $(".invoicePress").show();
           
            $('.purchaseForm input[fieldName="TypeInvoice"]').val(3);
        }
        $(".focus-first").focus();
        if (invoiceNumber !== "") {
            $(".bill").show();
            $(".form-menuPayment .check").attr("class", "check checked-img");
        }
    }

    // Hiển thị form theo loại hóa đơn
    // Người tạo: ntxuan (24/6/2019)
    showFormViewByInvoiceType(invoiceType, invoiceNumber) {
        if (invoiceType === 1) {
            $(".form-menuPayment label").eq(0).trigger("click");
            $('.purchaseForm input[fieldName="TypeInvoice"]').val(1);
            $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");
            $(".navigate-invoice div").removeClass("tab-focus");
            $(".navigate-invoice div").hide();
            $(".infor-common").hide();
            $(".invoice-in").show().addClass("tab-focus");
            $(".invoicePress").show();
            $('.form-menuPayment select').val("0");
        } else if (invoiceType === 2) {
            $(".form-menuPayment label").eq(1).trigger("click");
            $(".navigate-invoice div").hide();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(".invoice-out").show();
            $(".invoice-in").show().addClass("tab-focus");

            $(".infor-common").hide();
            $(".invoicePress").show();

            $('.form-menuPayment select').val("0");
            $('.purchaseForm input[fieldName="TypeInvoice"]').val(2);
            $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");
        } else if (invoiceType === 3) {
            $(".form-menuPayment label").eq(1).trigger("click");
            $('.form-menuPayment select').val("1");

            $(".navigate-invoice div").hide();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(".invoice-in").show().addClass("tab-focus");
            $(".delegate").show();

            $(".infor-common").hide();
            $(".invoicePress").show();
          
            $('.purchaseForm input[fieldName="TypeInvoice"]').val(3);
            $('.form-menuPayment .left select').prop('disabled', 'disabled').addClass("div-disabled");
        }
        if (invoiceNumber !== "") {
            $(".bill").show();
            $(".form-menuPayment .check").attr("class", "check checked-img");
        }
        $(".purchaseForm").addClass("purchaseViewForm");
        $(".purchaseForm input").prop('disabled', true);
    }

    // Thiết lập hiển thị checked cho các ô checkox
    // Người tạo: NTXUAN (29/04/2019)
    setStatusChecked() {
        // Khi click vào một hàng trong form supplier
        $(".purchaseForm").on("click", ".form-choose-supplier.supplier .row-supplier-item", function () {
            $(this).find("input").prop('checked', true);
            $(".form-choose-supplier.supplier .row-supplier-item").removeClass("row-checked");
            $(this).addClass("row-checked");
        });

        // Khi click vào một hàng trong form employee
        $(".purchaseForm").on("click", ".form-choose-supplier.employee .row-supplier-item", function () {
            $(this).find("input").prop('checked', true);
            $(".form-choose-supplier.employee .row-supplier-item").removeClass("row-checked");
            $(this).addClass("row-checked");
        });
    }

    // Kiểm tra value có hợp lệ không và gán giá trị mặc định
    // Người tạo: NTXUAN (28/04/2019)
    checkValidateValue() {
        // validate ngày tháng
        $('.DateInput').keyup(function () {
            $('span.error-keyup-2').remove();
            var inputVal = $(this).val();
            var dateReg = /^(([0-2]?\d{1})|([3][0,1]{1}))\/[0,1]?\d{1}\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/;
            if (!dateReg.test(inputVal)) {
                $(this).after('<span class="error error-keyup-2">Gõ dạng dd/MM/yyyy</span>');
            } else {
                $('span.error-keyup-2').remove();
                $(this).attr("data-previous", $(this).val());
            }
        });
        // validate ngày tháng của phiếu nhập
        $('[fieldname="ImportDate"]').blur(function () {
            $('span.error-keyup-2').remove();
            var inputVal = $(this).val();
            var dateReg = /^(([0-2]?\d{1})|([3][0,1]{1}))\/[0,1]?\d{1}\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/;
            if (!dateReg.test(inputVal)) {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
            $('.Invoice input[fieldName="ImportDate"]').val($(this).val());
        });
        // validate ngày tháng của hóa đơn
        $('[fieldname="InvoiceDate"]').blur(function () {
            $('span.error-keyup-2').remove();
            var inputVal = $(this).val();
            var dateReg = /^(([0-2]?\d{1})|([3][0,1]{1}))\/[0,1]?\d{1}\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/;
            if (!dateReg.test(inputVal)) {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
            $('.Invoice input[fieldName="InvoiceDate"]').val($(this).val());
        });

        // Validate người giao
        $('input[fieldname="Deliver"]').keyup(function () {
            if (event.which !== 32) {
                $(this).val(common.formatName($(this).val()));
            }
        });
        // Validate phiếu nhập
        $('input[fieldname="ImportNumber"]').keyup(function () {
            $('span.error-keyup-1').remove();
            var inputVal = $(this).val();
            var importNumber = /^PS[0-9]{1,10}$/;
            if (!importNumber.test(inputVal)) {
                $(this).after('<span class="error error-keyup-1">Số phiếu nhập có dạng PS000001 </span>');
            } else {
                $('span.error-keyup-1').remove();
            }
        });
        // Khi blur phiếu nhập
        $('.Invoice input[fieldName="ImportNumber"]').blur(function () {
            $('span.error-keyup-1').hide();
            var inputVal = $(this).val();
            var importNumber = /^PS[0-9]{1,10}$/;
            if (!importNumber.test(inputVal)) {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
            $('.Invoice input[fieldName="ImportNumber"]').val($(this).val());
        });
        // Validate só phiếu chi
        $('input[fieldname="ExpenditureNumber"]').keyup(function () {
            $('span.error-keyup-1').hide();
            var inputVal = $(this).val();
            var importNumber = /^PK[0-9]{1,10}$/;
            if (!importNumber.test(inputVal)) {
                $(this).after('<span class="error error-keyup-1">Số phiếu chi có dạng PK000001 </span>');
            } else {
                $('span.error-keyup-1').hide();
            }
        });
        // Khi blur phiếu chi
        $('.Invoice input[fieldName="ExpenditureNumber"]').blur(function () {
            $('span.error-keyup-1').hide();
            var inputVal = $(this).val();
            var importNumber = /^PK[0-9]{1,10}$/;
            if (!importNumber.test(inputVal)) {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
            $('.Invoice input[fieldName="ExpenditureNumber"]').val($(this).val());
        });

        //Nếu giá trị âm thì mặc định là 0
        $(".form-addNew").on("blur", ".detailData5 input, .detailData6 input", function () {
            let value = $(this).val().formatToNumber();
            if (value < 0 || $(this).val() === "" || isNaN(value)) {
                $(this).val(0).data("value", 0);
            } else {
                $(this).data("value", value);
            }
            let rowCurrent = $(this).closest(".detail-data");
            let valueChange = rowCurrent.find(".detailData6 input").data("value") * rowCurrent.find(".detailData5 input").data("value");
            rowCurrent.find(".detailData7 input").val(valueChange.formatNumber()).data("value", valueChange);
            purchaseFormDialog.validateDataRow(rowCurrent);
            // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
            purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
        });

        //Nếu thành tiền thay đổi thì các giá trị khác thay đổi theo
        $(".form-addNew").on("blur", ".detailData7 input", function () {
            let value = $(this).val().formatToNumber();
            let rowCurrent = $(this).closest(".detail-data");
            if (value < 0 || $(this).val() === "" || isNaN(value)) {
                $(this).val(0).data("value", 0);
            } else {
                $(this).data("value", value);
            }
            
            if (rowCurrent.find(".detailData6 input").data("value") !== 0) {
                let valueChanged = parseInt(parseFloat($(this).data("value") / rowCurrent.find(".detailData5 input").data("value")).toFixed(0));
                rowCurrent.find(".detailData6 input").val(valueChanged.formatNumber()).data("value", valueChanged);
                purchaseFormDialog.validateDataRow(rowCurrent);
                // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
                purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
            }
        });

        //Nếu giá trị thuế suất âm hoặc lớn hơn 100 thì mặc định là 0
        $(".form-addNew").on("blur", ".detailData10 input,.detailData8 input", function () {
            let value = $(this).val().formatToNumber();
            let rowCurrent = $(this).closest(".detail-data");
            if (value < 0 || $(this).val() === "" || value > 100 || isNaN(value)) {
                $(this).val(0).data("value", 0);
            } else {
                $(this).data("value", value);
            }
            purchaseFormDialog.validateDataRow(rowCurrent);
            // Đồng bộ hóa lại dòng tổng tiền thanh toán cuối trang
            purchase.asyncRowTotalMoney(".form-addNew .footer-content-right");
        });
    }

    // Hàm mở form  và các sự kiện cần thiết
    // Người tạo: ntxuan (15/5/2019)
    openPurchaseForm() {
        dataStorage.checkEditForm = false;
        dataStorage.checkViewForm = false;
        dataStorage.allowHotKeyForm = true;
        dataStorage.allowHotKeyGrid = false;
        $(".purchaseForm,.wrapper-background-gray").show();
        $(".form-menuPayment .right .check").attr("class", "check unchecked-img");
        $(".purchaseForm .Invoice input").val("");
        $(".purchaseForm .Invoice input").eq(3).focus().select();
        var now = new Date();
        $('.timepicker').val(now.getDateFormat());
        $('.purchaseForm input[fieldname="ReasonExpenditure"]').val("Thanh toán tiền nhập hàng hóa");
        purchaseFormDialog.setValueDefault();
        purchase.removeResizeAble();
        purchaseFormDialog.loadSuppliersFromServer();
        purchaseFormDialog.loadEmployeesFromServer();
        $(".form-addNew .list-data-bottom .other-row").remove();
        $(".btn-prev-view").removeClass("enable-button");
        $(".btn-next-view").removeClass("enable-button");
    }

    // Hàm đổ dữ liệu tự động ban đầu cho form
    // Người tạo: ntxuan (24/6/2019)
    initValueToForm() {
        common.callAjaxToServer("Get", "/purchase/GetNumbersAuto", null, function (result) {
            if (result.Success) {
                let invoiceNumber = result.Data[0];
                let expenditureNumber = result.Data[1];
                $('.purchaseForm input[fieldname="ImportNumber"]').val(invoiceNumber).attr("data-previous", invoiceNumber);
                $('.purchaseForm input[fieldname="ExpenditureNumber"]').val(expenditureNumber).attr("data-previous", expenditureNumber);
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Đổ dữ liệu vào form xem hóa đơn
    // Người tạo: ntxuan (20/5/2019)
    loadDataToPurchaseForm(checkDuplicate, checkView) {
        let invoiceId = $(".content-right .wrapp-dataTable .row-clicked").data("InvoiceID");
        let url = "/purchase/Invoice/" + invoiceId;
        // Thực hiện load các sản phẩm từ server theo id của hóa đơn truyền vào
        common.callAjaxToServer("Post", url, null, function (result) {
            if (result.Success) {
                $(".purchaseForm .Invoice input[fieldname]").each(function () {
                    let fieldName = $(this).attr("fieldName");
                    let fieldData = $(this).attr("fieldData");
                    // Nếu ở dạng ngày tháng thì format lại dạng dd/MM/yyyy
                    if (fieldData === "Date") {
                        let value = new Date(result.Data[fieldName]).toLocaleDateString('en-GB');
                        $(this).val(value);
                    } else {
                        $(this).val(result.Data[fieldName]);
                    }
                });
                if (checkDuplicate) {
                    purchaseFormDialog.initValueToForm();
                    purchaseFormDialog.setValueDefault();
                }
                if (checkView) {
                    purchaseFormDialog.showFormViewByInvoiceType(result.Data["TypeInvoice"], result.Data["InvoiceNumber"]);
                  
                } else {
                    purchaseFormDialog.showFormEditByInvoiceType(result.Data["TypeInvoice"], result.Data["InvoiceNumber"]);
                }
            } else {
                purchase.showDialogError(result.Messenger);
            }
        });
    }

    // Hàm mở form xem phiếu nhập hàng
    // Người tạo: ntxuan (19/5/2019)
    openPurchaseViewForm() {
        purchaseFormDialog.openPurchaseForm();
        $(".purchaseFormTitle").text("Xem Phiếu nhập hàng");
        purchaseFormDialog.loadDataToPurchaseForm(false,true);
        dataStorage.checkViewForm = true;
        dataStorage.checkEditForm = true;
        purchase.loadProductToPurchaseForm();
        purchaseFormDialog.checkButtonNextAndPrev();
    }

    // Kiểm tra trạng thái button trước sau form xem
    // Người tạo : ntxuan (10/6/2019)
    checkButtonNextAndPrev() {
        if ($(".content-right .list-data-table .row-data:first").hasClass("row-clicked")) {
            $(".purchaseViewForm .btn-prev-view").removeClass("enable-button");
            $(".purchaseViewForm .btn-next-view").addClass("enable-button");
        } else if ($(".content-right .list-data-table .row-data:last").hasClass("row-clicked")) {
            $(".purchaseViewForm .btn-prev-view").addClass("enable-button");
            $(".purchaseViewForm .btn-next-view").removeClass("enable-button");
        } else {
            $(".purchaseViewForm .btn-prev-view").addClass("enable-button");
            $(".purchaseViewForm .btn-next-view").addClass("enable-button");
        }
    }

    // Hàm mở form thêm mới phiếu nhập hàng
    // Người tạo: ntxuan (19/5/2019)
    openPurchaseAddNewForm() {
        purchaseFormDialog.openPurchaseForm();
        $(".purchaseForm").addClass("purchaseAddNewForm");
        $(".purchaseFormTitle").text("Thêm mới Phiếu nhập hàng");
        $(".purchaseForm input").prop('disabled', false);
        purchaseFormDialog.showFormAddNew();
        purchaseFormDialog.initValueToForm();
    }

    // Hàm mở form nhân bản phiếu nhập hàng
    // Người tạo: ntxuan (19/5/2019)
    openPurchaseDuplicateForm() {
        purchaseFormDialog.openPurchaseForm();
        $(".purchaseForm").addClass("purchaseDuplicateForm");
        $(".purchaseFormTitle").text("Nhân bản Phiếu nhập hàng");
        $(".purchaseForm input").prop('disabled', false);
        purchaseFormDialog.loadDataToPurchaseForm(true, false);
        purchase.loadProductToPurchaseForm();
    }

    // Hàm mở form sửa phiếu nhập hàng
    // Người tạo: ntxuan (19/5/2019)
    openPurchaseEditForm() {
        purchaseFormDialog.openPurchaseForm();
        $(".purchaseForm").addClass("purchaseEditForm");
        $(".purchaseFormTitle").text("Sửa Phiếu nhập hàng");
        $(".purchaseForm input").prop('disabled', false);
        purchaseFormDialog.loadDataToPurchaseForm(false, false);
        dataStorage.checkEditForm = true;
        purchase.loadProductToPurchaseForm();
    }

    // Hàm đóng form thêm mới và các sự kiện cần thiết
    // Người tạo: ntxuan (15/5/2019)
    closePurchaseForm() {
        dataStorage.allowHotKeyForm = false;
        dataStorage.allowHotKeyGrid = true;
        purchase.setResizeAble();
        $(".purchaseForm,.wrapper-background-gray").hide();
        $(".purchaseForm").removeClass("exspand-div");
        $(".purchaseForm .Invoice input").val("");
        $(".reason").val("Thanh toán tiền nhập hàng hóa");
        $(".purchaseForm #exspect").hide();
        $(".table-sku").attr("class", "table-sku option-showUp");
        dataStorage.coslap = true;
        $(".purchaseForm #colspan").show();
        $(".purchaseForm .form-menuPayment").show();
        $(".purchaseForm .navigate-invoice").show();
        $(".purchaseForm .Invoice").show();
        $(".purchaseForm .footer-content-right").height($(".purchaseForm").height() - 442);
    }

    // Thiết lập hiển thị , ẩn form dialog
    // Người tạo: NTXUAN (29/04/2019)
    setShowHideDialog() {
        // Khi click vào mã SKU trong form thì hiện các hiệu ứng
        $("body").on("focus", ".purchaseForm .detail-data-Item.detailData1 input", function () {
            $(".purchaseForm .detail-data-Item.detailData1 input").parent().css("border", "none").css("background", "none");
            $(".purchaseForm .detail-data-Item.detailData1 input").siblings().css("opacity", "0");
            $(this).parent().css("border", "1px solid #45b3e6").css("background", "white");
            $(this).siblings().css("opacity", "1");
            $(this).closest(".detail-data").addClass("row-current");
            $(".table-sku").show();
            $(".table-sku .table-sku_body_row").show();
            $(".table-sku .table-sku_body_row:visible").eq(0).addClass("row-hover");
            $(".table-sku .table-sku_body").scrollTop(0);
        });

        $("body").on("blur", ".purchaseForm .detail-data-Item.detailData1 input", function () {
            $(".purchaseForm .detail-data-Item.detailData1 input").parent().css("border", "none").css("background", "none");
            $(".purchaseForm .detail-data-Item.detailData1 input").siblings().css("opacity", "0");
            $(".row-current").removeClass("row-current");
            $(".table-sku").hide();
        });

        // Khi bấm vào dấu x trên form thêm mới thì sẽ ẩn form
        $(".purchaseForm .form-addNew_header-top .close.close1").click(function () {
            if (dataStorage.checkViewForm) {
                purchaseFormDialog.closePurchaseForm();
            } else {
                dialogError.setMessageError("Dữ liệu chưa được lưu, bạn có muốn lưu không?");
                $(".dialog-btnError").hide();
                $(".dialog-error .icon-errors").attr("class", "icon-errors icon-dialog-question");
                $(".dialog-Save").show();
                $(".dialog-UnSave").show();
                $(".dialog-cancel").show();
                dialogError.openDialog();
            }
        });

        // Khi bấm dấu x trên form thêm nhà cung cấp thì sẽ ẩn form đó đi
        $(".purchaseForm .form-choose-supplier .close2").click(function () {
            $(".purchaseForm .form-choose-supplier,.wrapper-background-gray2").hide();
        });

        // Khi bấm icon mở rộng form thì chiều rộng và cao form được mở full màn hình
        $(".purchaseForm .exspand").click(function () {
            $(".purchaseForm").toggleClass("exspand-div");
            if (!dataStorage.coslap) {
                $(".purchaseForm .footer-content-right").height($(".purchaseForm").height() - 92);
            } else {
                $(".purchaseForm .footer-content-right").height($(".purchaseForm").height() - 442);
            }
        });

        // Khi click vào biểu tượng đồng hồ trong form thì danh sách thời gian hiển thị
        $(".purchaseForm .icon-clock").click(function () {
            event.stopPropagation();
            $(".purchaseForm .DateOutput").focus();
        });

        $(".purchaseForm .DateOutput").blur(function () {
            $(".purchaseForm .list-time").hide();
        });

        // Khi chọn nhận kèm hóa đơn thì hiện Hóa đơn
        $(".form-menuPayment .right .check").click(function () {
            $(".bill").toggle();
            if ($(".bill").hasClass("tab-focus")) {
                $(".infor-common").hide();
                $(".invoicePress").show();
                $(".navigate-invoice div").removeClass("tab-focus");
                $(".invoice-in").addClass("tab-focus");
            }
            if ($(this).hasClass("checked-img")) {
                $('input[fieldname="InvoiceNumber"]').val("");
            }
        });

        // Khi chọn phiếu nhập sẽ hiển thị các thành phần cần thiết
        $(".invoice-in").click(function () {
            $(".infor-common").hide();
            $(".invoicePress").show();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(this).addClass("tab-focus");
        });

        // Khi chọn phiếu chi sẽ hiển thị các thành phần cần thiết
        $(".invoice-out").click(function () {
            $(".infor-common").hide();
            $(".vouchers").show();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(this).addClass("tab-focus");
        });

        // Khi chọn hóa đơn sẽ hiển thị các thành phần cần thiết
        $(".bill").click(function () {
            $(".infor-common").hide();
            $(".bill-pupop").show();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(this).addClass("tab-focus");
        });

        // Khi chọn ủy nhiệm chi sẽ hiển thị các thành phần cần thiết
        $(".delegate").click(function () {
            $(".infor-common").hide();
            $(".delegate-pupop").show();
            $(".navigate-invoice div").removeClass("tab-focus");
            $(this).addClass("tab-focus");
        });

        //Khi click vào kính lúp trong phần thêm nhà cung cấp
        $(".purchaseForm .quick-supplier").click(function () {

            $(".form-choose-supplier.supplier,.wrapper-background-gray2").show();
        });
        //Khi click vào kính lúp trong phần thêm nhân viên
        $(".purchaseForm .invoicePress .icon-search").eq(1).click(function () {
            $(".form-choose-supplier.employee,.wrapper-background-gray2").show();
        });
        // Khi click vào icon mũi tên xổ xuống để chọn nhà cung cấp trong phiếu nhập
        $(".purchaseForm .quick-supplier").prev().click(function () {
            $(".supplier-table.table1").toggle();
            $(this).prev().focus();
        });
        $(".purchaseForm input").blur(function () {
            $(".supplier-table").hide();
        });

        // Khi click vào icon mũi tên xổ xuống để chọn nhân viên mua hàng trong phiếu nhập
        $(".invoicePress .multiItem .iconDown").eq(1).click(function () {
            $(".supplier-table.table2").toggle();
            $(this).prev().focus();
        });

        // Hiển thị bảng danh sách các nhà cung cấp và bắt sự kiện chuột nhấn xuống
        $("body").on("mousedown", ".supplier-table.table1 .supplier-table_body-row", function () {
            let supplierCode = $(this).find(".supplier-table_body-row-left").text().trim();
            let nameSupplier = $(this).find(".supplier-table_body-row-right").text().trim();
            $('.purchaseForm input[fieldName="SupplierID"]').val($(this).data("SupplierID"));
            purchaseFormDialog.asyncSupplierInfor(supplierCode, nameSupplier);
        });

        // Hiển thị bảng danh sách các nhân viên mua hàng và bắt sự kiện chuột nhấn xuống
        $("body").on("mousedown", ".supplier-table.table2 .supplier-table_body-row", function () {
            let employeeCode = $(this).find(".supplier-table_body-row-left").text().trim();
            let employeeName = $(this).find(".supplier-table_body-row-right").text().trim();
            $('.purchaseForm input[fieldName="EmployeeID"]').val($(this).data("EmployeeID"));
            $(".invoicePress .multiItem.flex input").eq(1).val(employeeCode);
            $(".invoicePress .name-company").eq(1).val(employeeName);
        });

        // Khi bấm đồng ý form supplier của bên phiếu nhập
        $(".purchaseForm").on("click", ".form-choose-supplier.supplier .div-ok", function () {
            let supplierCode = $(".form-choose-supplier.supplier .row-checked .supplier-code").text().trim();
            let nameSupplier = $(".form-choose-supplier.supplier .row-checked .name-supplier").text().trim();
            $('.purchaseForm input[fieldName="SupplierID"]').val($(".form-choose-supplier.supplier .row-checked").data("SupplierID"));
            purchaseFormDialog.asyncSupplierInfor(supplierCode, nameSupplier);
            $(".form-choose-supplier,.wrapper-background-gray2").hide();
        });

        // Khi bấm đồng ý form employee của bên phiếu nhập
        $(".form-choose-supplier.employee .div-ok").click(function () {
            let employeeCode = $(".form-choose-supplier.employee .row-checked .supplier-code").text().trim();
            let employeeName = $(".form-choose-supplier.employee .row-checked .name-supplier").text().trim();
            $('.purchaseForm input[fieldName="EmployeeID"]').val($(".form-choose-supplier.employee .row-checked").data("EmployeeID"));
            $(".invoicePress .multiItem.flex input").eq(1).val(employeeCode);
            $(".invoicePress .name-company").eq(1).val(employeeName);
            $(".form-choose-supplier,.wrapper-background-gray2").hide();
        });

        // Khi bấm hủy bỏ form supplier
        $(".form-choose-supplier .div-cancel").click(function () {
            $(".form-choose-supplier,.wrapper-background-gray2").hide();
        });

        // Khi click vào danh sách thời gian thì lấy dữ liệu
        $(".purchaseForm .list-time_item").mousedown(function () {
            $(".DateOutput").val($(this).text().trim()).attr("data-previous", $(this).text().trim());
            $(".list-time").hide();
        });

        // Khi bấm ra ngoài thì ẩn
        $("body").on("click", function () {
            $(".table-sku").hide();
        });

        // Khi bấm vào mũi tên
        $("body").on("click", ".footer-content-right .list-data-bottom .iconDown", function (event) {
            event.stopPropagation();
            $(this).prev().focus();
            $(".table-sku").show();
            $(".table-sku .table-sku_body_row").show();
            $(".table-sku .table-sku_body_row:visible").eq(0).addClass("row-hover");
            $(".table-sku .table-sku_body").scrollTop(0);
            $(this).closest(".detail-data").addClass("row-current");
        });
    }

    // Khi kéo file vào thì hiện url
    // Người tạo: NTXUAN (29/04/2019)
    setDragFileImport() {
        dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
            evt.preventDefault();
        };

        dropContainer.ondrop = function (evt) {
            fileInputUpload.files = evt.dataTransfer.files;
            $(".file-upload-name").val($("#fileInputUpload").val()).css("opacity", 1);
            evt.preventDefault();
        };
    }

    //Đồng bộ thông tin nhà cung cấp
    // Người tạo: NTXUAN (29/04/2019)
    asyncSupplierInfor(supplierCode, nameSupplier) {
        $(".purchaseForm .quick-supplier").prev().prev().val(supplierCode);
        $(".purchaseForm .quick-supplier").parent().next().val(nameSupplier);
        $(".delegate-pupop .name-company").eq(0).val(nameSupplier);
    }

    //Thêm sự kiện datepicker cho ô input ngày tháng trong form
    // Người tạo: NTXUAN (29/04/2019)
    addDatePickerForInput() {
        $(".Invoice .icon-calander").click(function () {
            $(this).prev().datepicker("show");
        });
    }

    // Validate và tính toán lại dữ liệu trên một hàng
    // Người tạo: ntxuan(10/5/2019)
    validateDataRow(rowfocus) {
        // Thành tiền
        let sumMoney = rowfocus.find(".detailData7 input");
        // %CK
        let percentCK = rowfocus.find(".detailData8 input");
        // tiền ck
        let amountCK = rowfocus.find(".detailData9 span");
        // Thuế suất
        let tax = rowfocus.find(".detailData10 input");
        // Tiền thuế
        let taxAmount = rowfocus.find(".detailData11 span");
        // Tiền thanh toán
        let payAmount = rowfocus.find(".detailData12 span");
        // Tiền CK = %CK x Thành tiền
        let amountValue = percentCK.data("value") * 0.01 * sumMoney.data("value");
        amountCK.text(amountValue.toLocaleString("de-DE")).data("value", amountValue);
        //Tiền thuế = (Thành tiền - Tiền CK)x THuế suất
        let taxAmountValue = (sumMoney.data("value") - amountCK.data("value")) * tax.data("value");
        taxAmount.text(taxAmountValue.toLocaleString("de-DE")).data("value", taxAmountValue);
        // Tiền Thanh toán = Thành tiền - Tiền CK + Tiền Thuế
        let payAmountValue = sumMoney.data("value") - amountCK.data("value") + taxAmount.data("value");
        payAmount.text(payAmountValue.toLocaleString("de-DE")).data("value", payAmountValue);
    }

    // Hàm dùng để kiểm tra đầu vào hợp lệ của các ô input
    // Người tạo: ntxuan (19/5/2019)
    validateInput(element, leng) {
        $(element).keyup(function () {
            if ($(this).val().length > leng) {
                $(this).css("border-color", "red").attr("title", "Trường này không được quá " + leng + " kí tự");
            } else {
                $(this).css("border-color", "c5c3c3").attr("title", "");
            }
        });
        $(element).blur(function () {
            if ($(this).val().length > leng) {
                $(this).val("");
            }
        });
    }

    // Hàm dùng để kiểm tra đầu vào hợp lệ của các ô input
    // Người tạo: ntxuan (19/5/2019)
    validateAllInputText() {
        this.validateInput('input[fieldname="SupplierCode"]', 50);
        this.validateInput('input[fieldname="SupplierName"]', 100);
        this.validateInput('input[fieldname="EmployeeCode"]', 50);
        this.validateInput('input[fieldname="EmployeeName"]', 100);
        this.validateInput('input[fieldname="Deliver"]', 100);
        this.validateInput('input[fieldname="Explanation"]', 255);
        this.validateInput('input[fieldname="ImportNumber"]', 50);
        this.validateInput('input[fieldname="ImportDate"]', 50);
        this.validateInput('input[fieldname="ImportTime"]', 50);
        this.validateInput('input[fieldname="Receiver"]', 100);
        this.validateInput('input[fieldname="Address"]', 255);
        this.validateInput('input[fieldname="ReasonExpenditure"]', 255);
        this.validateInput('input[fieldname="ExpenditureNumber"]', 50);
        this.validateInput('input[fieldname="InvoiceNumber"]', 50);
        this.validateInput('input[fieldname="TaxCode"]', 50);
        this.validateInput('input[fieldname="InvoiceDate"]', 50);
    }
}

// Khởi tạo một đối tượng purchaseFormDialog
// Người tạo: NTXUAN (28/04/2019)
var purchaseFormDialog = new PurchaseFormDialog();