using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    /// <summary>
    /// Lớp thao tác với bảng Supplier trong csdl
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class SupplierDL : BaseDL<Supplier>
    {
        /// <summary>
        /// Hàm lấy tất cả nhà cung cấp
        /// </summary>
        /// <returns>Danh sách nhà cung cấp</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Supplier> GetAllSupplier()
        {
            return GetAll("Proc_GetAllData", "Supplier");
        }

        /// <summary>
        /// Hàm lấy nhà cung cấp theo id
        /// </summary>
        /// <param name="supplierID">Id nhà cung cấp</param>
        /// <returns>Nhà cung cấp</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Supplier GetSupplierByID(string supplierID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Supplier", "SupplierID", supplierID);
        }

        /// <summary>
        /// Hàm thêm mới nhà cung cấp
        /// </summary>
        /// <param name="supplier">Nhà cung cấp</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateSupplier(Supplier supplier)
        {
            return SaveEntity("Proc_CreateSupplier", supplier);
        }

        /// <summary>
        /// Hàm cập nhật nhà cung cấp
        /// </summary>
        /// <param name="supplier">Nhà cung cấp</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateSupplier(Supplier supplier)
        {
            return SaveEntity("Proc_UpdateSupplier", supplier);
        }

        /// <summary>
        /// Hàm xóa nhà cung cấp
        /// </summary>
        /// <param name="supplierID">ID nhà cung cấp</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteSupplier(string supplierID)
        {
            return DeleteEntity("Proc_DeleteData", "Supplier", "SupplierID", supplierID);
        }
    }
}