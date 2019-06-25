using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    /// <summary>
    /// Lớp lấy dữ liệu của hóa đơn để hiển thị xuống giao diện
    /// </summary>
    /// Người tạo: ntxuan (13/5/2019)
    public class InvoiceViewModel
    {
        #region Properties
        // ID của phiếu
        public Guid InvoiceID { get; set; }
        // Số phiếu nhập
        public string ImportNumber { get; set; }
        // Số phiếu chi
        public string ExpenditureNumber { get; set; }
        // Diễn giải
        public string Explanation { get; set; }
        // Ngày nhập
        public DateTime ImportDate { get; set; }
        // Ngày hóa đơn
        public DateTime InvoiceDate { get; set; }
        // Giờ nhập
        public string ImportTime { get; set; }
        // Tên nhà cung cấp
        public string SupplierName { get; set; }
        // Mã nhà cung cấp
        public string SupplierCode { get; set; }
        // Tên nhân viên
        public string EmployeeName { get; set; }
        // Mã nhân viên
        public string EmployeeCode { get; set; }
        // Thành tiền
        public decimal Money { get; set; }
        // Loại hóa đơn
        public int TypeInvoice { get; set; }
        // Người giao
        public string Deliver { get; set; }
        // Người nhận
        public string Receiver { get; set; }
        // Lý do chi
        public string ReasonExpenditure { get; set; }
        // Mã số thuế
        public string TaxCode { get; set; }
        // Số hóa đơn
        public string InvoiceNumber { get; set; }
        // Địa chỉ
        public string Address { get; set; }
        #endregion

        #region ForeignKeys
        // KHóa ngoại tới bảng nhà cung cấp
        public Guid SupplierID { get; set; }
        // Khóa ngoại tới bảng nhân viên
        public Guid EmployeeID { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo mặc định khi tạo đối tượng
        /// </summary>
        /// Người tạo: ntxuan (17/5/2019)
        public InvoiceViewModel()
        {
            InvoiceID = Guid.NewGuid();
        }
        #endregion
    }
}