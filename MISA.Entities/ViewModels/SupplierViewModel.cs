using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    /// <summary>
    /// Lớp dùng để lấy dữ liệu của nhà cung cấp
    /// </summary>
    /// Người tạo: ntxuan (13/5/2019)
    public class SupplierViewModel
    {
        #region Properties
        // Id nhà cung cấp
        public Guid SupplierID { get; set; }
        // Mã nhà cung cấp
        public string SupplierCode { get; set; }
        // Tên nhà cung cấp
        public string SupplierName { get; set; }
        // Địa chỉ nhà cung cấp
        public string Address { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo khi tạo mới đối tượng
        /// </summary>
        /// Người tạo: ntxuan (13/5/2019)
        public SupplierViewModel()
        {
            SupplierID = Guid.NewGuid();
        }
        #endregion
    }
}