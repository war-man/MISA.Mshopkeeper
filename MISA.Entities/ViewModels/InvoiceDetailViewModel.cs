using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    /// <summary>
    /// Lớp hiển lấy dữ liệu chi tiết của một sản phẩm để hiển thị xuống client
    /// </summary>
    /// Người tạo: ntxuan (13/5/2019)
    public class InvoiceDetailViewModel
    {
        #region Properties
        // Mã hóa đơn chi tiết
        public Guid InvoiceDetailID { get; set; }
        // Tên sản phẩm
        public string ProductName { get; set; }
        // Mã SKU
        public string SKU { get; set; }
        // Đơn vị tính
        public string Unit { get; set; }
        // Kho
        public string Storage { get; set; }
        // Đơn giá
        public decimal UnitPrice { get; set; }
        // %CK
        public decimal DiscountPercentage { get; set; }
        // Thuế suất
        public decimal TaxPercentage { get; set; }
        // Số lượng hàng hóa
        public decimal Quantity { get; set; }
        // Thành tiền
        public double Money { get; set; }
        // Tiền CK
        public double DiscountMoney { get; set; }
        // Tiền Thuế
        public double TaxMoney { get; set; }
        // Tiền Thanh toán
        public double PaidMoney { get; set; }
        #endregion

        #region ForeignKeys
        // Mã hóa đơn ( khóa ngoại)
        public Guid InvoiceID { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (28/5/2019)
        public InvoiceDetailViewModel()
        {
            InvoiceDetailID = Guid.NewGuid();
        }
        #endregion
    }
}