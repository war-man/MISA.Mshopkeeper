using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp đại diện cho bảng chi tiết phiếu 
    /// </summary>
    /// Người tạo: ntxuan(10/5/2019)
    public class InvoiceDetail : BaseEntity
    {
        #region Properties
        // Mã hóa đơn chi tiết
        public Guid InvoiceDetailID { get; set; }
        // Tên sản phẩm
        [Required]
        [MaxLength(255)]
        public string ProductName { get; set; }
        // Mã SKU
        [MaxLength(20)]
        public string SKU { get; set; }
        // Đơn vị tính
        [Required]
        [MaxLength(100)]
        public string Unit { get; set; }
        // Kho
        [MaxLength(255)]
        public string Storage { get; set; }
        // Đơn giá
        public decimal UnitPrice { get; set; }
        // %CK
        [Required]
        public decimal DiscountPercentage { get; set; }
        // Thuế suất
        public decimal TaxPercentage { get; set; }
        // Số lượng hàng hóa
        public decimal Quantity { get; set; }
        // Mã vạch
        [MaxLength(20)]
        public string BarCode { get; set; }
        #endregion

        #region ForeignKeys
        // Mã hóa đơn ( khóa ngoại)
        public Guid InvoiceID { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khỏi tạo mặc định khi tao đối tượng mới
        /// </summary>
        /// Người tạo: ntxuan(11/5/2019)
        public InvoiceDetail()
        {
            InvoiceDetailID = Guid.NewGuid();
        }
        #endregion
    }
}