using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp quản lý thông tin của các phiếu
    /// </summary>
    /// Người tạo : ntxuan(10/5/2019)
    public class Invoice : BaseEntity
    {
        #region Properties
        // ID của phiếu
        public Guid InvoiceID { get; set; }
        // Số phiếu nhập
        [Required]
        [MaxLength(20)]
        public string ImportNumber { get; set; }
        // Số phiếu chi
        [Required]
        [MaxLength(20)]
        public string ExpenditureNumber { get; set; }
        // Diễn giải
        [MaxLength(255)]
        public string Explanation { get; set; }
        // Ngày nhập
        [Required]
        public DateTime ImportDate { get; set; }
        // Giờ nhập
        [Required]
        [MaxLength(20)]
        public string ImportTime { get; set; }
        // Loại hóa đơn
        [Required]
        public int TypeInvoice { get; set; }
        // Địa chỉ
        [MaxLength(255)]
        public string Address { get; set; }
        // Người giao
        [MaxLength(100)]
        public string Deliver { get; set; }
        // Người nhận
        [MaxLength(100)]
        public string Receiver { get; set; }
        // Lý do chi
        [MaxLength(255)]
        public string ReasonExpenditure { get; set; }
        // Mã số thuế
        [Required]
        [MaxLength(20)]
        public string TaxCode { get; set; }
        // Số hóa đơn
        [Required]
        [MaxLength(20)]
        public string InvoiceNumber { get; set; }
        // Ngày hóa đơn
        [Required]
        public DateTime InvoiceDate { get; set; }
        #endregion

        #region ForeignKeys
        // KHóa ngoại tới bảng nhà cung cấp
        public Guid SupplierID { get; set; }
        // Khóa ngoại tới bảng nhân viên
        public Guid EmployeeID { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khỏi tạo mặc định khi khởi tạo đối tượng mới
        /// </summary>
        /// Người tạo: ntxuan(11/5/2019)
        public Invoice()
        {
            InvoiceID = Guid.NewGuid();
        }
        #endregion
    }
}