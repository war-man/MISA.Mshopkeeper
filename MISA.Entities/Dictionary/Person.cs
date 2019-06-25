using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    //Lớp đối tượng (khách hàng, nhân viên,...)
    //Tạo bởi: NBDUONG (15/5/2019)
    public class Person : BaseEntity
    {
        #region Properties
        //Id
        public Guid PersonID { get; set; }
        //Mã đối tượng
        [Required]
        [MaxLength(20)]
        public string PersonCode { get; set; }
        //Tên đối tượng
        [Required]
        [MaxLength(100)]
        public string PersonName { get; set; }
        //Địa chỉ
        [MaxLength(255)]
        public string Address { get; set; }
        #endregion

        #region ForeignKeys
        //Khóa ngoại tới bảng loại đối tượng
        [Required]
        public Guid PersonTypeID { get; set; }
        #endregion

        #region Constructors
        //Hàm khởi tạo
        public Person()
        {
            PersonID = Guid.NewGuid();
        }
        #endregion
    }
}