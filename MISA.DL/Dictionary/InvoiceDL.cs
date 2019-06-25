using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    /// <summary>
    /// Lớp dùng để thao tác với bảng Invoice trong csdl
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class InvoiceDL : BaseDL<Invoice>
    {
        /// <summary>
        /// Hàm lấy ra tất cả các hóa đơn
        /// </summary>
        /// <returns>Danh sách hóa đơn</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Invoice> GetAllInvoice()
        {
            return GetAll("Proc_GetAllData", "Invoice");
        }

        /// <summary>
        /// Hàm lấy tổng số bản ghi của hóa đơn
        /// </summary>
        /// <returns>Tổng hóa đơn</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public int GetTotalInvoice()
        {
            return GetTotalRecord("Proc_GetTotalRows", "Invoice");
        }

        /// <summary>
        /// Hàm phân trang hóa đơn
        /// </summary>
        /// <param name="pageNumber">Số trang</param>
        /// <param name="pageSize">Kích thước trang</param>
        /// <returns>Danh sách hóa đơn</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<Invoice> GetDataPagination(int pageNumber, int pageSize)
        {
            return GetDataPagination("Proc_Pagination", "Invoice", pageNumber, pageSize);
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo id
        /// </summary>
        /// <param name="invoiceID">Id của hóa đơn</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Invoice GetInvoiceByID(string invoiceID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Invoice", "InvoiceID", invoiceID);
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu nhập
        /// </summary>
        /// <param name="importNumber">Số phiếu nhập</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        public Invoice GetInvoiceByImportNumber(string importNumber)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Invoice", "ImportNumber", importNumber);
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu chi
        /// </summary>
        /// <param name="expenditureNumber">Số phiếu chi</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        public Invoice GetInvoiceByExpenditureNumber(string expenditureNumber)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Invoice", "ExpenditureNumber", expenditureNumber);
        }

        /// <summary>
        /// Hàm thêm mới hóa đơn
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateInvoice(Invoice invoice)
        {
            return SaveEntity("Proc_CreateInvoice", invoice);
        }

        /// <summary>
        /// Hàm cập nhật hóa đơn
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateInvoice(Invoice invoice)
        {
            return SaveEntity("Proc_UpdateInvoice", invoice);
        }

        /// <summary>
        /// Hàm xóa hóa đơn
        /// </summary>
        /// <param name="invoiceID">Id hóa đơn</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteInvoice(string invoiceID)
        {
            return DeleteEntity("Proc_DeleteData", "Invoice", "InvoiceID", invoiceID);
        }

        /// <summary>
        /// Hàm lấy số phiếu nhập, phiếu chi tự động
        /// </summary>
        /// <returns>Số phiếu nhập, phiếu chi</returns>
        /// Người tạo: ntxuan (23/4/2019)
        public List<string> GetNumberAutoRender()
        {
            var listNumber = new List<string>();
            using (DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = "Proc_GettNumbersAutoRender";
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                     var importNumber = (string)sqlDataReader.GetValue(0);
                     var expenditureNumber = (string)sqlDataReader.GetValue(1);
                     listNumber.Add(importNumber);
                     listNumber.Add(expenditureNumber);
                     break;
                }
            }
            return listNumber;
        }

    }
}
