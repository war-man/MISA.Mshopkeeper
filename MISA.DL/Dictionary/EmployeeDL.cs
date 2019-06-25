using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    /// <summary>
    /// Lớp dùng để thao tác với bảng Employee trong csdl
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class EmployeeDL : BaseDL<Employee>
    {
        /// <summary>
        /// Hàm dùng để lấy tất cả các nhân viên
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Employee> GetAllEmployee()
        {
            return GetAll("Proc_GetAllData", "Employee");
        }

        /// <summary>
        /// Hàm dùng để lấy nhân viên theo mã
        /// </summary>
        /// <param name="employeeID">Mã nhân viên</param>
        /// <returns>Nhân viên</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Employee GetEmployeeByID(string employeeID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Employee", "EmployeeID", employeeID);
        }

        /// <summary>
        /// Hàm dùng để thêm mới nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateEmployee(Employee employee)
        {
            return SaveEntity("Proc_CreateEmployee", employee);
        }

        /// <summary>
        /// Hàm dùng để cập nhật nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateEmployee(Employee employee)
        {
            return SaveEntity("Proc_UpdateEmployee", employee);
        }

        /// <summary>
        /// Hàm dùng để xóa nhân viên theo id
        /// </summary>
        /// <param name="employeeID">Id nhân viên</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteEmployee(string employeeID)
        {
            return DeleteEntity("Proc_DeleteData", "Employee", "EmployeeID", employeeID);
        }
    }
}
