using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp đại diện cho bảng nhà cung cấp
    /// </summary>
    /// Người tạo: ntxuan(10/5/2019)
    public class Supplier : BaseEntity
    {
        #region Properties
        public Guid SupplierID { get; set; }
        // Mã nhà cung cấp
        [Required]
        [MaxLength(20)]
        public string SupplierCode { get; set; }
        // Tên nhà cung cấp
        [Required]
        [MaxLength(255)]
        public string SupplierName { get; set; }
        // Địa chỉ
        [MaxLength(255)]
        public string Address { get; set; }
        // Mã số thuế
        [Required]
        [MaxLength(25)]
        public string TaxNumber { get; set; }
        // Số điện thoại
        [MaxLength(50)]
        public string PhoneNumber { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo mặc đinh khi tạo đối tượng
        /// </summary>
        /// Người tạo: ntxuan(11/5/2019)
        public Supplier()
        {
            SupplierID = Guid.NewGuid();
        }
        #endregion
    }
}