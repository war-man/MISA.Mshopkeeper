using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    //Lớp loại đối tượng
    //Tạo bởi: NBDUONG(15/5/2019)
    public class PersonType : BaseEntity
    {
        #region Properties
        //Id
        public Guid PersonTypeID { get; set; }
        //Tên loại
        [Required]
        [MaxLength(255)]
        public string PersonTypeName { get; set; }
        #endregion

        #region Constructors
        //Hàm khởi tạo
        public PersonType()
        {
            PersonTypeID = Guid.NewGuid();
        }
        #endregion
    }
}