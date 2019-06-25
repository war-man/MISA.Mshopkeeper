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
    /// Lớp thao tác nghiệp vụ cho hóa đơn
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class InvoiceBL : BaseBL
    {
        private InvoiceDL invoiceDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceBL()
        {
            invoiceDL = new InvoiceDL();
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
            return invoiceDL.GetDataPagination(pageNumber, pageSize);
        }

        /// <summary>
        /// Hàm lấy ra tất cả các hóa đơn
        /// </summary>
        /// <returns>Danh sách hóa đơn</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Invoice> GetAllInvoice()
        {
            return invoiceDL.GetAllInvoice();
        }

        /// <summary>
        /// Hàm lấy tổng số trang
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public int GetTotalPageNumber(int pageSize)
        {
            var totalRecord  = invoiceDL.GetTotalInvoice();
            int totalPageNumber = totalRecord / pageSize;
            if (totalRecord % pageSize != 0)
            {
                totalPageNumber++; 
            }
            return totalPageNumber;
        }

        /// <summary>
        /// Hàm lấy tổng số bản ghi của bảng trong database
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: ntxuan(22/6/2019)
        public int GetTotalRowInvoices()
        {
            return invoiceDL.GetTotalInvoice();
        }

        /// <summary>
        /// Hàm lấy tất cả invoiceViewModel
        /// </summary>
        /// <returns>List invoiceViewModel</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<InvoiceViewModel> GetAllInvoiceViewModel(int pageNumber, int pageSize)
        {
            if (pageNumber > GetTotalPageNumber(pageSize))
            {
                pageNumber = GetTotalPageNumber(pageSize);
            }
            var invoiceViewModels = new List<InvoiceViewModel>();
            foreach (var item in GetDataPagination(pageNumber, pageSize))
            {
                var invoiceViewModel = MapInvoiceToInvoiceViewModel(item);
                invoiceViewModels.Add(invoiceViewModel);
            }
            return invoiceViewModels;
        }

        /// <summary>
        /// Hàm lấy tất cả invoiceViewModel theo điều kiện lọc
        /// </summary>
        /// <returns>List invoiceViewModel</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<InvoiceViewModel> GetAllInvoiceViewModel(InvoiceDto invoiceDto)
        {
            var invoices = GetListInvoiceByImportDate(invoiceDto.FromDate, invoiceDto.ToDate);
            var invoiceViewModels = new List<InvoiceViewModel>();
            foreach (var item in invoices)
            {
                var invoiceViewModel = MapInvoiceToInvoiceViewModel(item);
                invoiceViewModels.Add(invoiceViewModel);
            }
            return invoiceViewModels.OrderByDescending(s => s.ImportDate).ToList();
        }


        /// <summary>
        /// Hàm lấy các hóa đơn theo điều kiện lọc
        /// </summary>
        /// <param name="invoiceDto">Đối tượng Dto</param>
        /// <returns>Danh sách hóa đơn</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Invoice> GetListInvoiceByFilter(InvoiceDto invoiceDto)
        {
            var result = new List<Invoice>();
            var invoices = invoiceDL.GetAllInvoice();
            if (invoiceDto.TypeFilter == "search-importNumber")
            {
                result = invoices.Where(s => s.ImportNumber.ToLower().Contains(invoiceDto.TextFilter.ToLower())).ToList();
            }
            else if (invoiceDto.TypeFilter == "search-supplierName")
            {
                var supplierBL = new SupplierBL();
                result = invoices.Where(s => supplierBL.GetSupplierByID(s.SupplierID).SupplierName.ToLower().Contains(invoiceDto.TextFilter.ToLower())).ToList();
            }
            else if (invoiceDto.TypeFilter == "search-explanation")
            {
                result = invoices.Where(s => s.Explanation.ToLower().Contains(invoiceDto.TextFilter.ToLower())).ToList();
            }

            return result;
        }

        /// <summary>
        /// Hàm lấy danh sách các hóa đơn theo một khoảng nào đó
        /// </summary>
        /// <param name="formDate">Ngày bắt đầu</param>
        /// <param name="toDate">Ngày kết thúc</param>
        /// <returns></returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Invoice> GetListInvoiceByImportDate(DateTime formDate, DateTime toDate)
        {
            var invoices = new List<Invoice>();
            foreach (var invoice in GetAllInvoice())
            {
                if (Common.CompareDate(formDate, invoice.ImportDate) <= 0 && Common.CompareDate(toDate, invoice.ImportDate) >= 0)
                {
                    invoices.Add(invoice);
                }
            }
            return invoices;
        }

        /// <summary>
        /// Hàm dùng để xóa nhiều hóa đơn
        /// </summary>
        /// <returns>Trạng thái thành công</returns>
        /// Người tạo: ntxuan (25/5/2019)
        public IEnumerable<InvoiceViewModel> GetDataFilter(InvoiceDto invoiceDto)
        {
                var invoiceViewModels = new List<InvoiceViewModel>();

                foreach (var item in GetListInvoiceByFilter(invoiceDto))
                {
                    var invoiceViewModel = MapInvoiceToInvoiceViewModel(item);
                    invoiceViewModels.Add(invoiceViewModel);
                }
                return invoiceViewModels;
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo id
        /// </summary>
        /// <param name="invoiceID">Id của hóa đơn</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Invoice GetInvoiceByID(Guid invoiceID)
        {
            var invoiceId = Common.ConvertToNvarchar(invoiceID);
            return invoiceDL.GetInvoiceByID(invoiceId);
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu nhập
        /// </summary>
        /// <param name="importNumber">Số phiếu nhập</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        public Invoice GetInvoiceByImportNumber(string importNumber)
        {
            var importNumberNvarchar = Common.ConvertToNvarchar(importNumber);
            return invoiceDL.GetInvoiceByImportNumber(importNumberNvarchar);
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu chi
        /// </summary>
        /// <param name="expenditureNumber">Số phiếu chi</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        public Invoice GetInvoiceByExpenditureNumber(string expenditureNumber)
        {
            var expenditureNumberNvarchar = Common.ConvertToNvarchar(expenditureNumber);
            return invoiceDL.GetInvoiceByExpenditureNumber(expenditureNumberNvarchar);
        }

        /// <summary>
        /// Hàm thêm mới hóa đơn
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateInvoice(Invoice invoice)
        {
            return invoiceDL.CreateInvoice(invoice);
        }

        /// <summary>
        /// Hàm cập nhật hóa đơn
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateInvoice(Invoice invoice)
        {
            return invoiceDL.UpdateInvoice(invoice);
        }

        /// <summary>
        /// Hàm xóa hóa đơn
        /// </summary>
        /// <param name="invoiceID">Id hóa đơn</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteInvoice(Guid invoiceID)
        {
            var invoiceId = Common.ConvertToNvarchar(invoiceID);
            return invoiceDL.DeleteInvoice(invoiceId);
        }

        /// <summary>
        /// Hàm tính tổng số tiền của một hóa đơn
        /// </summary>
        /// <param name="invoiceId">Id của hóa đơn chuyền vào</param>
        /// <returns>Tổng số tiền</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public decimal GetSumMoneyByInvoiceID(Guid invoiceId)
        {
            var invoiceDetailBL = new InvoiceDetailBL();
            var invoiceDetails = invoiceDetailBL.GetAllInvoiceDetailByInvoieID(invoiceId);
            decimal SumMoney = 0;
            foreach (var item in invoiceDetails)
            {
                SumMoney += item.UnitPrice * item.Quantity;
            }
            return SumMoney;
        }

        /// <summary>
        /// Lấy số phiếu nhập, phiếu chi tự động
        /// </summary>
        /// <returns>Số phiếu nhập, phiếu chi</returns>
        /// Người tạo: ntxuan (24/6/2019)
        public List<string> GetNumberAutoRender()
        {
            return invoiceDL.GetNumberAutoRender();
        }

        /// <summary>
        /// Hàm dùng để ánh xạ từ lớp Invoice sang InvoiceViewModel
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>InvoiceViewModel</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceViewModel MapInvoiceToInvoiceViewModel(Invoice invoice)
        {
            var supplierBL = new SupplierBL();
            var employeeBL = new EmployeeBL();

            var supplier = supplierBL.GetSupplierByID(invoice.SupplierID);
            var employee = employeeBL.GetEmployeeByID(invoice.EmployeeID);

            var invoiceViewModel = new InvoiceViewModel();
            invoiceViewModel.InvoiceID = invoice.InvoiceID;
            invoiceViewModel.ImportDate = invoice.ImportDate;
            invoiceViewModel.ImportNumber = invoice.ImportNumber;
            invoiceViewModel.Explanation = invoice.Explanation;
            invoiceViewModel.ImportTime = invoice.ImportTime;
            invoiceViewModel.Deliver = invoice.Deliver;
            invoiceViewModel.Receiver = invoice.Receiver;
            invoiceViewModel.SupplierName = supplier.SupplierName;
            invoiceViewModel.SupplierCode = supplier.SupplierCode;
            invoiceViewModel.EmployeeName = employee.EmployeeName;
            invoiceViewModel.EmployeeCode = employee.EmployeeCode;
            invoiceViewModel.Money = GetSumMoneyByInvoiceID(invoice.InvoiceID);
            invoiceViewModel.TypeInvoice = invoice.TypeInvoice;
            invoiceViewModel.ReasonExpenditure = invoice.ReasonExpenditure;
            invoiceViewModel.ExpenditureNumber = invoice.ExpenditureNumber;
            invoiceViewModel.TaxCode = invoice.TaxCode;
            invoiceViewModel.InvoiceNumber = invoice.InvoiceNumber;
            invoiceViewModel.SupplierID = invoice.SupplierID;
            invoiceViewModel.EmployeeID = invoice.EmployeeID;
            invoiceViewModel.Address = invoice.Address;
            invoiceViewModel.InvoiceDate = invoice.InvoiceDate;
            return invoiceViewModel;
        }

        /// <summary>
        /// Hàm để ánh xạ từ lớp InvoiceViewModel sang lớp Invoice
        /// </summary>
        /// <returns>Invoice</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Invoice MapInvoiceViewModelToInvoice(InvoiceViewModel invoiceViewModel)
        {
            var invoice = new Invoice();
            // Ánh xạ các thuộc tính tương ứng
            invoice.ImportNumber = invoiceViewModel.ImportNumber;
            invoice.ExpenditureNumber = invoiceViewModel.ExpenditureNumber;
            invoice.Explanation = invoiceViewModel.Explanation;
            invoice.ImportDate = invoiceViewModel.ImportDate;
            invoice.ImportTime = invoiceViewModel.ImportTime;
            invoice.SupplierID = invoiceViewModel.SupplierID;
            invoice.EmployeeID = invoiceViewModel.EmployeeID;
            invoice.TypeInvoice = invoiceViewModel.TypeInvoice;
            invoice.Address = invoiceViewModel.Address;
            invoice.Deliver = invoiceViewModel.Deliver;
            invoice.Receiver = invoiceViewModel.Receiver;
            invoice.ReasonExpenditure = invoiceViewModel.ReasonExpenditure;
            invoice.TaxCode = invoiceViewModel.TaxCode;
            invoice.InvoiceNumber = invoiceViewModel.InvoiceNumber;
            invoice.InvoiceDate = invoiceViewModel.InvoiceDate;

            return invoice;
        }

    }
}
