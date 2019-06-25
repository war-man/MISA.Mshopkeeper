using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    /// <summary>
    /// Lớp dùng để thao tác với bảng InvoiceDetail trong csdl
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class InvoiceDetailDL : BaseDL<InvoiceDetail>
    {
        /// <summary>
        /// Hàm dùng để lấy tất cả các Hóa đơn chi tiết
        /// </summary>
        /// <returns>Danh sách Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<InvoiceDetail> GetAllInvoiceDetail()
        {
            return GetAll("Proc_GetAllData", "InvoiceDetail");
        }

        /// <summary>
        /// Hàm dùng để lất Hóa đơn chi tiết theo id
        /// </summary>
        /// <param name="invoiceDetailID">Id Hóa đơn chi tiết</param>
        /// <returns>Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceDetail GetInvoiceDetailByID(string invoiceDetailID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "InvoiceDetail", "InvoiceDetailID", invoiceDetailID);
        }

        /// <summary>
        /// Hàm dùng để lất Hóa đơn chi tiết theo id hóa đơn
        /// </summary>
        /// <param name="invoiceID">Id Hóa đơn </param>
        /// <returns>Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<InvoiceDetail> GetAllInvoiceDetailByInvoieID(string invoiceID)
        {
            return GetAllByAttribute("Proc_GetAllDataByAttribute", "InvoiceDetail", "InvoiceID", invoiceID);
        }

        /// <summary>
        /// Hàm dùng để thêm mới Hóa đơn chi tiết
        /// </summary>
        /// <param name="invoiceDetail">Hóa đơn chi tiết</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            return SaveEntity("Proc_CreateInvoiceDetail", invoiceDetail);
        }

        /// <summary>
        /// Hàm dùng để cập nhật Hóa đơn chi tiết
        /// </summary>
        /// <param name="invoiceDetail">Hóa đơn chi tiết</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            return SaveEntity("Proc_UpdateInvoiceDetail", invoiceDetail);
        }

        /// <summary>
        /// Hàm dùng để xóa Hóa đơn chi tiết theo id
        /// </summary>
        /// <param name="invoiceDetailID">Id Hóa đơn chi tiết</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteInvoiceDetail(string invoiceDetailID)
        {
            return DeleteEntity("Proc_DeleteData", "InvoiceDetail", "InvoiceDetailID", invoiceDetailID);
        }
    }
}
