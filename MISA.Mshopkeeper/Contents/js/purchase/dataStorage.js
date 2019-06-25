
// Lớp dùng để lưu các biến dùng chung
// Người tạo: ntxuan (23/6/2019)
class DataStorage {
    constructor() {
        // Biến kiểm tra đang thu gọn hay mở rộng
        this.coslap = true;
        // Biến cho phép sử dụng phím tắt trong form
        this.allowHotKeyForm = false;
        // Biến cho phép sử dụng phím tắt trong grid
        this.allowHotKeyGrid = true;
        // Biến lưu trạng thái là sửa hay thêm mới để xử lý button lưu
        this.checkEditForm = false;
        // Biến lưu trạng thái là xem hay không để xử lý nút tắt form
        this.checkViewForm = false;
        // Biến lưu tổng số trang
        this.totalPages = 1;
        // Biến lưu một mảng mã nhà cung cấp
        this.supplierCodes = [];
        // Biến lưu một mảng tên nhà cung cấp
        this.supplierNames = [];
        // Biến lưu một mảng mã nhân viên
        this.employeeCodes = [];
        // Biến lưu một mảng mã nhân viên
        this.employeeNames = [];
        // Biến lưu một mảng mã SKU của hàng hóa
        this.listSKU = [];
    }
}

// Khởi tạo một biến lưu các dữ liệu
var dataStorage = new DataStorage();