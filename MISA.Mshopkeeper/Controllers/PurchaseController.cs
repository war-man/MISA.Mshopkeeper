using MISA.BL;
using MISA.Entities;
using MISA.Mshopkeeper.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace MISA.Mshopkeeper.Controllers
{
    /// <summary>
    /// Lớp controller điều khiển các hoạt động trong mục mua hàng
    /// </summary>
    /// Người tạo: ntxuan (11/5/2019)
    [RoutePrefix("Purchase")]
    public class PurchaseController : ApiController
    {
        /// <summary>
        /// Lấy các hóa đơn để hiển thị 
        /// </summary>
        /// <returns>Danh sách hóa đơn</returns>
        /// Người tạo: ntxuan (11/5/2019)
        [HttpGet]
        [Route("{pageNumber}/{pageSize}")]
        public IEnumerable<InvoiceViewModel> GetDataPagination(int pageNumber, int pageSize)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetAllInvoiceViewModel(pageNumber, pageSize);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy tổng số trang
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Người tạo: ntxuan (21/6/2019)
        [HttpPost]
        [Route("GetTotalPages")]
        public int GetTotalPages(int pageSize)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetTotalPageNumber(pageSize);
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }

        /// <summary>
        /// Lấy số phiếu nhập, phiếu chi tự động
        /// </summary>
        /// <returns>Số phiếu nhập, phiếu chi</returns>
        /// Người tạo: ntxuan (24/6/2019)
        [HttpGet]
        [Route("GetNumbersAuto")]
        public List<string> GetNumberAutoRender()
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetNumberAutoRender();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
       
        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu nhập
        /// </summary>
        /// <param name="importNumber">Số phiếu nhập</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (25/6/2019)
        [HttpPost]
        [Route("GetInvoiceByImportNumber")]
        public Invoice GetInvoiceByImportNumber(string importNumber)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetInvoiceByImportNumber(importNumber);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu chi
        /// </summary>
        /// <param name="expenditureNumber">Số phiếu chi</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        [HttpPost]
        [Route("GetInvoiceByExpenditureNumber")]
        public Invoice GetInvoiceByExpenditureNumber(string expenditureNumber)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetInvoiceByExpenditureNumber(expenditureNumber);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy tổng số bản ghi
        /// </summary>
        /// <returns>Tổng số bản ghi</returns>
        /// Người tạo: ntxuan (21/6/2019)
        [HttpPost]
        [Route("GetTotalRowInvoices")]
        public int GetTotalRowInvoices()
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetTotalRowInvoices();
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo id
        /// </summary>
        /// <param name="invoiceId">Id của hóa đơn</param>
        /// <returns>Hóa đơn chi tiết</returns>
        [HttpPost]
        [Route("Invoice/{invoiceId}")]
        public InvoiceViewModel PostInvoice(Guid invoiceId)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    var invoice = invoiceBL.GetInvoiceByID(invoiceId);
                    var invoiceViewModel = invoiceBL.MapInvoiceToInvoiceViewModel(invoice);
                    return invoiceViewModel;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo ngày tạo
        /// </summary>
        /// <param name="invoiceId">ngày tạo của hóa đơn</param>
        /// <returns>Hóa đơn chi tiết</returns>
        [HttpPost]
        [Route("Invoices")]
        public IEnumerable<InvoiceViewModel> PostInvoices(InvoiceDto invoiceDto)
        {
            //try
            //{
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetAllInvoiceViewModel(invoiceDto);
                }
            //}
            //catch (Exception)
            //{
            //    return null;
            //}
        }

        /// <summary>
        /// Lấy danh sách các sản phẩm theo id của hóa đơn
        /// </summary>
        /// <param name="invoiceId">Id của hóa đơn</param>
        /// <returns>Danh sách các sản phẩm</returns>
        /// Người tạo: ntxuan (11/5/2019)
        [Route("GetProducs/{invoiceId}")]
        public async Task<IEnumerable<InvoiceDetailViewModel>> Post(Guid invoiceId)
        {
            try
            {
                using (InvoiceDetailBL invoiceDetailBL = new InvoiceDetailBL())
                {
                    await Task.Delay(200);
                    return invoiceDetailBL.GetAllInvoiceDetailViewModelByInvoiceID(invoiceId);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy danh sách các nhà cung cấp để đổ dữ liệu xuống client
        /// </summary>
        /// <returns>Danh sách nhà cung cấp</returns>
        /// Người tạo: ntxuan (13/5/2019)
        [Route("GetSuppliers")]
        public IEnumerable<SupplierViewModel> GetSuppliers()
        {
            try
            {
                using (SupplierBL supplierBL = new SupplierBL())
                {
                    return supplierBL.GetAllSupplierViewModel();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy danh sách nhân viên để trả dữ liệu cho client
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        /// Người tạo: ntxuan (13/5/2019)
        [Route("GetEmployees")]
        public IEnumerable<EmployeeViewModel> GetEmployees()
        {
            try
            {
                using (EmployeeBL employeeBL = new EmployeeBL())
                {
                    return employeeBL.GetAllEmployeeViewModel();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lưu hóa đơn lên server
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveNewInvoice")]
        public Guid SaveNewInvoice(InvoiceViewModel invoiceViewModel)
        {
            using (InvoiceBL invoiceBL = new InvoiceBL())
            {
                var invoice = invoiceBL.MapInvoiceViewModelToInvoice(invoiceViewModel);
                invoiceBL.CreateInvoice(invoice);
                return invoice.InvoiceID;
            }
        }

        /// <summary>
        /// Hàm lưu hóa đơn lên server khi sửa đổi
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveEditInvoice")]
        public Guid SaveEditInvoice(InvoiceViewModel invoiceViewModel)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    var invoice = invoiceBL.MapInvoiceViewModelToInvoice(invoiceViewModel);
                    invoice.InvoiceID = invoiceViewModel.InvoiceID;
                    invoiceBL.UpdateInvoice(invoice);
                }
            }
            catch (Exception)
            {
            }
            return invoiceViewModel.InvoiceID;
        }

        /// <summary>
        /// Hàm lưu các sản phẩm của hóa đơn
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveListInvoiceDetail")]
        public bool SaveListInvoiceDetail(List<InvoiceDetailViewModel> invoiceDetailViewModels)
        {
            try
            {
                using (InvoiceDetailBL invoiceDetailBL = new InvoiceDetailBL())
                {
                    invoiceDetailBL.SaveListInvoiceDetail(invoiceDetailViewModels);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm xóa một hóa đơn
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("DeleteInvoice/{invoiceId}")]
        public bool DeleteInvoice(Guid invoiceId)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    invoiceBL.DeleteInvoice(invoiceId);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm dùng để xóa nhiều hóa đơn
        /// </summary>
        /// <returns>Trạng thái thành công</returns> 
        /// Người tạo: ntxuan (25/5/2019)
        [HttpPost]
        [Route("DeleteMultiInvoice")]
        public bool DeleteMultiInvoice(List<Guid> listInvoiceID)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    foreach (var invoiceID in listInvoiceID)
                    {
                        invoiceBL.DeleteInvoice(invoiceID);
                    }
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm dùng để xóa nhiều hóa đơn
        /// </summary>
        /// <returns>Trạng thái thành công</returns>
        /// Người tạo: ntxuan (25/5/2019)
        [HttpPost]
        [Route("GetDataFilter")]
        public IEnumerable<InvoiceViewModel> GetDataFilter(InvoiceDto invoiceDto)
        {
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    return invoiceBL.GetDataFilter(invoiceDto);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm dùng để lấy tất các hàng hóa
        /// </summary>
        /// <returns>Danh sách hàng hóa</returns>
        /// Người tạo: ntxuan (25/5/2019)
        [HttpGet]
        [Route("GetListMerchandise")]
        public IEnumerable<Product> GetListMerchandise()
        {
            try
            {
                using (ProductBL productBL = new ProductBL())
                {
                    return productBL.GetAllProduct();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
