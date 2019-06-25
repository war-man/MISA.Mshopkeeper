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
    /// Lớp thao tác nghiệp vụ cho Đối tượng
    /// </summary>
    /// Người tạo: NBDUONG (20/6/2019)
    public class PersonBL : BaseBL
    {
        private PersonDL personDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: NBDUONG (20/6/2019)
        public PersonBL()
        {
            personDL = new PersonDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Đối tượng
        /// </summary>
        /// <returns>Danh sách Đối tượng</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public List<PersonViewModel> GetAllPeople()
        {
            List<PersonViewModel> personVMs = new List<PersonViewModel>(); 
            foreach(var item in personDL.GetAllPeople())
            {
                var personVM = MapPersonToPersonViewModel(item);
                personVMs.Add(personVM);
            }
            return personVMs;
        }

        /// <summary>
        /// Hàm lấy Đối tượng theo id
        /// </summary>
        /// <param name="personID">Id của Đối tượng</param>
        /// <returns>Đối tượng</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public PersonViewModel GetPersonByID(Guid personID)
        {
            var personId = Common.ConvertToNvarchar(personID);
            var personVM = MapPersonToPersonViewModel(personDL.GetPersonByID(personId));
            return personVM;
        }

        /// <summary>
        /// Hàm thêm mới Đối tượng
        /// </summary>
        /// <param name="person">Đối tượng</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int CreatePerson(Person person)
        {
            return personDL.CreatePerson(person);
        }

        /// <summary>
        /// Hàm cập nhật Đối tượng
        /// </summary>
        /// <param name="person">Đối tượng</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int UpdatePerson(Person person)
        {
            return personDL.UpdatePerson(person);
        }

        /// <summary>
        /// Hàm xóa Đối tượng
        /// </summary>
        /// <param name="personID">Id Đối tượng</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int DeletePerson(Guid personID)
        {
            var personId = Common.ConvertToNvarchar(personID);
            return personDL.DeletePerson(personId);
        }

        /// <summary>
        /// Hàm dùng để ánh xạ từ lớp Person sang PersonViewModel
        /// </summary>
        /// <param name="person">Hóa đơn</param>
        /// <returns>PersonViewModel</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public PersonViewModel MapPersonToPersonViewModel(Person person)
        {
            var personTypeBL = new PersonTypeBL();
            var personViewModel = new PersonViewModel();
            personViewModel.PersonID = person.PersonID;
            personViewModel.PersonCode = person.PersonCode;
            personViewModel.PersonName = person.PersonName;
            personViewModel.Address = person.Address;
            personViewModel.PersonType = personTypeBL.GetPersonTypeByID(person.PersonTypeID).PersonTypeName;
            return personViewModel;
        }
    }
}
