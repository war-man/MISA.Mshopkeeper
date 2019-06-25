using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    public class PersonViewModel
    {
        #region Properties
        //Id
        public Guid PersonID { get; set; }
        //Mã đối tượng
        public string PersonCode { get; set; }
        //Tên đối tượng
        public string PersonName { get; set; }
        //Địa chỉ
        public string Address { get; set; }
        //Loại đối tượng
        public string PersonType { get; set; }
        #endregion

        #region Constructors
        //Hàm khởi tạo
        public PersonViewModel()
        {
            PersonID = Guid.NewGuid();
        }
        #endregion
    }
}