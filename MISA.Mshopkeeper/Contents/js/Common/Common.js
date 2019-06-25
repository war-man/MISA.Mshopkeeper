

// Lớp chứa các hàm dùng chung
// người tạo: ntxuan (10/6/2019)
class Common {

    // Hàm khởi tạo mặc định
    // Người tạo: ntxuan(11/6/2019)
    constructor() {
        this.initEvent();
    }

    initEvent() {
        // Hàm để format cho số và tiền tệ
        // Người tạo: ntxuan (13/5/2019)
        Number.prototype.formatNumber = function () {
            return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        };

        // Lấy giờ hiện tại
        // Người tạo:ntxuan (13/5/2019)
        Date.prototype.getDateFormat = function () {
            var formatted = this.getHours() + ":" + (this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes());
            this.getHours() > 12 ? formatted += " PM" : formatted += " AM";
            return formatted;
        };

        // Lấy giờ hiện tại dạng 07:23:34
        // Người tạo: ntxuan (24/5/2019)
        Date.prototype.getFullTimeCurrent = function () {
            let formatted = (this.getHours() < 10 ? "0" + this.getHours() : this.getHours()) +
                ":" + (this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes()) +
                ":" + (this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds());
            return " " + formatted;
        };

        // Lấy ngày hiện tại
        // Người tạo:ntxuan (13/5/2019)
        Date.prototype.getDateCurrent = function () {
            var dateTimeNow = (this.getDate() < 10 ? "0" + this.getDate() : this.getDate()) + "/"
                + ((this.getMonth() + 1) < 10 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1)) + "/"
                + this.getFullYear();
            return dateTimeNow;
        };

        // Chuyển từ chuỗi sang số
        // Người tạo: ntxuan (29/5/2019)
        String.prototype.formatToNumber = function () {
            var target = this;
            target = target.replace(new RegExp('\\.', 'g'), '');
            return parseInt(target);
        };

        // Thêm hàm hasScrollBar cho jquery
        // Người tạo: ntxuan (5/6/2019)
        jQuery.fn.hasScrollBar = function (direction) {
            if (direction === 'vertical') {
                return this.get(0).scrollHeight > this.innerHeight();
            }
            else if (direction === 'horizontal') {
                return this.get(0).scrollWidth > this.innerWidth();
            }
            return false;
        };

    }

        /*
        * NVGIAP 16/5/19
        * Đặt giá trị cho datimepicker theo các khoảng thời gian
        */
    changeDateTimeByCase(val, dtpElementStart, dtpElementEnd) {
        var datetime = new Date();
        var startDate;
        var endDate;
        switch (val) {
            //set thời gian cho hôm nay
            case '1':
                startDate = datetime;
                endDate = datetime;
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //hôm qua
            case '2':
                startDate = new Date(datetime.setDate(datetime.getDate() - 1));
                endDate = startDate;
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //tuần này
            case '3':
                startDate = new Date(datetime.setDate(datetime.getDate() - datetime.getDay()));
                endDate = new Date();
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //tuần trước
            case '4':
                startDate = new Date(datetime.setDate(datetime.getDate() - 7 - datetime.getDay()));
                endDate = new Date(new Date().setDate(startDate.getDate() + 6));
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //tháng này
            case '5':
                startDate = new Date(datetime.setDate(1));
                endDate = new Date();
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //tháng trước
            case '6':
                startDate = new Date(datetime.setMonth(datetime.getMonth() - 1));
                startDate.setDate(1);
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //quý này
            case '7':
                //var startMonth = parseInt(datetime.getMonth() % 3) * 3;
                startDate = new Date(datetime.setMonth(datetime.getMonth() - parseInt(datetime.getMonth() % 3)));
                startDate.setDate(1);
                endDate = new Date();
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //quý trước
            case '8':
                startMonth = (parseInt(datetime.getMonth() / 3) - 1) * 3;
                startDate = new Date(datetime.setMonth(datetime.getMonth() - 3 - parseInt(datetime.getMonth() % 3)));
                startDate.setDate(1);
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //6 tháng trước
            case '9':
                startDate = new Date(datetime.setMonth(datetime.getMonth() - 6));
                startDate.setDate(1);
                datetime = new Date();
                endDate = new Date(datetime.setMonth(datetime.getMonth()));
                endDate.setDate(0);
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //năm nay
            case '10':
                startDate = new Date(datetime.getFullYear(), 0, 1);
                endDate = new Date();
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //năm trước
            case '11':
                startDate = new Date(datetime.getFullYear() - 1, 0, 1);
                endDate = new Date(datetime.getFullYear() - 1, 12, 0);
                $(dtpElementStart).datepicker("setDate", startDate);
                $(dtpElementEnd).datepicker("setDate", endDate);
                break;
            //khác
            case '12':
                break;
        }
    }

    // Hàm ajax dùng chung cho các loại ajax
    // Người tạo: ntxuan (10/5/2016)
    callAjaxToServer(method, url, data, functionSuccess) {
        $.ajax({
            method: method,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: functionSuccess
        });
    }

    // Hàm chuyển từ chuỗi ngày tháng dưới client sang chuỗi trên server
    // Người tạo: ntxuan (11/6/219)
    convertStringJSToStringCsharp(datePicker) {
        let dateObject = $(datePicker).datepicker("getDate");
        let dateString = $.datepicker.formatDate("yy-mm-dd", dateObject);
        let dateCurrent = new Date();
        let fullDateString = dateString + dateCurrent.getFullTimeCurrent();
        return fullDateString;
    }

    // Hàm định dạng họ tên
    // Người tạo: ntxuan (24/6/2019)
    formatName(name) {
     let   dname = name;
     let nameArrray = dname.split(' ');
     dname = "";
        for (let i = 0; i < nameArrray.length; i++)
            if (nameArrray[i].length > 0) {
            if (dname.length > 0) dname = dname + " ";
            dname = dname + nameArrray[i].substring(0, 1).toUpperCase();
            dname = dname + nameArrray[i].substring(1).toLowerCase();
        }
    return dname;
}

}

