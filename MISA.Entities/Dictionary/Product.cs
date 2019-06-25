using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Bảng chứa thông tin của sản phẩm
    /// </summary>
    /// Người tạo: ntxuan(10/5/2019)
    public class Product : BaseEntity
    {
        #region Properties
        // Id của sản phẩm
        public Guid ProductID { get; set; }
        // Tên sản phẩm
        [Required]
        [MaxLength(255)]
        public string ProductName { get; set; }
        // Mã SKU
        [Required]
        [MaxLength(20)]
        public string SKU { get; set; }
        // Đơn vị tính
        [Required]
        [MaxLength(255)]
        public string Unit { get; set; }
        // Kho
        [MaxLength(255)]
        public string Storage { get; set; }
        // Đơn giá
        [Required]
        public decimal UnitPrice { get; set; }
        // Mã vạch
        public string Barcode { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khỏi tạo mặc định khi tao đối tượng mới
        /// </summary>
        /// Người tạo: ntxuan(11/5/2019)
        public Product()
        {
            ProductID = Guid.NewGuid();
        }
        #endregion
    }
}