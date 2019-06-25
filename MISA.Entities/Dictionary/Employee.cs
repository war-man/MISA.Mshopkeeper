using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp nhân viên
    /// </summary>
    /// Người tạo: ntxuan (10/5/2019)
    public class Employee : BaseEntity
    {
        #region Properties
        // id nhân viên
        public Guid EmployeeID { get; set; }
        // Tên nhân viên
        [Required]
        [MaxLength(100)]
        public string EmployeeName { get; set; }
        // Mã nhân viên
        [Required]
        [MaxLength(20)]
        public string EmployeeCode { get; set; }
        // Địa chỉ
        [MaxLength(255)]
        public string Address { get; set; }
        // Số điện thoại
        [Required]
        [MaxLength(50)]
        public string PhoneNumber { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khỏi tạo mặc định khi tạo đối tượng
        /// </summary>
        /// Người tạo: ntxuan(11/5/2019)
        public Employee()
        {
            EmployeeID = Guid.NewGuid();
        }
        #endregion
    }
}