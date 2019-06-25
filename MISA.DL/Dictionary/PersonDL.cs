using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Hàm xử lý thao tác với dữ liệu về đối tượng
    /// Kế thừa lớp BaseDL xử lý nghiệp vụ tổng quát
    /// </summary>
    /// Tạo bởi: NBDUONG(19/6/2019)
    public class PersonDL : BaseDL<Person>
    {
        /// <summary>
        /// Hàm lấy dữ liệu tất cả đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<Person> GetAllPeople()
        {
            return GetAll("Proc_GetAllData", "Person");
        }

        /// <summary>
        /// Hàm lấy dữ liệu đối tượng theo ID
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public Person GetPersonByID(string personID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Person", "PersonID", personID);
        }

        /// <summary>
        /// Hàm lấy dữ liệu đối tượng theo loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<Person> GetListPeopleByPersonType(string Id)
        {
            return GetAllByAttribute("Proc_GetAllDataByAttribute", "Person", "PersonTypeID", Id);
        }

        /// <summary>
        /// Hàm tạo mới đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int CreatePerson(Person person)
        {
            return SaveEntity("Proc_CreatePerson", person);
        }

        /// <summary>
        /// Hàm thay đổi thông tin đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int UpdatePerson(Person person)
        {
            return SaveEntity("Proc_UpdatePerson", person);
        }

        /// <summary>
        /// Hàm xóa đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int DeletePerson(string personID)
        {
            return DeleteEntity("Proc_DeleteData", "Person", "PersonID", personID);
        }
    }
}
