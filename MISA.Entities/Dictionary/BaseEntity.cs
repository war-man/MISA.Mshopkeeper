using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Hàm tổng quát chứa các thuộc tính cần thiết cho các entities
    /// </summary>
    /// Người tạo: ntxuan (19/6/2019)
    public class BaseEntity
    {
        #region property
        // Người tạo
        [MaxLength(100)]
        public string CreatedBy { get; set; }
        // Ngày tạo
        public DateTime CreatedDate { get; set; }
        // Người sửa đổi
        [MaxLength(100)]
        public string ModifiedBy { get; set; }
        // Ngày sửa đổi
        public DateTime? ModifiedDate { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (19/6/2019)
        public BaseEntity()
        {
            CreatedDate = DateTime.Now;
        }

        #endregion
    }
}
