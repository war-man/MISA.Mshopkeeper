//Hàm Fund
//Tạo bởi: NBDUONG (2/5/2019)
class Fund {
    //Phương thức khởi tạo
    //Tạo bởi: NBDUONG(2/5/2019)
    constructor() {
        thisFund = this;
        this.totalPages = 1;
        this.init();
        //Các nút trong form Chọn hóa đơn trả nợ
        var buttons =
            [
                {
                    html: '<div class="receiptFormDetail-btnHelp-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnHelp-text receiptFormDetail-text">Trợ giúp</span>',
                    class: "receiptFormDetail-btnHelp",
                    click: function () { window.open("http://help.mshopkeeper.vn/170103_thu_tien_mat.htm", '_blank'); }
                },
                {
                    html: '<div class="receiptFormDetail-btnPayDebt-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Trả nợ</span>',
                    class: "receiptFormDetail-btnPayDebt",
                    click: function () {
                        fund.asyncDataFromChooseReceiptForm();
                        fund.popup.closeDialog();
                        $('.receiptFormDetail-btnPayDebt').css('background-color', '#026b97');
                    }
                },
                {
                    html: '<div class="receiptFormDetail-btnCancel-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnCancel-text receiptFormDetail-text">Hủy bỏ</span>',
                    class: "receiptFormDetail-btnCancel",
                    click: function () { fund.popup.closeDialog(); }
                }
            ];

        //Các nút trong form Chọn đối tượng
        var buttonChooseObjectForm =
            [
                {
                    html: '<div class="receiptFormDetail-btnHelp-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnHelp-text receiptFormDetail-text">Trợ giúp</span>',
                    class: "receiptFormDetail-btnHelp",
                    click: function () { window.open("http://help.mshopkeeper.vn/170103_thu_tien_mat.htm", '_blank');}
                },
                {
                    html: '<div class="receiptFormDetail-btnPayDebt-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Chọn</span>',
                    class: "receiptFormDetail-btnPayDebt",
                    click: function () {
                        let staffCode = $('.reciptFormDetail_tableData .table-row.choose-background').children().eq(1).find('span').text();
                        let staffName = $('.reciptFormDetail_tableData .table-row.choose-background').children().eq(2).find('span').text();
                        $(".input-staffCode").val(staffCode);
                        $(".input-staffName").val(staffName);
                        $('#formChooseObject').dialog('close');
                        $('#formChooseStaff').dialog('close');
                    }
                },
                {
                    html: '<div class="receiptFormDetail-btnCancel-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnCancel-text receiptFormDetail-text">Hủy bỏ</span>',
                    class: "receiptFormDetail-btnCancel",
                    click: function () {
                        fund.chooseObjectPay.closeDialog();
                        fund.chooseStaff.closeDialog();
                    }
                }
            ];

        //Các nút trong form message
        var buttonMessage =
            [
                {
                    html: '<div class="receiptFormDetail-btnSave-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Lưu</span>',
                    class: "alertDialog_btnSave alertDialog_btn",
                    click: function () {
                        fund.saveNewDocument();
                        fund.allowHotKey = true;
                        fund.allowHotKeyInForm = false;
                        fund.messageDialog.closeDialog();
                    }
                },
                {
                    html: '<div class="receiptFormDetail-btnDelete-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Xóa</span>',
                    class: "alertDialog_btnDelete alertDialog_btn",
                    click: function () {
                        fund.deleteDocument();
                        fund.messageDialog.closeDialog();
                        fund.allowHotKey = true;
                        fund.allowHotKeyInForm = false;
                    }
                },
                {
                    html: '<div class="receiptFormDetail-btnNotSave-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Không lưu</span>',
                    class: "alertDialog_btnNotSave alertDialog_btn",
                    click: function () {
                        fund.messageDialog.closeDialog();
                        fund.check.closeDialog();
                        fund.allowHotKey = true;
                        fund.allowHotKeyInForm = false;
                    }
                },
                {
                    html: '<div class="receiptFormDetail-btnCancel-icon receiptFormDetail-icon left-float"></div><span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Hủy bỏ</span>',
                    class: "alertDialog_btnCancel alertDialog_btn",
                    click: function () { fund.messageDialog.closeDialog(); }
                },
                {
                    html: '<span class="receiptFormDetail-btnPayDebt-text receiptFormDetail-text">Đồng ý</span>',
                    class: "alertDialog_btnAccept alertDialog_btn",
                    click: function () { fund.messageDialog.closeDialog(); }
                }
            ];

        this.supplierCodes = [];
        this.employeeCodes = [];
        this.employeeNames = [];
        this.supplierNames = [];
        this.checkViewForm = false;
        this.checkEditForm = false;
        this.checkCollect = false;
        this.checkPay = false;
        this.allowHotKey = true;
        this.allowHotKeyInForm = false;
        this.allowDuplicate = false;
     
        //Tạo mới dialog
        this.check = new Dialog('#formDetail', 960, 750, this);
        this.popup = new Dialog('#recipeFormDetail', 800, 600, this, buttons);
        this.messageDialog = new Dialog('#alertDialog', 400, 170, this, buttonMessage);
        this.chooseObjectPay = new Dialog('#formChooseObject', 800, 500, this, buttonChooseObjectForm);
        this.chooseStaff = new Dialog('#formChooseStaff', 800, 500, this, buttonChooseObjectForm);
    }

    //Hàm khởi tạo sự kiện
    //Tạo bởwi: NBDUONG (3/5/2019)
    init() {
        this.getTotalPages();
        this.getDataFundFromServer();
        this.resizeColumn();
        this.getCurrentDate();
        this.autoAdjustHeight();
        this.setDefaultScroll();
        this.validateData();
        this.getPaidMoney();
        this.clickRow();
        this.changeDateRangeWithOption();
        this.selectStaff();
        this.asyncDataFromChooseReceiptForm();
        this.loadEmployeeListFromServer();
        this.loadSuppliersListFromServer();
        this.loadDocumentTypeFromServer();
        this.setHotKey();
        this.setInputEvent();
        this.setTabOrder();
        this.closeFormMessage();
        this.checkSupplierCodeValidateInput();
        this.ifIsNaN();
        this.setDefaultButton();
        this.validateInputData();
        this.clickSave();
        this.asyncData();
        this.formatCurrency();
        this.setEventsFormToolbar();
        this.setEventsRadioInput();
        this.filterDataByAction();
        this.filterDataByDate();
        this.openViewForm();
        this.selectOption();
        this.setAllEventPaging();
        this.getTotalRows();
        this.setEventContextMenu();
        this.filterDocumentNotPaidDataByDate();
    }

    //Hàm bắt sự kiện cho các nút
    //Tạo bởi: NBDUONG(10/5/2019)
    setDefaultButton() {
        $('#btnCollectMoney, .right-click-popup .btn-add').click(this.addCollectMoney);
        $('#btnPayMoney').click(this.addPayMoney);
        $('#btnView, .right-click-popup .btn-view').click(this.viewDocument);
        $('#btnEdit, .right-click-popup .btn-edit').click(this.editDocument);
        $('#btnDuplicate, .right-click-popup .btn-dublicate').click(this.duplicateDocument);
        $('#btnDelete, .right-click-popup .btn-delete').click(this.deleteDocumentDialog);
        $('#btnRefresh, .right-click-popup .btn-reload').click(this.refreshDocument);
        $('.choose-pay-recipt').click(this.choosePayDebtRecipt);
        $('#choose-object').click(this.chooseObjectPay);
        $('.choose-object-paydebt').click(this.chooseStaffPaydebt);
    }

    //Hàm xử lý scroll trong các bảng dữ liệu
    //Tạo bởi: NBDUONG(23/6/2019)
    setDefaultScroll() {
        // Thêm hàm cho jquery để check có scroll không
        $.fn.hasScrollBar = function () {
            return this.get(0).scrollHeight > this.get(0).clientHeight;
        };
    }

    // Hàm tự động ren thêm width cho bảng nếu thiếu
    // Tạo bởi: NBDUONG (23/6/2019)
    autoRenderWidthHasScroll() {
        if ($('.table-data_list-data').hasScrollBar()) {
            $(".middle-content_header-table.flex").width($(".middle-table_pagination-option").width() - 16);
            $(".middle-table_total-money-row.flex").width($(".middle-table_pagination-option").width() - 16);
        } else {
            $(".middle-content_header-table.flex").width($(".middle-table_pagination-option").width());
            $(".middle-table_total-money-row.flex").width($(".middle-table_pagination-option").width());
        }
    }

    //Hàm bắt sự kiện cho các nút trong form
    //Tạo bởi: NBDUONG(8/6/2019)
    setEventsFormToolbar() {
        //Bắt sự kiện cho nút Thêm mới
        $('#formDetail #add-formDetail').click(function () {
            let documentCode = $('.middle-content_table-data .table-row.choose-background').data("DocumentCode");
            let subCode = documentCode.substr(0, 2);
            if (subCode === "PC") {
                fund.removeViewClass();
                fund.addPayMoney();
            } else if (subCode === "PT") {
                fund.removeViewClass();
                fund.addCollectMoney();
            }
        });
        //Bắt sự kiện cho nút Sửa
        $('#formDetail #edit-formDetail').click(function () {
            fund.removeViewClass();
            fund.editDocument();
        });
        //Bắt sự kiện cho nút Hoãn
        $('#formDetail #postpone-formDetail').click(function () {
            fund.removeViewClass();
            fund.viewDocument();
        });
        //Bắt sự kiện cho nút Xóa
        $('#formDetail #delete-formDetail').click(function () {
            fund.deleteDocumentDialog();
            fund.check.closeDialog();
        });
        //Bắt sự kiện cho nút Trợ giúp
        $('#btnHelpFormDialog').click(function () {
            window.open("http://help.mshopkeeper.vn/170103_thu_tien_mat.htm", '_blank');
        });
        //Bắt sự kiện cho nút Trước
        $('#before-formDetail').click(function () {
            let rowFocus = $('.middle-content_table-data .table-row.choose-background');
            fund.loadDocumentByHotKey(rowFocus, "previous");
            fund.loadDataToForm();
            if ($('.middle-content_table-data .table-row.choose-background').is($('.middle-content_table-data .table-row:first-child'))) {
                $('.view-document #before-formDetail').removeClass('document-before');
            } else {
                $('.view-document #before-formDetail').addClass('document-before');
                $('.view-document #after-formDetail').addClass('document-after');
            }
        });
        //Bắt sự kiện cho nút Sau
        $('#after-formDetail').click(function () {
            let rowFocus = $('.middle-content_table-data .table-row.choose-background');
            fund.loadDocumentByHotKey(rowFocus, "next");
            fund.loadDataToForm();
            if ($('.middle-content_table-data .table-row.choose-background').is($('.middle-content_table-data .table-row:last-child'))) {
                $('.view-document #after-formDetail').removeClass('document-after');
            } else {
                $('.view-document #before-formDetail').addClass('document-before');
                $('.view-document #after-formDetail').addClass('document-after');
            }
        });

        //Bắt sự kiện cho nút Thêm dữ liệu
        $('.middle-content_nav-list-button .button_get-data').click(function () {
            $('.table-data_list-data').html("");
            let fromDate = $(".middle-content_nav-list-button .select-from-date");
            let toDate = $(".middle-content_nav-list-button .select-to-date");
            $(".middle-content_header-table .input-pickdate").val("");
            if (fromDate.val() !== "" && toDate.val() !== "") {
                let fromDateString = common.convertStringJSToStringCsharp(fromDate);
                let toDateString = common.convertStringJSToStringCsharp(toDate);
                let documentDto = {
                    FromDate: fromDateString,
                    ToDate: toDateString
                };
                // Thực hiện load các hóa đơn có ngày tháng được chọn
                common.callAjaxToServer("Post", "/fund/documents/getByDate", documentDto, function (result) {
                    fund.loadDocuments(result.Data);
                    fund.setDisableButtonPagingOnFilter(result.length);
                });
            }
        });
    }

    //Context Menu
    //Tạo bởi: NBDUONG(24/6/2019)
    setEventContextMenu() {
        let $contextMenu = $(".right-click-popup");
        $("body").on("contextmenu", ".table-data_list-data .table-row", function (e) {
            e.preventDefault();
            $(".table-data_list-data .table-row.choose-background").removeClass("choose-background");
            $(this).addClass('choose-background');
            $(".choose-row").find('img').attr('src', '');
            $('.choose-row').removeClass('non-background');
            $(".choose-all").find('img').attr('src', '');
            $('.choose-all').removeClass('non-background');
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            });
            //Lấy ra id của chứng từ khi click vào dòng chứng từ đó
            var id = $(this).data("DocumentID");
            //Hiển thị loading
            $('.footer-content_detail-table-data .loading').show();
            fund.loadDocumentDataDefault(id);
            fund.disableButton();
            return false;
        });
        $('html').click(function () {
            $contextMenu.hide();
        });
    }
    

    //Hàm loại bỏ các class trước đó khi thực hiện thay đổi qua lại giữa các form
    //Tạo bởi: NBDUONG(8/6/2019)
    removeViewClass() {
        $('#formDetail').removeAttr('class');
    }

    //Hàm đồng bộ dữ liệu trong form
    //Tạo bởi: NBDUONG(2/6/2019)
    asyncData() {
        $('input[fieldName="DocumentDate2"]').val($('input[fieldName="DocumentDate"]').val());
        $('input[fieldName="DocumentDate"]').change(function () {
            $('input[fieldName="DocumentDate2"]').val($(this).val());
            $('input[fieldName="DocumentDate"]').val($(this).val());
        });

        $('input[fieldName="DocumentCode"]').change(function () {
            $('input[fieldName="DocumentCode"]').val($(this).val());
        });

        $('input[fieldName="TotalMoney"]').change(function () {
            $('input[fieldName="TotalMoney"]').val($(this).val());
        });

        $('input[fieldName="DocumentTypeName"]').change(function () {
            $('input[fieldName="DocumentTypeName"]').val($(this).val());
        });

        $('input[fieldName="Reason"]').change(function () {
            $('input[fieldName="Reason"]').val($(this).val());
        });

        $('input[fieldName="DocumentAddress"]').change(function () {
            $('input[fieldName="DocumentAddress"]').val($(this).val());
        });

        $('input[fieldName="PersonCode"]').change(function () {
            $('input[fieldName="PersonCode"]').val($(this).val());
        });

        $('input[fieldName="PersonName"]').change(function () {
            $('input[fieldName="PersonName"]').val($(this).val());
        });
         
        $('input[fieldName="EmployeeCode"]').change(function () {
            $('input[fieldName="EmployeeCode"]').val($(this).val());
        });

        $('input[fieldName="ReceiverName"]').change(function () {
            $('input[fieldName="ReceiverName"]').val($(this).val());
        });
    }

    //Hàm hiển thị khoảng thời gian theo lựa chọn tương ứng trong comboBox
    //Tạo bởi: NBDUONG(16/5/2019)
    changeDateRangeWithOption() {
        common.changeDateTimeByCase("5", $('.select-from-date'), $('.select-to-date'));
        $('.select-month select').change(function () {
            let value = $(this).val();
            common.changeDateTimeByCase(value, $('.select-from-date'), $('.select-to-date'));
        });
    }

    //Disable nút khi không có bản ghi
    //Tạo bởi: NBDUONG(20/5/2019)
    disableButton() {
        if ($('.middle-content_table-data .table-data_list-data .table-row.choose-background').length > 0) {
            $('.middle-content_header-list-button .btnCanBeDisabled').removeClass('disable');
            if ($('.middle-content_table-data .table-row.choose-background').data("CheckType") === 2) {
                fund.allowDuplicate = false;
                $('.middle-content_header-list-button #btnDuplicate').addClass('disable');
                $('.right-click-popup .btn-dublicate').addClass('disable');
            } else {
                fund.allowDuplicate = true;
                $('.middle-content_header-list-button #btnDuplicate').removeClass('disable');
                $('.right-click-popup .btn-dublicate').removeClass('disable');
            } 
        }
        else {
            $('.middle-content_header-list-button .btnCanBeDisabled').addClass('disable');
        }
    }
   
    //Hàm lấy dữ liệu từ trên server
    //Tạo bởi: NBDUONG (15/5/2019)
    getDataFundFromServer() {
        $('.MISABody-part_middle-content .loading').show();
        $('.middle-content_table-data .table-data_list-data').html("");
        $('.detailTotalMoney span').text("0");
        $('.total-money-row_fifth-column span').text("0");
        $('.MISABody-part_middle-content .footer-content_detail-table-data .detail-table-data_list-data').html("");

        let url = thisFund.getUrlDetailPagination();
        thisFund.getTotalPages();
        common.callAjaxToServer("GET", url, null, function (response) {
            fund.loadDocuments(response.Data);
            fund.getTotalRows();
            fund.loadDocumentDataDefault(response.Data[0].DocumentID);
        });
    }

    loadDocuments(response) {
        var totalMoney = 0;
        //Ẩn loading
        $('.MISABody-part_middle-content .loading').hide();
        //Truyền dữ liệu vào mỗi cột
        $.each(response, function (index, item) {
            $('.middle-content_table-data .row-clone span').each(function () {
                var fieldData = $(this).parent().attr("fieldName");
                var dataType = $(this).parent().attr("dataType");
                if (dataType === "date") {
                    item[fieldData] = new Date(item[fieldData]).toLocaleDateString('en-GB');
                    $(this).text(item[fieldData]);
                } else if (dataType === "number") {
                    $(this).text(item[fieldData].formatNumber());
                    $(this).data('value', item[fieldData]);
                    totalMoney += $(this).data('value');
                    $('.total-money-row_fifth-column span').text(totalMoney.formatNumber());
                } else {
                    $(this).text(item[fieldData]);
                }
            });

            //Append dữ liệu vào bảng dữ liệu
            $('.middle-content_table-data .table-data_list-data').append($('.row-clone').html());
            //Gán Id cho dòng được click
            $('.middle-content_table-data .table-row:last-child').data("DocumentID", item["DocumentID"]);
            $('.middle-content_table-data .table-row:last-child').data("DocumentCode", item["DocumentCode"]);
            $('.middle-content_table-data .table-row:last-child').data("DocumentType", item["DocumentTypeName"]);
            $('.middle-content_table-data .table-row:last-child').data("TotalMoney", item["TotalMoney"]);
            $('.middle-content_table-data .table-row:last-child').data("CheckType", item["CheckType"]);

            //Các dòng liền nhau có màu khác nhau
            if (index % 2 !== 0) {
                $('.middle-content_table-data .table-data_list-data .table-row:last-child').addClass('row-even');
            } else if (index % 2 === 0) {
                $('.middle-content_table-data .table-data_list-data .table-row:last-child').addClass('row-odd');
            }

            //Thiết lập hàng đầu tiên được check
            $(".middle-content_table-data .table-data_list-data .table-row").eq(0).addClass("choose-background");

            fund.autoRenderWidthHasScroll();
        });
        fund.disableButton();
    }

    ////Hàm lấy dữ liệu chứng từ theo đối tượng
    ////Tạo bởi: NBDUONG(10/6/2019)
    loadDocumentsByPerson() {
        let personId = $('#recipeFormDetail input[fieldName="PersonID"]').val();
        common.callAjaxToServer("GET", "/fund/documents/person/" + personId, null, function (response) {
            $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').html("");
            $.each(response.Data, function (index, item) {
                $('#recipeFormDetail .document-by-person-row-clone span').each(function () {
                    var fieldData = $(this).parent().attr("fieldName");
                    var fieldName = $(this).attr("fieldName");
                    var dataType = $(this).parent().attr("dataType");
                    if (dataType === "date") {
                        item[fieldData] = new Date(item[fieldData]).toLocaleDateString('en-GB');
                        $(this).text(item[fieldData]);
                    } else if (fieldData === "MoneyHasToPay") {
                        $(this).text(item[fieldData].formatNumber());
                    } else if (fieldName === "MoneyHasNotPaid" || fieldName === "AmountPaid") {
                        $(this).text(item[fieldName].formatNumber());
                    }
                    else {
                        $(this).text(item[fieldData]);
                    }
                });
                //Append dữ liệu vào bảng dữ liệu
                if (response.Data.length !== 0) {
                    $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').removeClass('no-data');
                    $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').append($('.document-by-person-row-clone').html());
                    $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data .table-row:last-child').data("MoneyHasToPay", item["MoneyHasToPay"]);
                    $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data .table-row:last-child').data("AmountPaid", item["AmountPaid"]);

                    fund.getTotalMoney();
                } else {
                    $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').addClass('no-data');
                }
            });   
        });
    }

    //Hàm lọc dữ liệu chứng từ của cá nhân theo ngày
    //Tạo bởi: NBDUONG(25/6/2019)
    filterDocumentNotPaidDataByDate() {
        //Bắt sự kiện cho nút lấy dữ liệu
        $('#recipeFormDetail .reciptFormDetail_getData').click(function () {
            $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').html("");
            let date = $("#recipeFormDetail .select-date-pay");
            let personId = $('#recipeFormDetail input[fieldName="PersonID"]').val();
            if (date.val() !== "") {
                let dateString = common.convertStringJSToStringCsharp(date);
                let documentDto = {
                    FromDate: dateString,
                    ToDate: dateString,
                    PersonID: personId
                };
                // Thực hiện load các hóa đơn có ngày tháng được chọn
                common.callAjaxToServer("Post", "/fund/documents/getByDate", documentDto, function (result) {
                    fund.loadDocumentsByPerson(result.Data);
                    fund.setDisableButtonPagingOnFilter(result.length);
                });
            }
        });
    }

    //Hàm thay đổi số trả và số chưa trả tương ứng khi nhập số tiền muốn trả trong form Chọn hóa đơn trả nợ
    //Tạo bởi: NBDUONG(14/5/2019)
    getPaidMoney() {
        $('.input-paidMoney').focusout(function () {
            var inputPaidMoney = $(this).val().formatToNumber();
            fund.getMoney(inputPaidMoney);
            fund.getTotalMoney();
        });
    }

    //Hàm cập nhật các giá trị tiền chưa trả và số trả trong bảng tương ứng với số trả nhập vào từ input
    //Tạo bởi: NBDUONG(14/5/2019)
    getMoney(money) {   
        if (money > 0) {
            $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data .table-row').each(function () {
                if (money > 0) {
                    if (money > $(this).data("MoneyHasToPay")) {
                        money = money - $(this).data("MoneyHasToPay");
                        $(this).data("AmountPaid", $(this).data("MoneyHasToPay"));
                        $(this).find('[fieldName="AmountPaid"]').text($(this).data("AmountPaid").formatNumber());
                        $(this).data("MoneyHasNotPaid", 0);
                        $(this).find('[fieldName="MoneyHasNotPaid"]').text(0);
                        $(this).find('.choose-row-receiptForm').find('img').attr('src', "/Contents/images/check.png");
                        $(this).find('.choose-row-receiptForm').addClass('non-background');
                        $(this).addClass('choose-background');
                    } else {
                        $(this).data("AmountPaid", money);
                        $(this).find('[fieldName="AmountPaid"]').text($(this).data("AmountPaid").formatNumber());
                        $(this).data("MoneyHasNotPaid", $(this).data("MoneyHasToPay") - money);
                        $(this).find('[fieldName="MoneyHasNotPaid"]').text($(this).data("MoneyHasNotPaid").formatNumber());
                        money = 0;
                        $(this).find('.choose-row-receiptForm').find('img').attr('src', "/Contents/images/check.png");
                        $(this).find('.choose-row-receiptForm').addClass('non-background');
                        $(this).addClass('choose-background');
                    }
                } else {
                    $(this).data("AmountPaid", 0);
                    $(this).find('[fieldName="AmountPaid"]').text(0);
                    $(this).data("MoneyHasNotPaid", $(this).data("MoneyHasToPay"));
                    $(this).find('[fieldName="MoneyHasNotPaid"]').text($(this).data("MoneyHasNotPaid").formatNumber());
                    $(this).find('.choose-row-receiptForm').find('img').attr('src', "");
                    $(this).find('.choose-row-receiptForm').removeClass('non-background');
                    $(this).removeClass('choose-background');
                }
            });
        } 
    }


    //Hàm hiển thị tổng tiền phải trả, chưa trả và đã trả của hóa đơn thu nợ/trả nợ
    //Tạo bởi: NBDUONG(10/6/2019)
    getTotalMoney() {
        let totalMoneyHasToPay = 0;
        let amountPaid = 0;
        let moneyHasNotPaid = 0;

        $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data .table-row').each(function () {
            totalMoneyHasToPay += parseInt($(this).data("MoneyHasToPay"));
            amountPaid += parseInt($(this).data("AmountPaid"));
        });
        moneyHasNotPaid = totalMoneyHasToPay - amountPaid;
        $(".totalMoneyHasToPay span").text(totalMoneyHasToPay.formatNumber());
        $(".totalMoneyHasNotPaid span").text(moneyHasNotPaid.formatNumber());
        $("div[fieldName='TotalAmountPaid']").find("span").text(amountPaid.formatNumber());    
    }



    //Hàm lấy dữ liệu từ trên server
    //Tạo bởi: NBDUONG (15/5/2019)
    loadDocumentDataDefault(id) {
        $('.MISABody-part_middle-content .footer-content_detail-table-data .detail-table-data_list-data').html("");
        //Hiển thị loading
        $('.footer-content_detail-table-data .loading').show();
        common.callAjaxToServer("GET", "/fund/" + id, null, function (result) {
            //Ẩn loading
            $('.footer-content_detail-table-data .loading').hide();
            //Đẩy dữ liệu vào các dòng
            $('.footer-content_detail-table-data .footer-table-row-clone span').each(function () {
                let fieldName = $(this).parent().attr("fieldName");
                let fieldData = $(this).parent().attr("dataType");
                if (fieldData === "number") {
                    $(this).text(result.Data[fieldName].formatNumber());
                    $('.detailTotalMoney span').text(result.Data[fieldName].formatNumber());
                }
                else {  
                     $(this).text(result.Data[fieldName]);
                }
            });
            $('.MISABody-part_middle-content .footer-content_detail-table-data .detail-table-data_list-data').append($('.footer-table-row-clone').html());
        });
    }

    //Lấy ra danh sách nhân viên từ trên sever
    //Tạo bởi: NBDUONG(17/5/2019)
    loadEmployeeListFromServer() {
        common.callAjaxToServer("GET", "/purchase/GetEmployees", null, function (result) {
            //Xóa trắng danh sách nhân viên trước khi cập nhật lại dữ liệu mới
            $('#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data').html("");
            $.each(result.Data, function (index, item) {
                //Lấy ra các dòng có attribute fieldName
                let listElements = $(".formChooseStaff_table-row-clone div[fieldName]");
                $.each(listElements, function (i, element) {
                    let fieldName = $(element).attr("fieldName");
                    $(element).find('span').text(item[fieldName]);
                });
                //Gán dữ liệu về id của nhân viên cho dòng
                $('.formChooseStaff_table-row-clone .table-row').data("EmployeeID", item["EmployeeID"]);
                $('#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data').append($('.formChooseStaff_table-row-clone .table-row').clone(true));
                //Nếu dòng có thứ tự là chẵn thì hiển thị background cho hàng chẵn
                if (index % 2 === 0) {
                    $("#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data .table-row:last-child").addClass("row-even");
                }

                //Lấy ra các dòng có attribute fieldName trong bảng dropdown chọn nhân viên
                let listElementsDropdownMenu = $('.employee-table-row-clone div[fieldName]');
                $.each(listElementsDropdownMenu, function (i, element) {
                    let fieldName = $(element).attr("fieldName");
                    $(element).find('span').text(item[fieldName]);
                });
                $('.employee-table-row-clone .table-row').data("EmployeeID", item["EmployeeID"]);
                fund.employeeCodes.push(item["EmployeeCode"]);
                fund.employeeNames.push(item["EmployeeName"]);
                $(".recipeFormDetail_formStaff .detail-table-data_list-data").append($(".employee-table-row-clone .table-row").clone(true));
            });
            // Xét trạng thái checked cho dòng đầu tiên
            $("#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data .table-row:first-child").addClass("choose-background");
            // Xét trạng thái checked cho input radio đầu tiên
            $("#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data .table-row:first-child input").prop("checked", true);
        });
    }

    //Lấy ra danh sách nhân viên từ trên sever
    //Tạo bởi: NBDUONG(17/5/2019)
    loadSuppliersListFromServer() {
        common.callAjaxToServer("GET", "/fund/people", null, function (result) {
            //Xóa trắng danh sách nhà cung cấp trước khi cập nhật lại dữ liệu mới
            $('#formChooseObject .reciptFormDetail_tableData .detail-table-data_list-data').html("");
            $.each(result.Data, function (index, item) {
                //Lấy ra các dòng có attribute fieldName
                let listElements = $(".formChooseObject_table-row-clone div[fieldName]");
                $.each(listElements, function (i, element) {
                    let fieldName = $(element).attr("fieldName");
                    $(element).find('span').text(item[fieldName]);
                });
                //Gán dữ liệu về id của nhà cung cấp cho dòng
                $('.formChooseObject_table-row-clone .table-row').data("PersonID", item["PersonID"]);
                $('#formChooseObject .reciptFormDetail_tableData .detail-table-data_list-data').append($('.formChooseObject_table-row-clone .table-row').clone(true));
                //Nếu dòng có thứ tự là chẵn thì hiển thị background cho hàng chẵn
                if (index % 2 === 0) {
                    $("#formChooseObject .reciptFormDetail_tableData .detail-table-data_list-data .table-row:last-child").addClass("row-even");
                }

                //Lấy ra các dòng có attribute fieldName trong bảng dropdown chọn đối tượng (hiện tại là nhà cung cấp)
                let listElementsDropdownMenu = $('.recipeFormDetail_supplier-table-row-clone div[fieldName]');
                $.each(listElementsDropdownMenu, function (i, element) {
                    let fieldName = $(element).attr("fieldName");
                    $(element).find('span').text(item[fieldName]);
                });
                $('#recipeFormDetail .recipeFormDetail_supplier-table-row-clone .table-row').data("PersonID", item["PersonID"]);
                $("#recipeFormDetail .recipeFormDetail_formSupplier .detail-table-data_list-data").append($(".recipeFormDetail_supplier-table-row-clone .table-row").clone(true));

                //Lấy ra các dòng có attribute fieldName trong bảng dropdown chọn đối tượng (hiện tại là nhà cung cấp)
                let listElementsDropdown = $('.supplier-table-row-clone div[fieldName]');
                $.each(listElementsDropdown, function (i, element) {
                    let fieldName = $(element).attr("fieldName");
                    $(element).find('span').text(item[fieldName]);
                });
                $('#formDetail .supplier-table-row-clone .table-row').data("PersonID", item["PersonID"]);
                fund.supplierCodes.push(item["PersonCode"]);
                fund.supplierNames.push(item["PersonName"]);
                $("#formDetail .recipeFormDetail_formSupplier .detail-table-data_list-data").append($(".supplier-table-row-clone .table-row").clone(true));
            });
            // Xét trạng thái checked cho dòng đầu tiên
            $("#formChooseObject .reciptFormDetail_tableData .detail-table-data_list-data .table-row:first-child").addClass("choose-background");
            // Xét trạng thái checked cho input radio đầu tiên
            $("#formChooseObject .reciptFormDetail_tableData .detail-table-data_list-data .table-row:first-child input").prop("checked", true);
        });
    }

    //Lấy ra danh sách loại chứng từ tử trên sever
    //Tạo bởi: NBDUONG(20/5/2019)
    loadDocumentTypeFromServer() {
        common.callAjaxToServer("GET", "/fund/documentsType", null, function (result) {
            //Xóa trắng danh sách nhà cung cấp trước khi cập nhật lại dữ liệu mới
            $('.document-type-dropdown .detail-table-data_list-data').html("");
            $.each(result.Data, function (index, item) {
                //Lấy ra các dòng có attribute fieldName
                let element = $(".document-type-row-clone div[fieldName]");
                let fieldName = $(element).attr("fieldName");
                $(element).find('span').text(item[fieldName]);
                //Gán dữ liệu về id của nhà cung cấp cho dòng
                $(element).parent().data("DocumentTypeID", item["DocumentTypeID"]);
                $('.document-type-dropdown .detail-table-data_list-data').append($('.document-type-row-clone .table-row').clone(true));
            });
            // Xét trạng thái checked cho dòng đầu tiên
            $(".document-type-dropdown .table-row:first-child").addClass("choose-background");
        });
    }

    //Tạo mới chứng từ
    //Tạo bởi: NBDUONG(24/5/2019)
    createNewDocument() {
        let document = {};
        $("#formDetail input[fieldName]").each(function () {
            let fieldData = $(this).attr("fieldName");
            if ($(this).attr("dataType") === "date") {
                document[fieldData] = common.convertStringJSToStringCsharp(this);
            }
            else if ($(this).attr("dataType") === "number") {
                document[fieldData] = $(this).val().formatToNumber();
            }
            else {
                document[fieldData] = $(this).val();
            }
        });

        //Check nếu là edit thông tin chứng từ
        if (fund.checkEditForm) {
            fund.editDocumentData(document);
        } else {
            common.callAjaxToServer("POST", "/fund/documents/new", document, function () {
                fund.getDataFundFromServer();
                fund.check.closeDialog();
            });
        }
    }

    //Thay đổi thông tin chứng từ
    //Tạo bởi: NBDUONG(28/5/2019)
    editDocumentData(document) {
        let documentId = $('.middle-content_table-data .table-row.choose-background').data("DocumentID");
        document["DocumentID"] = documentId;
        common.callAjaxToServer("POST", "/fund/documents/edit/" + documentId, document, function () {
            fund.getDataFundFromServer();
            fund.check.closeDialog();
        });
    }

    //Save 1 chứng từ, có thể là thêm mới hoặc thay đổi thông tin hoặc nhân bản
    //Tạo bởi: NBDUONG(28/5/2019)
    saveNewDocument() {
        let flag = true;
        let documentCode = $('input[fieldName="DocumentCode"]').val();
        let documentID = fund.checkEditForm ? $('.middle-content_table-data .table-data_list-data .table-row.choose-background').data("DocumentID") : "";

        if ($('.formDetail-info.formDetail-info-other input[fieldName="PersonCode"]').val() === "") {
            fund.messageDialog.changeContentAlertMessage("Trường đối tượng không được bỏ trống. Vui lòng kiểm tra lại");
            fund.messageDialog.changeIconAlertMessage("alert-icon-warning");
            flag = false;
        } else if ($('.formDetail-info.formDetail-info-other input[fieldName="EmployeeCode"]').val() === "") {
            fund.messageDialog.changeContentAlertMessage("Trường nhân viên không được bỏ trống. Vui lòng kiểm tra lại");
            fund.messageDialog.changeIconAlertMessage("alert-icon-warning");
            flag = false;
        } else if ($('.formDetail-info input[fieldName="DocumentTypeName"]').val() === "") {
            fund.messageDialog.changeContentAlertMessage("Trường loại chứng từ không được bỏ trống. Vui lòng kiểm tra lại");
            fund.messageDialog.changeIconAlertMessage("alert-icon-warning");
            flag = false;
        } else if ($('.formDetail-info input[fieldName="TotalMoney"]').val() === "" || $('.formDetail-info input[fieldName="TotalMoney"]').val() === "0") {
            fund.messageDialog.changeContentAlertMessage("Số tiền phải lớn hơn 0. Vui lòng kiểm tra lại");
            fund.messageDialog.changeIconAlertMessage("alert-icon-warning");
            flag = false;
        } else if (!fund.checkDuplicateDocumentCode(fund.checkEditForm, documentCode, documentID)) {
            fund.messageDialog.changeContentAlertMessage("Số chứng từ đã tồn tại trong hệ thống. Vui lòng kiểm tra lại");
            fund.messageDialog.changeIconAlertMessage("alert-icon-warning");
            flag = false;
        }

        if (flag) {
            $('#formDetail').hide();
            fund.createNewDocument();
        } else {
            fund.alertMessage();
            $('#alertDialog').addClass('warning-message');
            fund.changeButtonMessageDialog();
        }
    }

    //Hàm xử lý bấm nút save trong form
    //Tạo bởi: NBDUONG(28/5/2019)
    clickSave() {
        $('#save-formDetail').click(function () {
            fund.saveNewDocument();
        });
    }

    //Thay đổi trạng thái các nút trong form thông báo khi hiển thị các nội dung khác nhau
    //Tạo bởi: NBDUONG(30/5/2019)
    changeButtonMessageDialog() {
        if ($('#alertDialog').hasClass('warning-message')) {
            $('.warning-message').next().find('.alertDialog_btnAccept').show();
            $('.warning-message').next().find('.alertDialog_btnSave').hide();
            $('.warning-message').next().find('.alertDialog_btnNotSave').hide();
            $('.warning-message').next().find('.alertDialog_btnCancel').hide();
            $('.warning-message').next().find('.alertDialog_btnDelete').hide();
        }
        else if ($('#alertDialog').hasClass('close-form-message')) {
            $('.close-form-message').next().find('.alertDialog_btnAccept').hide();
            $('.close-form-message').next().find('.alertDialog_btnDelete').hide();
            $('.close-form-message').next().find('.alertDialog_btnSave').show();
            $('.close-form-message').next().find('.alertDialog_btnNotSave').show();
            $('.close-form-message').next().find('.alertDialog_btnCancel').show();
        }
        else if ($('#alertDialog').hasClass('delete-form-message')) {
            $('.delete-form-message').next().find('.alertDialog_btnAccept').hide();
            $('.delete-form-message').next().find('.alertDialog_btnDelete').show();
            $('.delete-form-message').next().find('.alertDialog_btnSave').hide();
            $('.delete-form-message').next().find('.alertDialog_btnNotSave').hide();
            $('.delete-form-message').next().find('.alertDialog_btnCancel').show();
        }
    }

    //Xóa chứng từ
    //Tạo bởi: NBDUONG(30/5/2019)
    deleteDocument() {
        if ($('.middle-content_table-data .table-row.choose-background').length > 1) {
            fund.deleteManyDocuments();
        }
        else {
            let documentId = $('.middle-content_table-data .table-row.choose-background').data("DocumentID");
            common.callAjaxToServer("POST", "/fund/documents/delete/" + documentId, null, function () {
                fund.getDataFundFromServer();
            });
        }
        fund.disableButton();
    }

    //Hàm xóa nhiều chứng từ
    //Tạo bởi: NBDUONG(7/6/2019)
    deleteManyDocuments() {
        let listDocument = [];
        $('.middle-content_table-data .table-row.choose-background').each(function () {
            var documentId = $(this).data("DocumentID");
            listDocument.push(documentId);
        });

        common.callAjaxToServer("POST", "/fund/documents/delete/listDocuments", listDocument, function () {
            fund.getDataFundFromServer();
        });
    }

    //Hàm hiển thị form thông báo khi thực hiện Xóa chứng từ
    //Tạo bởi: NBDUONG(1/6/2019)
    deleteDocumentDialog() {
        fund.alertMessage();
        $('#alertDialog').addClass("delete-form-message");
        $('span#ui-id-3').text("Xóa dữ liệu");
        fund.messageDialog.changeIconAlertMessage("alert-icon-question");
        if ($('.middle-content_table-data .table-row.choose-background').length > 1) {
            fund.messageDialog.changeContentAlertMessage("Bạn có chắc chắn muốn xóa các chứng từ này không?");
        } else {
            let documentCode = $('.middle-content_table-data .table-row.choose-background').data("DocumentCode");
            let documentType = $('.middle-content_table-data .table-row.choose-background').data("DocumentType");
            fund.messageDialog.changeContentAlertMessage("Bạn có chắc chắn muốn xóa " + documentType + " " + documentCode + " không");
        }
        fund.changeButtonMessageDialog();
    }

    //Nạp lại dữ liệu cho chứng từ
    //Tạo bởi: NBDUONG(31/5/2019)
    refreshDocument() {
        fund.getDataFundFromServer();
    }

    //Click vào dòng trong bảng dữ liệu hiển thị với background chọn đồng thời trả về dữ liệu của dòng đó
    // Hiển thị dữ liệu tương ứng trong bảng chi tiết phía dưới
    //Tạo bởi: NBDUONG(16/5/2019)
    clickRow() {
        $('body')
            .on('click', '.middle-content_table-data .table-data_list-data .data-clickable', function () {
                if (event.ctrlKey) {
                    $(this).parents('.table-row').addClass('choose-background');
                    fund.disableButton();
                }
                else {
                    //Bỏ background hàng chọn
                    $('.middle-content_table-data .table-row.flex').removeClass('choose-background');
                    $('.middle-content_table-data .table-row.flex .data-item_first-column').removeClass('choose-background');
                    $(this).parents('.table-row').addClass('choose-background');
                }

                //Lấy ra id của chứng từ khi click vào dòng chứng từ đó
                var id = $(this).parents('.table-row').data("DocumentID");
                //Hiển thị loading
                $('.footer-content_detail-table-data .loading').show();
                fund.loadDocumentDataDefault(id);
                fund.disableButton();
            })
            .on('dblclick', '.middle-content_table-data .table-data_list-data .data-clickable', function () {
                $('.middle-content_table-data .table-row.flex').removeClass('choose-background');
                $('.middle-content_table-data .table-row.flex .data-item_first-column').removeClass('choose-background');
                $(this).parents('.table-row').addClass('choose-background');
                fund.viewDocument();
                fund.loadDataToForm();
                fund.disableButton();
            });
    }


    //Điều chỉnh độ rộng, độ dài của các cột
    //Tạo bởi: NBDUONG (6/5/2019)
    resizeColumn() {
        for (let i = 2; i < 7; i++) {
            let also = '.data-item' + i;
            $(`.header-table-column${i}`).resizable({
                alsoResize: also,
                handles: 'e',
                minWidth: 150,
                maxWidth: 600
            });
        }

        $('.middle-content_table-data').resizable({
            handles: 's',
            maxHeight: 400,
            minHeight: 300
        });
    }

    //Điều chỉnh chiều rộng chiều cao các cột đồng thời điều chỉnh chiều cao của các div có liên quan trong giao diện
    //Tạo bởi: NBDUONG(8/5/2019)
    autoAdjustHeight() {
        $('.middle-content_upper-part .middle-content_table-data').resize(function () {
            $('.middle-content_upper-part .footer-content_detail-table-data').height($('.middle-content_upper-part').height()
                - 36 - 53 - $('.middle-content_upper-part .middle-content_table-data').height() - 64 - 130);
            $(".middle-content_upper-part .detail-table-data_list-data").height($('.middle-content_upper-part .footer-content_detail-table-data').height() - 50);
        });
    }

    //Tạo hot key cho trang giao diện, sử dụng hotkey để mở nhanh các form
    //Tạo bởi: NBDUONG(18/5/2019)
    setHotKey() {
        $(window).keydown(function (event) {
            // Bấm ctrl + 1 thì mở form thêm mới
            if (event.ctrlKey && event.keyCode === 49) {
                if (fund.allowHotKey) {
                    fund.openDropdownMenuAdd();
                }
                event.preventDefault();
            }

            // Bấm ctrl + 2 thì mở form nhân bản
            if (event.ctrlKey && event.keyCode === 50) {
                if (fund.allowHotKey && fund.allowDuplicate) {
                    fund.duplicateDocument();
                }
                event.preventDefault();
            }

            // Bấm ctrl + 3 thì mở form xem
            if (event.ctrlKey && event.keyCode === 51) {
                if (fund.allowHotKey) {
                    fund.viewDocument();
                }
                event.preventDefault();
            }

            // Bấm ctrl + E thì mở form sửa thông tin chứng từ
            if (event.ctrlKey && event.keyCode === 69) {
                if (fund.allowHotKey) {
                    fund.editDocument();
                }
                event.preventDefault();
            }

            // Bấm ctrl + D thì xóa chứng từ
            if (event.ctrlKey && event.keyCode === 68) {
                if (fund.allowHotKey) {
                    fund.deleteDocumentDialog();
                }
                event.preventDefault();
            }

            // Bấm ctrl + Q thì đóng form thêm mới
            if (event.ctrlKey && event.keyCode === 81) {
                if (fund.allowHotKeyInForm) {
                    //Nếu như là form xem
                    if (fund.checkViewForm) {
                        fund.check.closeDialog();
                        fund.messageDialog.closeDialog();
                    } else {
                        fund.closeFormDialog();
                    }
                }     
                event.preventDefault();
            }

            // Bấm ctrl + S thì lưu thêm mới
            if (event.ctrlKey && event.keyCode === 83) {
                if (fund.allowHotKeyInForm) {
                    if (fund.checkViewForm) {
                        fund.getDataFundFromServer();
                        fund.check.closeDialog();
                    } else {
                        fund.saveNewDocument();
                    }
                }
                event.preventDefault();
            }

            // Bấm F1 thì chuyển tab sang trợ giúp
            if (event.keyCode === 112) {
                if (check.allowHotKeyInForm) {
                    window.open("http://help.mshopkeeper.vn/170103_thu_tien_mat.htm", '_blank');
                } 
                event.preventDefault();
            }
            
            // Bấm mũi tên xuống thì di chuyển tới dòng tiếp theo đồng thời load dữ liệu của hàng đó xuống bảng chi tiết 
            if (event.keyCode === 40) {
                if (fund.allowHotKey) {
                    let rowFocus = $('.middle-content_table-data .table-row.choose-background');
                    fund.loadDocumentByHotKey(rowFocus, "next");
                    fund.loadDataToForm();
                    fund.loadDocumentsOverHotKey();
                    fund.disableButton();
                }
                event.preventDefault();
            }
            // Bấm mũi tên lên trên thì di chuyển tới dòng phía trên theo đồng thời load dữ liệu của hàng đó xuống bảng chi tiết 
            if (event.keyCode === 38) {
                if (fund.allowHotKey) {
                    let rowFocus = $('.middle-content_table-data .table-row.choose-background');
                    fund.loadDocumentByHotKey(rowFocus, "previous");
                    fund.loadDataToForm();
                    fund.loadDocumentsOverHotKey();
                    fund.disableButton();
                }
                event.preventDefault();
            }

            if (event.ctrlKey && event.keyCode === 65) {
                if (fund.allowHotKey) {
                    $('.table-data_list-data .table-row').addClass("choose-background");
                    $('.table-data_list-data .table-row').find('img').attr('src', "/Contents/images/check.png");
                    $('.choose-all').find('img').attr('src', "/Contents/images/check.png");
                }
                event.preventDefault();
            }
        });
    }

    //Hàm bấm nút lên xuống trong danh sách bản ghi thì chuyển tới các dòng tương ứng và load dữ liệu dòng đó
    //Tạo bởi: NBDUONG(22/5/2019)
    loadDocumentByHotKey(rowCurrent, nextStep) {
        let documentId;
        let rowFocus;
        if (nextStep === "next") {
            rowFocus = $(rowCurrent).next();
            documentId = $(rowFocus).data("DocumentID");
        }
        if (nextStep === "previous") {
            rowFocus = $(rowCurrent).prev();
            documentId = $(rowFocus).data("DocumentID");
        }
        //Khi thỏa mãn
        if (rowFocus && documentId) {
            $('.middle-content_table-data .choose-background').removeClass("choose-background");
            $(rowFocus).addClass("choose-background");
            fund.loadDocumentDataDefault(documentId);
        }
    }

    loadDocumentsOverHotKey() {
        let scrollTop = $('.middle-content_table-data .table-data_list-data .choose-background').offset().top - 217;
        console.log(scrollTop);
        let height = $('.middle-content_table-data .table-data_list-data').height();
        if (scrollTop > height) {
            $('.middle-content_table-data .table-data_list-data').scrollTop($('.middle-content_table-data .table-data_list-data').scrollTop() + height);
        } else if(scrollTop < 0) {
            $('.middle-content_table-data .table-data_list-data').scrollTop($('.middle-content_table-data .table-data_list-data').scrollTop() - height + 36);
        }
    }

    //Sắp xếp vị trí tab của form
    //Tạo bởi: NBDUONG(19/5/2019)
    setTabOrder() {
        $('#focusguard-2').on('focus', function () {
            $('#focusguard-1').focus();
        });
        $('#focusguard-3').on('focus', function () {
            $('#focusguard-4').focus();
        });
        $('.pagination-option_right').on('focus', function () {
            $('.select-month select').focus();
        });
        $('.select-month select').keydown(function (event) {
            if (event.shiftKey && event.which === 9) {
                $('#pagination').focus();
                event.preventDefault();
            }
        });
    }

    //Set các sự kiện mặc định trong các input
    //Tạo bởi: NBDUONG(19/5/2019)
    setInputEvent() {
        $('input[type="text"]').on('focus', function () {
            $(this).select();
        });
        // Nếu focus vào input thì viền màu hiện lên
        $("#formDetail input").focus(function () {
            $(this).css("border-color", "#A6C8FF");
        });
        // Nếu blur vào input thì viền màu xám hiện lên
        $("#formDetail input").blur(function () {
            $(this).css("border-color", "#d0d0d0");
        });
    }

    //Hàm mở dropdown chọn Phiếu thu tiền hoặc phiếu chi tiền
    //Tạo bởi: NBDUONG(18/5/2019)
    openDropdownMenuAdd() {
        $('#btnAdd').trigger('click');
    }

    //Hàm bắt sự kiện bấm vào mã chứng từ hiển thị form Xem
    //Tạo bởi: NBDUONG(13/6/2019)
    openViewForm() {
        $('body').on("click", '.middle-content_table-data div[fieldName="DocumentCode"] span', function () {
            $('.middle-content_table-data .table-row').removeClass('choose-background');
            $(this).parents('.table-row').addClass('choose-background');
            fund.viewDocument();
        });
    }

    //Hàm lấy dữ liệu trong các hàng để hiển thị lên input tương ứng
    //Tạo bởi: NBDUONG (6/5/2019)
    getSupplierData(supplierCode, supplierName) {
        $('.supplier-code').val(supplierCode);
        $('.supplier-name').val(supplierName);
    }

    //Hàm lấy dữ liệu trong các hàng để hiển thị lên input tương ứng
    //Tạo bởi: NBDUONG (6/5/2019)
    getObjectData(objectName) {
        $('#formChooseObject .objectComboBox_dropdown-menu').prev().prev().val(objectName);
    }

    //Hàm lấy dữ liệu trong các hàng để hiển thị lên input tương ứng
    //Tạo bởi: NBDUONG (6/5/2019)
    getPaidTypeData(objectName) {
        $('.checkPaidType-dropdown-menu').prev().prev().prev().val(objectName);
    }

    //Hàm lấy dữ liệu trong các hàng để hiển thị lên input tương ứng
    //Tạo bởi: NBDUONG (6/5/2019)
    getStaffData(staffName, staffCode) {
        $('.recipeFormDetail_formStaff').prev().prev().prev().val(staffCode);
        $('.recipeFormDetail_formStaff').parent().next().next().val(staffName);
    }

    //Hàm đồng bộ dữ liệu giữa mã nhà cung cấp và tên nhà cung cấp
    //Tạo bởi: NBDUONG (6/5/2019)
    asyncDataValue(supplierCode, supplierName) {
        $('.supplier-name-paydebt').val(supplierName);
        $('.supplier-code-paydebt').val(supplierCode);
        $('.supplier-name').val(supplierName);
        $('.supplier-code').val(supplierCode);
        var reasonPayDebt = "Trả nợ cho " + supplierName;
        $('input[fieldName="Reason"]').val(reasonPayDebt);
    }

    //Hàm lấy giá trị của input Số trả, nếu nhập số âm thì mặc định là 0
    //Tạo bởi: NBDUONG (12/5/2019)
    validateData() {
        //Nếu giá trị số trả âm thì mặc định là 0
        $("#recipeFormDetail .formDetail_general-info_left-item_list-input .left-item-input.left-item-without-icon input").change(function () {
            if ($(this).val() < 0 || $(this).val() === "") {
                $(this).val(0);
            }
        });
    }

    //Hàm xử lý validate độ dài input
    //Tạo bởi: NBDUONG(18/5/2019)
    validateInput(element, length) {
        $(element).keydown(function () {
            if ($(this).val().length > length) {
                $(this).next().show();
                $(this).next().attr("data-title", "Trường này không được vượt quá " + length + " kí tự");
                $(this).addClass('border-red');
                $(this).css('outline', 'none');
            } else {
                $(this).removeClass('border-red');
                $(this).next().hide();
                $(this).css('outline', '1px solid #A6C8FF');
            }
        });

        $(element).blur(function () {
            if ($(this).val().length > length) {
                $(this).val("");
                $(this).removeClass('border-red');
                $(this).next().hide();
            }
        });
    }

    //Gọi hàm xử lý validate chiều dài input nhập vào
    //Tạo bởi: NBDUONG(18/5/2019)
    validateInputData() {
        this.validateInput('input[inputType="Name"]', 128);
        this.validateInput('input[inputType="Reason"]', 255);
    }

    //Kiểm tra input chọn đối tượng có trong bảng chọn đối tượng hay không
    //Nếu input nhập vào trùng với mã đối tượng hiển thị tên và các trường tương ứng
    //Tạo bởi: NBDUONG(23/5/2019)
    checkSupplierCodeValidateInput() {
        var scrollTop = 0;
        //Bấm ra ngoài vùng input mã đối tượng
        $('.supplier-code').focusout(function () {
            let suppliercode = $(this).val().trim();
            //Nếu input nhập vào không trùng mã có trong bảng
            if (!fund.supplierCodes.includes(suppliercode)) {
                $(this).val("");
                $(this).parent().addClass('border-red');
                $(this).closest('.left-item-input-with-icon').next().show();
                $('input[fieldName="PersonName"]').val("");
                $('input[fieldName="Reason"]').val("");
                $('input[fieldName="PersonID"]').val("");
            } else {
                $('.recipeFormDetail_formSupplier .detail-data-item[fieldName="PersonCode"]').each(function () {
                    if (suppliercode === $(this).text().trim()) {
                        let supplierName = $(this).next().text().trim();
                        let supplierId = $(this).parent().data("PersonID");
                        $('.formDetail-info-other input[fieldName="PersonCode"]').val(suppliercode);
                        $('.formDetail-info-other input[fieldName="PersonName"]').val(supplierName);
                        $('.formDetail-info-other input[fieldName="Reason"]').val("Trả nợ cho " + supplierName);
                        $('input[fieldName="PersonID"]').val(supplierId);
                        $('.supplier-code').parent().removeClass('border-red');
                        $('.supplier-code').closest('.left-item-input-with-icon').next().hide();
                    }
                });
            }
        });

        //Bấm ra ngoài vùng input tên đối tượng
        $('.supplier-name').focusout(function () {
            let suppliername = $(this).val().trim();
            //Nếu input nhập vào không trùng mã có trong bảng
            if (!fund.supplierNames.includes(suppliername)) {
                $(this).val("");
                $('input[fieldName="PersonCode"]').val("");
                $('input[fieldName="Reason"]').val("");
                $('input[fieldName="PersonID"]').val("");
            } else {
                $('.recipeFormDetail_formSupplier .detail-data-item[fieldName="PersonName"]').each(function () {
                    if (suppliername === $(this).text().trim()) {
                        let suppliercode = $(this).prev().text().trim();
                        let supplierId = $(this).parent().data("PersonID");
                        $('.formDetail-info-other input[fieldName="PersonCode"]').val(suppliercode);
                        $('.formDetail-info-other input[fieldName="PersonName"]').val(suppliername);
                        $('.formDetail-info-other input[fieldName="Reason"]').val("Trả nợ cho " + suppliername);
                        $('input[fieldName="PersonID"]').val(supplierId);
                    }
                });
            }
        });

        //Bấm ra ngoài vùng input mã nhân viên
        $('.employee-code').focusout(function () {
            let employeecode = $(this).val().trim();
            //Nếu input nhập vào không trùng mã có trong bảng   
            if (!fund.employeeCodes.includes(employeecode)) {
                $(this).val("");
                $(this).parent().addClass('border-red');
                $(this).parent().next().show();
                $('input[fieldName="EmployeeCode"]').val("");
                $('input[fieldName="EmployeeName"]').val("");
                $('input[fieldName="EmployeeID"]').val("");
            } else {
                $('.recipeFormDetail_formStaff .detail-data-item[fieldName="EmployeeCode"]').each(function () {
                    if (employeecode === $(this).text().trim()) {
                        let employeeName = $(this).next().text().trim();
                        let employeeId = $(this).parent().data("EmployeeID");
                        $('.formDetail-info-other input[fieldName="EmployeeCode"]').val(employeecode);
                        $('.formDetail-info-other input[fieldName="EmployeeName"]').val(employeeName);
                        $('input[fieldName="EmployeeID"]').val(employeeId);
                        $('.employee-code').parent().removeClass('border-red');
                        $('.employee-code').closest('.left-item-input-with-icon').next().hide();
                    }
                });
            }
        });

        $('input[fieldName="PersonCode"]').keyup(function (event) {
            if (event.keyCode === 13) {
                let personCode = $('.row-focus').find('.detail-data-item_first-column').text().trim();
                let personName = $('.row-focus').find('.detail-data-item_second-column').text().trim();
                $('#formDetail input[fieldName="PersonID"]').val($('.row-focus').data("PersonID"));
                fund.asyncDataValue(personCode, personName);
                $(".recipeFormDetail_formSupplier").hide();
                $('.row-focus').removeClass('.row-focus');
            } else if (event.keyCode === 40) {
                if ($('.recipeFormDetail_formSupplier:visible').length > 0) {
                    if ($('.row-focus').nextAll('.table-row:visible').first().hasClass('table-row')) {
                        $('.row-focus').removeClass('row-focus').nextAll('.table-row:visible').first().addClass('row-focus');
                    } else {
                        scrollTop = -35;
                        $('.row-focus').removeClass('.row-focus');
                        $('.recipeFormDetail_formSupplier .table-row:visible').first().addClass('row-focus');
                    }
                    $('.recipeFormDetail_formSupplier .detail-table-data_list-data').scrollTop(scrollTop += 35);
                } else {
                    scrollTop = 0;
                    $('.recipeFormDetail_formSupplier').show();
                    $('.recipeFormDetail_formSupplier .table-row').show();
                    $('.recipeFormDetail_formSupplier .table-row:visible').eq(0).addClass('row-focus');
                }
            } else if (event.keyCode === 38) {
                if ($('.recipeFormDetail_formSupplier:visible').length > 0) {
                    if ($('.row-focus').prevAll('.table-row:visible').first().hasClass('table-row')) {
                        $('.row-focus').removeClass('row-focus').prevAll('.table-row:visible').first().addClass('row-focus');
                    } else {
                        scrollTop = 800;
                        $('.row-focus').removeClass('.row-focus');
                        $('.recipeFormDetail_formSupplier .table-row:visible').last().addClass('row-focus');
                    }
                    $('.recipeFormDetail_formSupplier .detail-table-data_list-data').scrollTop(scrollTop -= 35);
                }
            } else {
                scrollTop = 0;
                $('.recipeFormDetail_formSupplier .detail-table-data_list-data').scrollTop(scrollTop);
                let value = $(this).val().toLowerCase();
                $('.row-focus').removeClass('row-focus');
                let checkHasValue = false;
                $('.recipeFormDetail_formSupplier .table-row').hide();
                $('.recipeFormDetail_formSupplier .table-row').each(function () {
                    let personCode = $(this).find('div[fieldName="PersonCode"]').text().trim().toLowerCase();
                    let personName = $(this).find('div[fieldName="PersonName"]').text().trim().toLowerCase();
                    if (personCode.includes(value) || personName.includes(value)) {
                        $(this).show();
                        checkHasValue = true;
                    } else {
                        $(this).hide();
                    }
                });
                if (checkHasValue) {
                    $('.recipeFormDetail_formSupplier').show();
                    $('.recipeFormDetail_formSupplier .table-row:visible').eq(0).addClass('row-focus');
                } else {
                    $('.recipeFormDetail_formSupplier').hide();
                }
            }
        });

        $('input[fieldName="EmployeeCode"]').keyup(function (event) {
            if (event.keyCode === 13) {
                let personCode = $('.row-focus').find('.detail-data-item_first-column').text().trim();
                let personName = $('.row-focus').find('.detail-data-item_second-column').text().trim();
                $('#formDetail input[fieldName="EmployeeID"]').val($('.row-focus').data("EmployeeID"));
                fund.getStaffData(personName, personCode);
                $(".recipeFormDetail_formStaff").hide();
                $('.row-focus').removeClass('.row-focus');
            } else if (event.keyCode === 40) {
                if ($('.recipeFormDetail_formStaff:visible').length > 0) {
                    if ($('.row-focus').nextAll('.table-row:visible').first().hasClass('table-row')) {
                        $('.row-focus').removeClass('row-focus').nextAll('.table-row:visible').first().addClass('row-focus');
                    } else {
                        scrollTop = -35;
                        $('.row-focus').removeClass('.row-focus');
                        $('.recipeFormDetail_formStaff .table-row:visible').first().addClass('row-focus');
                    }
                    $('.recipeFormDetail_formStaff .detail-table-data_list-data').scrollTop(scrollTop += 35);
                } else {
                    scrollTop = 0;
                    $('.recipeFormDetail_formStaff').show();
                    $('.recipeFormDetail_formStaff .table-row').show();
                    $('.recipeFormDetail_formStaff .table-row:visible').eq(0).addClass('row-focus');
                }
            } else if (event.keyCode === 38) {
                if ($('.recipeFormDetail_formStaff:visible').length > 0) {
                    if ($('.row-focus').prevAll('.table-row:visible').first().hasClass('table-row')) {
                        $('.row-focus').removeClass('row-focus').prevAll('.table-row:visible').first().addClass('row-focus');
                    } else {
                        scrollTop = 800;
                        $('.row-focus').removeClass('.row-focus');
                        $('.recipeFormDetail_formStaff .table-row:visible').last().addClass('row-focus');
                    }
                    $('.recipeFormDetail_formStaff .detail-table-data_list-data').scrollTop(scrollTop -= 35);
                }
            } else {
                scrollTop = 0;
                $('.recipeFormDetail_formStaff .detail-table-data_list-data').scrollTop(scrollTop);
                let value = $(this).val().toLowerCase();
                $('.row-focus').removeClass('row-focus');
                let checkHasValue = false;
                $('.recipeFormDetail_formStaff .table-row').hide();
                $('.recipeFormDetail_formStaff .table-row').each(function () {
                    let personCode = $(this).find('div[fieldName="EmployeeCode"]').text().trim().toLowerCase();
                    let personName = $(this).find('div[fieldName="EmployeeName"]').text().trim().toLowerCase();
                    if (personCode.includes(value) || personName.includes(value)) {
                        $(this).show();
                        checkHasValue = true;
                    } else {
                        $(this).hide();
                    }
                });
                if (checkHasValue) {
                    $('.recipeFormDetail_formStaff').show();
                    $('.recipeFormDetail_formStaff .table-row:visible').eq(0).addClass('row-focus');
                } else {
                    $('.recipeFormDetail_formStaff').hide();
                }
            }
        });
    }

    //Check xem số ở input nhập vào có phải là dạng number hay không
    //Tạo bởi: NBDUONG(24/5/2019)
    ifIsNaN() {
        $('input[fieldName="TotalMoney"]').blur(function () {
            let value = $(this).val().formatToNumber();
            if (isNaN(value)) {
                $(this).data("0");
            }
        });
    }

    //Hàm format hiển thị tiền
    //Tạo bởi: NBDUONG(4/6/2019)
    formatCurrency() {
        $('input[data-thousands="."]').maskNumber({ integer: true });
    }

    //Hàm đồng bộ dữ liệu trong form Chọn hóa đơn trả nợ và dữ liệu trong form Thêm phiếu thu/chi
    //Tạo bởi: NBDUONG(11/6/2019)
    asyncDataFromChooseReceiptForm() {
        $('#recipeFormDetail .recipeFormDetail_formSupplier .table-row').mousedown(function () {
            let supplierCode = $(this).find('.detail-data-item_first-column').text().trim();
            let supplierName = $(this).find('.detail-data-item_second-column').text().trim();
            fund.asyncDataValue(supplierCode, supplierName);
            $(this).parents('.recipeFormDetail_formSupplier').hide();
            $(this).parents('.recipeFormDetail_formSupplier').prev().hide();
            $("input[fieldName='PersonID']").val($(this).data("PersonID"));
            $(".totalMoneyHasToPay span, .totalMoneyHasNotPaid span, div[fieldName='AmountPaid']").text(0);
            fund.loadDocumentsByPerson();
            $(this).parents('#recipeFormDetail').find('.recipeForm_disablePayDate').hide();
            $(this).parents('#recipeFormDetail').find('.recipeForm_disableGetData').hide();
            $('.formDetail-info-paydebt input').prop('disabled', false);
            $('.paydebt-disable').prop('disabled', true);
            $('.formDetail-info-paydebt').removeClass('enable-input-paydebt');
        });

        var totalMoney = $("div[fieldName='TotalAmountPaid']").find("span").text();
        var moneyToPay = $(".totalMoneyHasToPay").find("span").text();
        var moneyHasNotPaid = $(".totalMoneyHasNotPaid").find("span").text();
        $('input[fieldName="TotalMoney"]').val(totalMoney);
        $('input[fieldName="AmountPaid"]').val(totalMoney);
        $('input[fieldName="MoneyHasToPay"]').val(moneyToPay);
        $('input[fieldName="MoneyHasNotPaid"]').val(moneyHasNotPaid);
        $('.formDetail_table-detail-data .detail-total-money-row_second-column span').text(totalMoney);

        $('input[fieldName="TotalMoney"]').change(function () {
            var res = $(this).val();
            $('.formDetail_table-detail-data .detail-total-money-row_second-column span').text(res);
        });
    }

    //Bấm vào 1 hàng trong dropdown menu có dữ liệu -> input ở trên hiển thị dữ liệu tương ứng với dữ liệu trong dòng đó
    //Tạo bởi: NBDUONG (6/5/2019)
    selectStaff() {
        $('#formChooseObject .objectComboBox_dropdown-menu .option-row').mousedown(function () {
            let objectName = $(this).text().trim();
            fund.getObjectData(objectName);
            $(this).parent().hide();
        });

        $('body').on('mousedown', '#formDetail .recipeFormDetail_formSupplier .detail-table-data_list-data .table-row', function () {
            let supplierCode = $(this).find('.detail-data-item_first-column').text().trim();
            let supplierName = $(this).find('.detail-data-item_second-column').text().trim();
            fund.getSupplierData(supplierCode, supplierName);
            $(this).parents('.recipeFormDetail_formSupplier').hide();
            $('#formDetail input[fieldName="PersonID"]').val($(this).data("PersonID"));
            $('#formDetail .receiver-name').val(supplierName);
            $('#formDetail input[fieldName="PersonCode"]').parent().removeClass('border-red');
            $('#formDetail input[fieldName="PersonCode"]').parent().next().hide();
        });

        $('body').on('mousedown', '#formDetail .recipeFormDetail_formStaff .table-row', function () {
            let supplierCode = $(this).find('.detail-data-item_first-column').text().trim();
            let supplierName = $(this).find('.detail-data-item_second-column').text().trim();
            $('.employee-code').val(supplierCode);
            $('.employee-name').val(supplierName);
            $(this).parents('.recipeFormDetail_formStaff').hide();
            $('#formDetail input[fieldName="EmployeeID"]').val($(this).data("EmployeeID"));
            $('#formDetail input[fieldName="EmployeeCode"]').parent().removeClass('border-red');
            $('#formDetail input[fieldName="EmployeeCode"]').parent().next().hide();
        });

        $('body').on('mousedown', '#formChooseStaff .reciptFormDetail_tableData .detail-table-data_list-data .table-row', function () {
            let employeeCode = $(this).find('.detail-data-item_first-column').text().trim();
            let employeeName = $(this).find('.detail-data-item_second-column').text().trim();   
            $('.employee-code').val(employeeCode);
            $('.employee-name').val(employeeName);
            $(this).parents('.recipeFormDetail_formStaff').hide();
            $('#formDetail input[fieldName="EmployeeID"]').val($(this).data("EmployeeID"));
        });

        $('body').on('mousedown', '.document-type-dropdown .table-row', function () {
            let documentType = $(this).find('span').text().trim();
            $('.document-type-input input[fieldName="DocumentTypeName"]').val(documentType);
            $(this).parents('.document-type-dropdown').hide();
            $('#formDetail input[fieldName="DocumentTypeID"]').val($(this).data("DocumentTypeID"));
        });

        $('.checkPaidType-dropdown-menu .option-row').mousedown(function () {
            let objectName = $(this).text().trim();
            fund.getPaidTypeData(objectName);
            $(this).parent().hide();
        });
    }

    //Bấm vào 1 hàng trong dropdown menu có dữ liệu -> input ở trên hiển thị dữ liệu tương ứng với dữ liệu trong dòng đó
    //Tạo bởi: NBDUONG (6/5/2019)
    selectOption() {
        $('body').on('mousedown', '.select-option-menu-docType span', function () {
            let documentType = $(this).text().trim();
            $('.input-documentType').val(documentType);
            $(this).parent().hide();
            $('.middle-content_table-data .table-data_list-data').html("");
            let TextFilter = $(this).parent().next().find('input').val().trim();
            let TypeFilter = $(this).parent().next().find('input').attr("fieldName").trim();
            fund.filterDataByCondition(TextFilter, TypeFilter);
        });

        $('body').on('mousedown', '.select-option-menu span', function () {
            let signal = $(this).find('b').text().trim();
            $(this).parent().prev().text(signal);
            $(this).parent().hide();
        });
    }

    //Hàm hiển thị form thông báo khi thực hiện đóng form
    //Tạo bởi: NBDUONG(28/5/2019)
    closeFormDialog() {
        fund.alertMessage();
        $('#alertDialog').addClass("close-form-message");
        $('span#ui-id-3').text("Dữ liệu chưa được lưu");
        fund.messageDialog.changeContentAlertMessage("Dữ liệu đã thay đổi. Bạn có muốn lưu không?");
        fund.messageDialog.changeIconAlertMessage("alert-icon-question");
        fund.changeButtonMessageDialog();
    }

    //Click vào nút Đóng trong form thì hiển thị thông báo
    //Tạo bởi: NBDUONG(28/5/2019)
    closeFormMessage() {
        $('body').on('click', '#btnCloseFormDialog', function () {
            fund.closeFormDialog();
        });
        $('body').on('click', '.view-document #btnCloseFormDialog', function () {
            fund.check.closeDialog();
            fund.messageDialog.closeDialog();
        });
    }

    //Hàm mặc định lấy ngày hiện tại trong input
    //Tạo bởi: NBDUONG (8/5/2019)
    getCurrentDate() {
        $('#recipeFormDetail .select-date-pay, #formDetail .formDetail-info-paydebt .select-date-pay').change(function () {
            if ($(this).val() === "") {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
        });
    }

    //Hàm lấy giá trị trước đó khi input chứa số chứng từ bị xóa trắng
    //Tạo bởi: NBDUONG(1/6/2019)
    getCurrentDocumentCode() {
        $('input[fieldName="DocumentCode"]').change(function () {
            if ($(this).val() === "") {
                $(this).val($(this).attr("data-previous"));
            } else {
                $(this).attr("data-previous", $(this).val());
            }
        });
    }

    //Bắt sự kiện chọn Khác hay Trả nợ trong form
    //Tạo bởi: NBDUONG(6/5/2019)
    setEventsRadioInput() {
        //Bấm vào input radio để lựa chọn Khác hoặc Trả nợ trong form Thêm phiếu chi
        //Tạo bởi: NBDUONG(6/5/2019)
        $(".formDetail_navigation-bar #radio1").change(function () {
            if ($(this).is(":checked")) {
                $('.formDetail-info-other').show();
                $('.formDetail-info-paydebt').hide();
                $('.navigation-bar_item.choose-pay-recipt').hide();
                $('input[fieldName="CheckType"]').val(1);
                $('.formDetail-info-other .formDetail_detail-info .formDetail_table-detail-data').show();
                fund.allowDuplicate = true;
            }
        });

        //Bấm vào input radio để lựa chọn Khác hoặc Trả nợ trong form Thêm phiếu chi
        //Tạo bởi: NBDUONG(6/5/2019)
        $(".formDetail_navigation-bar #radio2").change(function () {
            if ($(this).is(":checked")) {
                $('.formDetail-info-paydebt').show();
                $('.formDetail-info-other').hide();
                $('.navigation-bar_item.choose-pay-recipt').show();
                $('input[fieldName="CheckType"]').val(2);
                fund.setDisableInput();
                fund.allowDuplicate = false;
            }
        });
    }

    //Kiểm tra xem các hàng có được check hay không
    //Tạo bởi: NBDUONG(11/6/2019)
    setCheckedRow() {
        let checkedLength = $('.middle-content_table-data .table-row.choose-background').length;
        let sumRow = $('.middle-content_table-data .table-data_list-data .table-row').length;
        console.log(checkedLength);
        console.log(sumRow);
        if (checkedLength === sumRow) {
            $('.choose-all').find('img').attr('src', '/Contents/images/check.png');
            $('.choose-all').addClass('non-background');
        } else {
            $('.choose-all').find('img').attr('src', '');
            $('.choose-all').removeClass('non-background');
        }
    }

    //Hàm lấy dữ liệu lọc theo điều kiện lọc bằng việc bắt sự kiện
    //Tạo bởi: NBDUONG(12/6/2019)
    filterDataByAction() {
        // Khi nhấn enter tìm kiếm
        $(".MISABody-part_middle-content .header-table_third-column input,.MISABody-part_middle-content .header-table_sixth-column input,.MISABody-part_middle-content .header-table_seventh-column input").keydown(function () {
            if (event.keyCode === 13) {
                $('.middle-content_table-data .table-data_list-data').html("");
                $('.MISABody-part_middle-content .loading').show();
                let TextFilter = $(this).val().trim();
                let TypeFilter = $(this).attr("fieldName").trim();
                fund.filterDataByCondition(TextFilter, TypeFilter);
            }
        });
    }

    //Hàm lọc dữ liệu theo điều kiện
    //Tạo bởi: NBDUONG(12/6/2019)
    filterDataByCondition(textFilter, typeFilter) {
        let documentDto = {
            TextFilter: textFilter,
            TypeFilter: typeFilter
        };
        common.callAjaxToServer("POST", "/fund/documents/filterData", documentDto, function (result) {
            $('.MISABody-part_middle-content .loading').hide();
            fund.loadDocuments(result.Data);
            if (result.Data.length > 0) {
                fund.loadDocumentDataDefault(result.Data[0].DocumentID);
            }
            fund.setDisableButtonPagingOnFilter(result.Data.length);
        });
    }

    //Hàm lọc dữ liệu theo ngày
    //Tạo bởi: NBDUONG(13/6/2019)
    filterDataByDate() {
        $(".MISABody-part_middle-content .header-table_second-column input").change(function () {
            if ($(this).val() !== "") {
                let dateChange = common.convertStringJSToStringCsharp(this);
                let documentDto = {
                    FromDate: dateChange,
                    ToDate: dateChange
                };
                $('.middle-content_table-data .table-data_list-data').html("");
                common.callAjaxToServer("POST", "/fund/documents/getByDate", documentDto, function (result) {
                    fund.loadDocuments(result.Data);
                    if (result.Data.length > 0) {
                        fund.loadDocumentDataDefault(result.Data[0].DocumentID);
                    }
                    fund.setDisableButtonPagingOnFilter(result.Data.length);
                });
            } else {
                fund.getDataFundFromServer();
            }
        });
    }

    //Hàm xử lý khi chọn nút "Thêm phiếu thu"
    //Tạo bởi: NBDUONG(2/5/2019)
    addCollectMoney() {
        fund.checkViewForm = false;
        fund.checkEditForm = false;
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.check.openDialog();
        $('#formDetail').addClass("add-collect-money");
        $('span#ui-id-1').text("Thêm phiếu thu");
        $('span#ui-id-2').text("Chọn hóa đơn thu nợ");
        $('.navigation-bar_item.choose-pay-recipt.flex span').text("Chọn hóa đơn thu nợ");
        $('.formDetail-info.formDetail-info-other').find('.right-item-info.flex').hide();
        $('.formDetail-info.formDetail-info-other').find('.choosePaidType').hide();
        $('#formDetail input').val("");
        fund.getAutoDocumentCollectCode();
        fund.check.setValueTimeDefault();
        fund.enableInput();
        fund.setDisableInput();
    }

    //Hàm xử lý khi chọn nút "Thêm phiếu chi"
    //Tạo bởi: NBDUONG(2/5/2019)
    addPayMoney() {
        fund.checkViewForm = false;
        fund.checkEditForm = false;
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.check.openDialog();
        $('#formDetail').addClass("add-pay-money");
        $('span#ui-id-1').text("Thêm phiếu chi");
        $('span#ui-id-2').text("Chọn hóa đơn trả nợ");
        $('.navigation-bar_item.choose-pay-recipt.flex span').text("Chọn hóa đơn trả nợ");
        $('.formDetail-info.formDetail-info-other').find('.right-item-info.flex').show();
        $('.formDetail-info.formDetail-info-other').find('.choosePaidType').show();
        $('#formDetail input').val("");
        fund.getAutoDocumentPayCode();
        fund.check.setValueTimeDefault();
        fund.enableInput();
        fund.setDisableInput();
    }

    //Mở nút bị disable trước đó
    //Tạo bởi: NBDUONG (11/5/2019)
    enableInput() {
        $("#formDetail input").prop('disabled', false);
        $("#formDetail input[fieldName='EmployeeName']").prop('disabled', true);
        $('#formDetail input[fieldName="TotalMoney"]').val(0);
        $('.formDetail_table-detail-data .detail-total-money-row_second-column span').text($('.formDetail_table-detail-data input[fieldName="TotalMoney"]').val());
    }

    //Disable các nút khi mở form trước đó
    //Tạo bởi: NBDUONG (11/5/2019)
    setDisableInput() {
        $('.formDetail-info-paydebt input').prop('disabled', true);
        $('.formDetail-info-paydebt input[fieldName="DocumentCode"], .formDetail-info-paydebt input[fieldName="DocumentDate"]').prop('disabled', false);
        $('.formDetail-info-paydebt').addClass('enable-input-paydebt');
    }

    //Hàm xử lý khi chọn nút "Xem"
    //Tạo bởi: NBDUONG(28/5/2019)
    viewDocument() {
        fund.checkViewForm = true;
        fund.checkEditForm = false;
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.check.openDialog();
        $('#formDetail').addClass("view-document");
        $('span#ui-id-1').text("Phiếu thu");
        $(".view-document input").prop('disabled', true);
        fund.loadDataToForm();
        fund.checkCollectOrPayForm("");
        if (fund.checkViewForm) {
            if ($('.middle-content_table-data .table-row.choose-background').is($('.middle-content_table-data .table-row:first-child'))) {
                $('.view-document #before-formDetail').removeClass('document-before');
            } else {
                $('.view-document #before-formDetail').addClass('document-before');
            }
        }
    }

    //Hàm check dữ liệu xem là phiếu thu hay phiếu chi
    //Tạo bởi: NBDUONG(10/6/2019)
    checkCollectOrPayForm(action) {
        let documentCode = $('.middle-content_table-data .table-row.choose-background').data("DocumentCode");
        let subCode = documentCode.substr(0, 2);
        if (subCode === "PC") {
            $('span#ui-id-1').text(action + " Phiếu chi");
            $('#formDetail .formDetail_navigation-bar #radio1').prop('checked', true);
            $('input[fieldName="CheckType"]').val(1);
            $('.formDetail-info-other').show();
            $('.formDetail-info-paydebt').hide();
            $('span#ui-id-2').text("Chọn hóa đơn thu nợ");
            fund.getAutoDocumentCollectCode();
            fund.allowDuplicate = true;
        } else if (subCode === "PT") {
            $('span#ui-id-1').text(action + " Phiếu thu");
            $('#formDetail .formDetail_navigation-bar #radio2').prop('checked', true);
            $('input[fieldName="CheckType"]').val(2);
            $('.formDetail-info-paydebt').show();
            $('.formDetail-info-other').hide();
            fund.getAutoDocumentPayCode();
            fund.allowDuplicate = false;
        }
    }

    //Hàm xử lý khi chọn nút "Sửa"
    //Tạo bởi: NBDUONG(28/5/2019)
    editDocument() {
        fund.checkEditForm = true;
        fund.checkViewForm = false;
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.check.openDialog();
        $('#formDetail').addClass("edit-document");
        fund.checkCollectOrPayForm("Sửa");
        fund.loadDataToForm();
        fund.enableInput();
    }

    //Hàm xử lý khi chọn nút "Nhân bản"
    //Tạo bởi: NBDUONG(28/5/2019)
    duplicateDocument() {
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.checkViewForm = false;
        fund.check.openDialog();
        $('#formDetail').addClass("duplicate-document");
        fund.loadDataToForm(true);
        fund.enableInput();
        $('input[fieldName="CheckType"]').val(1);
        fund.allowDuplicate = true;
        $('.duplicate-document .formDetail-info-other').show();
        $('.duplicate-document input[type="radio"]#radio2').prop('disabled', true);
        $('.duplicate-document input[type="radio"]#radio1').prop('checked', true);
    }

    //Hàm xử lý khi chọn nút "Chọn hóa đơn trả nợ" 
    //Tạo bởi: NBDUONG(6/5/2019)
    choosePayDebtRecipt() {
        $('#recipeFormDetail .supplier-name-paydebt').val("");
        $('#recipeFormDetail .input-paidMoney').val("0");
        $('#recipeFormDetail .reciptFormDetail_tableData .detail-table-data_list-data').html("");
        fund.allowHotKeyInForm = true;
        fund.allowHotKey = false;
        fund.popup.openDialog();
        fund.popup.setValueTimeDefault();
        fund.getTotalMoney();
    }

    //Hàm xử lý khi bấm icon search (thuộc input chọn đối tượng) trong input của form Khác khi Thêm phiếu chi
    //Tạo bởi: NBDUONG(9/5/2019)
    chooseObjectPay() {
        $(".input-staffCode").removeClass("input-staffCode");
        $(".input-staffName").removeClass("input-staffName");
        $(this).prev().prev().addClass('input-staffCode');
        $(this).parent().next().next().addClass('input-staffName');
        fund.chooseObjectPay.openDialog();
        $('span#ui-id-4').text("Chọn đối tượng");
        fund.chooseObjectPay.setValueTimeDefault();
    }

    //Hàm xử lý khi bấm icon search (thuộc input chọn nhân viên) trong input của form Khác khi Thêm phiếu chi
    //Tạo bởi: NBDUONG(9/5/2019)
    chooseStaffPaydebt() {
        $(".input-staffCode").removeClass("input-staffCode");
        $(".input-staffName").removeClass("input-staffName");
        $(this).prev().prev().addClass('input-staffCode');
        $(this).parent().next().next().addClass('input-staffName');
        fund.chooseStaff.openDialog();
        $('span#ui-id-5').text("Chọn nhân viên");
        fund.chooseStaff.setValueTimeDefault();
    }

    //Hàm hiện thông báo khi lưu
    //Tạo bởi: NBDUONG(9/5/2019)
    alertMessage() {
        fund.messageDialog.openDialog();
        $('span#ui-id-3').text("MShopkeeper");
        $('.alertDialog-icon').removeAttr('alert-icon-warning');
        $('.alertDialog-icon').removeClass('alert-icon-question');
    }

    //Hàm push dữ liệu vào trong form
    //Có check xem đó là form xem, form sửa, hay form nhân bản
    //Tạo bởi: NBDUONG(28/5/2019)
    loadDataToForm(checkDuplicate) {
        let documentId = $('.middle-content_table-data .table-row.choose-background').data("DocumentID");
        common.callAjaxToServer("GET", "/fund/" + documentId, null, function (response) {
            if (response) {
                $('#formDetail input[fieldName]').each(function () {
                    let fieldName = $(this).attr("fieldName");
                    let dataType = $(this).attr("dataType");
                    if (dataType === "date") {
                        //var value = response[fieldName];
                        var value = new Date(response.Data[fieldName]).toLocaleDateString('en-GB');
                        $(this).val(value);
                    } else if (dataType === "number") {
                        let res = response.Data[fieldName].formatNumber();
                        $(this).val(res);
                        $('.formDetail_table-detail-data .detail-total-money-row_second-column span').text(res);
                    }
                    else {
                        $(this).val(response.Data[fieldName]);
                    }
                });
                if (checkDuplicate) {
                    fund.checkCollectOrPayForm("Nhân bản");
                    $('#formDetail input[fieldName="DocumentDate"]').val(new Date().toLocaleDateString('en-GB'));
                }
            } else {
                alert("fail");
            }
        });
    }

    //Lấy tổng số trang
    //Tạo bởi: NBDUONG(22/6/2019)
    getTotalPages() {
        let pageSize = $("#pagination").val();
        let url = "/fund/documents/GetTotalPages?pageSize=" + pageSize;
        // Thực hiện lấy tổng số trang
        common.callAjaxToServer("Post", url, null, function (result) {
            thisFund.totalPages = result.Data;
            if (parseInt($('.indexPageFund').val()) > result.Data) {
                $('.indexPageFund').val(result.Data);
            }
            $(".totalPages").text(result.Data);
            thisFund.setDisableButtonPaging();
        });
    }

    //Lấy tổng số bản ghi
    //Tạo bởi: NBDUONG(22/6/2019)
    getTotalRows() {
        common.callAjaxToServer("POST", "/fund/documents/GetTotalDocuments", null, function (result) {
            $(".totalDocuments").text(result.Data);
            let pageIndex = $('.indexPageFund').val();
            let optionVal = $('#pagination').val();
            let firstRowIndex = (pageIndex - 1) * optionVal + 1;
            let lastRowIndex = pageIndex * optionVal;
            if (pageIndex === $('.totalPages').text()) {
                lastRowIndex = $('.totalDocuments').text();
            }
            $('.first-rowFund').text(firstRowIndex);
            $('.last-rowFund').text(lastRowIndex);
        });
    }

    // Lấy url chi tiết cho phân trang
    // Tạo bởi: NBDUONG (22/6/2019)
    getUrlDetailPagination() {
        let pageNumber = $(".indexPageFund").val();
        let pageSize = $("#pagination").val();
        let url = "/fund/documents/" + pageNumber + "/" + pageSize;
        return url;
    } 

  
    //Hàm bắt sự kiện các nút để thực hiện phân trang
    //Tạo bởi: NBDUONG(22/6/2019)
    setAllEventPaging() {
        // Khi bấm vào tải lại thì sẽ tải lại toàn bộ hóa đơn
        $('.reload-pageFund').click(thisFund.refreshDocument);

        // Khi bấm vào trang đầu
        $(".back-to-first-pageFund").click(function () {
            $(".indexPageFund").val(1);
            fund.getDataFundFromServer();
        });
        // Khi bấm vào trang trước đó
        $(".back-pageFund").click(function () {
            let index = $(".indexPageFund").val();
            if (index > 1) {
                $(".indexPageFund").val(--index);
                fund.getDataFundFromServer();
            }
        });
        // Khi bấm vào trang kế tiếp
        $(".next-pageFund").click(function () {
            let index = $(".indexPageFund").val();
            if (index < fund.totalPages) {
                $(".indexPageFund").val(++index);
                fund.getDataFundFromServer();
            }
        });
        // Khi bấm vào trang cuối
        $(".forward-to-last-pageFund").click(function () {
            $(".indexPageFund").val(fund.totalPages);
            fund.getDataFundFromServer();
        });
        // Khi thay đổi số bản ghi một trang
        $("#pagination").change(function () {
            fund.getDataFundFromServer();
        });
        // Khi blur kiểm tra điều kiện cho số trang hiện tại
        $(".indexPageFund").blur(function () {
            let value = $(this).val();
            if (isNaN(value) || value < 1 || value > fund.totalPages) {
                $(this).val(1);
            } 
            fund.getDataFundFromServer();
        });
    }

    //Disable các nút khi thực hiện phân trang
    //Tạo bởi: NBDUONG(
    setDisableButtonPaging() {
        let index = $('.indexPageFund').val();
        $('.disable-buttonPaging').removeClass("disable-buttonPaging");
        if (index == 1 && thisFund.totalPages == 1) {
            $('.back-to-first-pageFund, .back-pageFund, .next-pageFund, .forward-to-last-pageFund').addClass("disable-buttonPaging");
        } else if (index == thisFund.totalPages) {
            $('.next-pageFund, .forward-to-last-pageFund').addClass("disable-buttonPaging");
        } else if (index == 1) {
            $('.back-to-first-pageFund, .back-pageFund').addClass("disable-buttonPaging");
        }
    }

    // Hàm thiết lập disable các button khi filter
    // Tạo bởi: NBDUONG(24/6/2019)
    setDisableButtonPagingOnFilter(totalRow) {
        $(".totalDocuments").text(totalRow);
        $(".last-rowFund").text(totalRow);
        if (totalRow > 0) {
            $(".first-rowFund").text(1);
        } else {
            $(".first-rowFund").text(0);
        }
        $(".indexPageFund").val(1);
        $(".totalPages").text(1);
        $(".back-to-first-pageFund, .back-pageFund, .next-pageFund, .forward-to-last-pageFund").addClass("disable-buttonPaging");
    }

    //Hàm kiểm tra trùng mã chứng từ
    //Tạo bởi: NBDUONG(24/6/2019)
    checkDuplicateDocumentCode(isEdit, documentCode, id) {
        var check = false;
        var url = "/fund/document/GetByDocumentCode?documentCode=" + documentCode;
        $.ajax({
            method: "Post",
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (document) {
                if (document.Data.DocumentCode !== null) {
                    if (documentCode !== document.Data.DocumentCode === null && !isEdit) {
                        check = true;
                    } else if (isEdit && document.Data.DocumentID === id && documentCode === document.Data.DocumentCode) {
                        check = true;
                    } else if (isEdit && document.Data.DocumentID !== id && documentCode !== document.Data.DocumentCode) {
                        check = true;
                    }
                } else {
                    check = true;
                }
            }
        });
        return check;
    }

    //Hàm lấy mã phiếu thu sinh tự động
    //Tạo bởi: NBDUONG(25/6/2019)
    getAutoDocumentCollectCode() {
        common.callAjaxToServer("GET", "/fund/document/getAutoCollectCode", null, function (result) {
            $('#formDetail input[fieldName="DocumentCode"]').val(result.Data);
        });
    }

    //Hàm lấy mã phiếu thu sinh tự động
    //Tạo bởi: NBDUONG(25/6/2019)
    getAutoDocumentPayCode() {
        common.callAjaxToServer("GET", "/fund/document/getAutoPayCode", null, function (result) {
            $('#formDetail input[fieldName="DocumentCode"]').val(result.Data);
        });
    }
}

//Đối tượng khởi tạo để lấy tổng số bản ghi
//Tạo bởi: NBDUONG (22/6/2019)
var thisFund;

// 1 đối tượng khởi tạo của lớp Fund
//Tạo bởi: NBDUONG (2/5/2019)
var fund = new Fund();

