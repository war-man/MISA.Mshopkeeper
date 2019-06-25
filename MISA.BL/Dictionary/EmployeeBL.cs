using MISA.Commons;
using MISA.DL;
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
    /// Lớp thao tác nghiệp vụ cho Nhân viên
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class EmployeeBL : BaseBL
    {
        private EmployeeDL employeeDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public EmployeeBL()
        {
            employeeDL = new EmployeeDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Nhân viên
        /// </summary>
        /// <returns>Danh sách Nhân viên</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Employee> GetAllEmployee()
        {
            return employeeDL.GetAllEmployee();
        }

        /// <summary>
        /// Hàm lấy tất cả employeeViewModel
        /// </summary>
        /// <returns>List employeeViewModel</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<EmployeeViewModel> GetAllEmployeeViewModel()
        {
            var employees = new List<EmployeeViewModel>();
            foreach (var item in GetAllEmployee())
            {
                var employeeViewModel = MapEmployeeToEmployeeViewModel(item);
                employees.Add(employeeViewModel);
            }
            return employees;
        }

        /// <summary>
        /// Hàm lấy Nhân viên theo id
        /// </summary>
        /// <param name="employeeID">Id của Nhân viên</param>
        /// <returns>Nhân viên</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Employee GetEmployeeByID(Guid employeeID)
        {
            var employeeId = Common.ConvertToNvarchar(employeeID);
            return employeeDL.GetEmployeeByID(employeeId);
        }

        /// <summary>
        /// Hàm thêm mới Nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateEmployee(Employee employee)
        {
            return employeeDL.CreateEmployee(employee);
        }

        /// <summary>
        /// Hàm cập nhật Nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateEmployee(Employee employee)
        {
            return employeeDL.UpdateEmployee(employee);
        }

        /// <summary>
        /// Hàm xóa Nhân viên
        /// </summary>
        /// <param name="employeeID">Id Nhân viên</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteEmployee(Guid employeeID)
        {
            var employeeId = Common.ConvertToNvarchar(employeeID);
            return employeeDL.DeleteEmployee(employeeId);
        }

        /// <summary>
        /// Hàm dùng để ánh xạ từ lớp Employee sang EmployeeViewModel
        /// </summary>
        /// <param name="employee">Nhân viên</param>
        /// <returns>EmployeeViewModel</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public EmployeeViewModel MapEmployeeToEmployeeViewModel(Employee employee)
        {
            var employeeViewModel = new EmployeeViewModel();
            employeeViewModel.EmployeeID = employee.EmployeeID;
            employeeViewModel.EmployeeName = employee.EmployeeName;
            employeeViewModel.EmployeeCode = employee.EmployeeCode;
            employeeViewModel.Address = employee.Address;
            return employeeViewModel;
        }
    }
}
