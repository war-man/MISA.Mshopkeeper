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
    /// Lớp thao tác nghiệp vụ cho Nhà cung cấp
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class SupplierBL : BaseBL
    {
        private SupplierDL supplierDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public SupplierBL()
        {
            supplierDL = new SupplierDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Nhà cung cấp
        /// </summary>
        /// <returns>Danh sách Nhà cung cấp</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Supplier> GetAllSupplier()
        {
            return supplierDL.GetAllSupplier();
        }

        /// <summary>
        /// Hàm lấy tất cả supplierViewModel
        /// </summary>
        /// <returns>List supplierViewModel</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<SupplierViewModel> GetAllSupplierViewModel()
        {
            var suppliers = new List<SupplierViewModel>();
            foreach (var item in GetAllSupplier())
            {
                var supplierViewModel = MapSupplierToSupplierViewModel(item);
                suppliers.Add(supplierViewModel);
            }
            return suppliers;
        }

        /// <summary>
        /// Hàm lấy Nhà cung cấp theo id
        /// </summary>
        /// <param name="supplierID">Id của Nhà cung cấp</param>
        /// <returns>Nhà cung cấp</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Supplier GetSupplierByID(Guid supplierID)
        {
            var supplierId = Common.ConvertToNvarchar(supplierID);
            return supplierDL.GetSupplierByID(supplierId);
        }

        /// <summary>
        /// Hàm thêm mới Nhà cung cấp
        /// </summary>
        /// <param name="supplier">Nhà cung cấp</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateSupplier(Supplier supplier)
        {
            return supplierDL.CreateSupplier(supplier);
        }

        /// <summary>
        /// Hàm cập nhật Nhà cung cấp
        /// </summary>
        /// <param name="supplier">Nhà cung cấp</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateSupplier(Supplier supplier)
        {
            return supplierDL.UpdateSupplier(supplier);
        }

        /// <summary>
        /// Hàm xóa Nhà cung cấp
        /// </summary>
        /// <param name="supplierID">Id Nhà cung cấp</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteSupplier(Guid supplierID)
        {
            var supplierId = Common.ConvertToNvarchar(supplierID);
            return supplierDL.DeleteSupplier(supplierId);
        }

        /// <summary>
        /// Hàm dùng để ánh xạ từ lớp Supplier sang SupplierViewModel
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>SupplierViewModel</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public SupplierViewModel MapSupplierToSupplierViewModel(Supplier supplier)
        {
            var supplierViewModel = new SupplierViewModel();
            supplierViewModel.SupplierID = supplier.SupplierID;
            supplierViewModel.SupplierCode = supplier.SupplierCode;
            supplierViewModel.SupplierName = supplier.SupplierName;
            supplierViewModel.Address = supplier.Address;
            return supplierViewModel;
        }
    }
}
