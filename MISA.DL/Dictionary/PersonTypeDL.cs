using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Hàm xử lý thao tác với dữ liệu về loại đối tượng
    /// Kế thừa lớp BaseDL xử lý nghiệp vụ tổng quát
    /// </summary>
    /// Tạo bởi: NBDUONG(19/6/2019)
    public class PersonTypeDL : BaseDL<PersonType>
    {
        /// <summary>
        /// Hàm lấy dữ liệu tất cả loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<PersonType> GetAllPersonTypes()
        {
            return GetAll("Proc_GetAllData", "PersonType");
        }

        /// <summary>
        /// Hàm lấy dữ liệu loại đối tượng theo Id
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public PersonType GetPersonTypeByID(string personTypeID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "PersonType", "PersonTypeID", personTypeID);
        }

        /// <summary>
        /// Hàm tạo mới loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int CreatePersonType(PersonType personType)
        {
            return SaveEntity("Proc_CreatePersonType", personType);
        }

        /// <summary>
        /// Hàm thay đổi thông tin loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int UpdatePersonType(PersonType personType)
        {
            return SaveEntity("Proc_UpdatePersonType", personType);
        }

        /// <summary>
        /// Hàm xóa loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int DeletePersonType(string personTypeID)
        {
            return DeleteEntity("Proc_DeleteData", "PersonType", "PersonTypeID", personTypeID);
        }
    }
}
