using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    /// <summary>
    /// Lớp dùng để lấy dữ liệu của nhà cung cấp
    /// </summary>
    /// Người tạo: ntxuan (13/5/2019)
    public class EmployeeViewModel
    {
        #region Properties
        // id nhân viên
        public Guid EmployeeID { get; set; }
        // Tên nhân viên
        public string EmployeeName { get; set; }
        // Mã nhân viên
        public string EmployeeCode { get; set; }
        // Địa chỉ
        public string Address { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (13/5/2019)
        public EmployeeViewModel()
        {
            EmployeeID = Guid.NewGuid();
        }
        #endregion
    }
}