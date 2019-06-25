//Class Dialog để xây dựng các dialog
// Tạo bởi: NBDUONG (2/5/2019)
var context;
class Dialog {
    // Hàm khởi tạo cho đối tượng Dialog
    // Bao gồm các tham số truyền vào: element, width, height, scope, buttons
    // Tạo bởi: NBDUONG (2/5/2019)
    constructor(element, width, height, scope, buttons) {
        context = this;
        this.dialog = this.createDialog(element, width, height, scope, buttons);
        $('.ui-dialog-title').css('color', 'black').css('font-size', '13pt').css('font-weight', 'bold');
        this.setValueTimeDefault();
        this.closeDialogByButton();
    }

    //Tạo mới Dialog
    //Tạo bởi: NBDUONG (2/5/2019)
    createDialog(element, width, height, scope, buttons) {
        var dialog;
        dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
            dialogClass: 'new-dialog',
            buttons: buttons
        });
        return dialog;
    }

    // Mở 1 dialog
    // Tạo bởi: NBDUONG (2/5/2019)
    openDialog() {
        this.dialog.dialog('open');
        this.setValueTimeDefault();
        $('.exclamation').hide();
        if ($('input').parent().hasClass('border-red')) {
            $('input').parent().removeClass('border-red');
        }
        $('.formDetail_table-detail-data').show();
        $('.formDetail_table-document-data').hide();
        $('.formDetail_intro-detail').css('border-bottom', '2px solid #026b97').css('color', '#026b97');
        $('.formDetail_intro-document').css('border-bottom', 'none').css('color', '#757575');   
    }

    // Đóng 1 dialog
    // Tạo bởi: NBDUONG (2/5/2019)
    closeDialog() {
        this.dialog.dialog('close');
        $('#formDetail input').removeClass('border-red');
        this.dialog.removeAttr('class');
        this.dialog.addClass('ui-dialog-content');
        this.dialog.addClass('ui-widget-content');
    }

    //Đóng dialog bằng nút X phía trên góc
    //Tạo bởi: NBDUONG(19/5/2019)
    closeDialogByButton() {
        $('button.ui-dialog-titlebar-close').on('click', function () {
            $('#formDetail').removeAttr('class');
            $('#formDetail').addClass('ui-dialog-content');
            $('#formDetail').addClass('ui-widget-content');
            $('#alertDialog').removeAttr('class');
            $('#alertDialog').addClass('ui-dialog-content');
            $('#alertDialog').addClass('ui-widget-content');
        });
    }

    //Thay đổi nội dung text trong form thông báo
    //Tạo bởi: NBDUONG(19/5/2019)
    changeContentAlertMessage(content) {
        $('.alertDialog-text').text(content);
    }

    //Thay đổi nội dung icon trong form thông báo
    //Tạo bởi: NBDUONG(19/5/2019)
    changeIconAlertMessage(className) {
        $('.alertDialog-icon').addClass(className);
    }

    // Đặt ngày mặc định là ngày hiện tại trong các form
    // Tạo bởi: NBDUONG (6/5/2019)
    setValueTimeDefault() {
        var now = new Date(Date.now());
        // Giờ hiện tại
        var timeCurrent = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes());
        // Ngày hiện tại
        var dateTimeNow = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate()) + "/"
            + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + "/"
            + now.getFullYear();
        $(".input-calendar-icon").prev().val(timeCurrent).attr("data-previous", timeCurrent);
        $(".select-date-pay").val(dateTimeNow);
        // Lưu giá trị gần nhất để sau này sử dụng
        $(".select-date-pay").attr("data-previous", dateTimeNow);
    }
}

var common = new Common();
