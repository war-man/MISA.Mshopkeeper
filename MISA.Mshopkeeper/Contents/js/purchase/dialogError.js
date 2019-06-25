
// Dialog hiển thị lỗi
// Người tạo: ntxuan(8/5/2019)
class DialogError {
    constructor() {
        this.Dialog = $(".dialog-error").dialog({
            resizable: false,
            height: 150,
            width: 400,
            modal: true,
            title:"Mshopkeeper",
            autoOpen: false,
            buttons: [
                {
                    html: "Đồng ý",
                    class: "dialog-accept dialog-btnError",
                    click: this.closeDialog
                },
                {
                    html: "<i class='far fa-trash-alt'></i> Xóa",
                    class: "dialog-deleteAccept dialog-btnError",
                    click: function () {
                        dialogError.closeDialog();
                        purchaseFormDialog.closePurchaseForm();
                        purchase.deleteInvoice();
                    }
                },
                {
                    html: "<i class='fas fa-save'></i> Lưu",
                    class: "dialog-Save dialog-btnError",
                    click: function () {
                        dialogError.closeDialog();
                        purchaseFormDialog.btnSaveInvoice();
                    }
                },
                {
                    html: "<i class='not-save'></i>Không lưu",
                    class: "dialog-UnSave dialog-btnError",
                    click: function () {
                        dialogError.closeDialog();
                        purchaseFormDialog.closePurchaseForm();
                    }
                },
                {
                    html: "<i class='fas fa-times'></i> Hủy bỏ",
                    class: "dialog-cancel dialog-btnError",
                    click: this.closeDialog
                }
            ]
        });
    }

    // Hàm dùng để truyền class icon cho dialog
    // Người tạo: ntxuan(20/5/2019
    setClassIconError(className) {
        $(".dialog-error .icon-errors").addClass(className);
    }

    //Hàm truyền thông báo lỗi vào dialog để hiển thị
    // Người tạo: NTXUAN (8/5/2019)
    setMessageError(message) {
        $(".dialog-error .message-error").html(message);
    }

    // Hàm dùng để mở dialog
    // Người tạo: NTXUAN (8/5/2019)
    openDialog() {
        dialogError.Dialog.dialog("open");
    }

    // Hàm dùng để đóng dialog
    // Người tạo: NTXUAN (8/5/2019)
    closeDialog() {
        dialogError.Dialog.dialog("close");
    }
}

// Khởi tạo một đối tượng mới dialog
var dialogError = new DialogError();