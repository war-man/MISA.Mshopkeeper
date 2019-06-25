using MISA.Commons;
using MISA.DL;
using MISA.DL.Dictionary;
using MISA.Entities;
using MISA.Mshopkeeper.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    /// <summary>
    /// Lớp thao tác nghiệp vụ cho Loại đối tượng
    /// </summary>
    /// Người tạo: NBDUONG (20/6/2019)
    public class PersonTypeBL : BaseBL
    {
        private PersonTypeDL personTypeDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: NBDUONG (20/6/2019)
        public PersonTypeBL()
        {
            personTypeDL = new PersonTypeDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Loại đối tượng
        /// </summary>
        /// <returns>Danh sách Loại đối tượng</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public List<PersonType> GetAllPersonType()
        {
            return personTypeDL.GetAllPersonTypes();
        }

        /// <summary>
        /// Hàm lấy Loại đối tượng theo id
        /// </summary>
        /// <param name="personTypeID">Id của Loại đối tượng</param>
        /// <returns>Loại đối tượng</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public PersonType GetPersonTypeByID(Guid personTypeID)
        {
            var personTypeId = Common.ConvertToNvarchar(personTypeID);
            return personTypeDL.GetPersonTypeByID(personTypeId);
        }

        /// <summary>
        /// Hàm thêm mới Loại đối tượng
        /// </summary>
        /// <param name="personType">Loại đối tượng</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int CreatePersonType(PersonType personType)
        {
            return personTypeDL.CreatePersonType(personType);
        }

        /// <summary>
        /// Hàm cập nhật Loại đối tượng
        /// </summary>
        /// <param name="personType">Loại đối tượng</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int UpdatePersonType(PersonType personType)
        {
            return personTypeDL.UpdatePersonType(personType);
        }

        /// <summary>
        /// Hàm xóa Loại đối tượng
        /// </summary>
        /// <param name="personTypeID">Id Loại đối tượng</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int DeletePersonType(Guid personTypeID)
        {
            var personTypeId = Common.ConvertToNvarchar(personTypeID);
            return personTypeDL.DeletePersonType(personTypeId);
        }
    }
}
