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
        public AjaxResult GetDataPagination(int pageNumber, int pageSize)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetAllInvoiceViewModel(pageNumber, pageSize);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu các hóa đơn. Vui lòng liên hệ MISA";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy tổng số trang
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Người tạo: ntxuan (21/6/2019)
        [HttpPost]
        [Route("GetTotalPages")]
        public AjaxResult GetTotalPages(int pageSize)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetTotalPageNumber(pageSize);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy tổng số trang. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Lấy số phiếu nhập, phiếu chi tự động
        /// </summary>
        /// <returns>Số phiếu nhập, phiếu chi</returns>
        /// Người tạo: ntxuan (24/6/2019)
        [HttpGet]
        [Route("GetNumbersAuto")]
        public AjaxResult GetNumberAutoRender()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetNumberAutoRender();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy số phiếu nhập, phiếu chi tự động. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }
       
        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu nhập
        /// </summary>
        /// <param name="importNumber">Số phiếu nhập</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (25/6/2019)
        [HttpPost]
        [Route("GetInvoiceByImportNumber")]
        public AjaxResult GetInvoiceByImportNumber(string importNumber)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetInvoiceByImportNumber(importNumber);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy hóa đơn theo số phiếu nhập. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo số phiếu chi
        /// </summary>
        /// <param name="expenditureNumber">Số phiếu chi</param>
        /// <returns>Hóa đơn</returns>
        /// Người tạo: ntxuan (24/6/2019)
        [HttpPost]
        [Route("GetInvoiceByExpenditureNumber")]
        public AjaxResult GetInvoiceByExpenditureNumber(string expenditureNumber)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetInvoiceByExpenditureNumber(expenditureNumber);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy hóa đơn theo số phiếu chi. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy tổng số bản ghi
        /// </summary>
        /// <returns>Tổng số bản ghi</returns>
        /// Người tạo: ntxuan (21/6/2019)
        [HttpPost]
        [Route("GetTotalRowInvoices")]
        public AjaxResult GetTotalRowInvoices()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetTotalRowInvoices();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy tổng số bản ghi. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo id
        /// </summary>
        /// <param name="invoiceId">Id của hóa đơn</param>
        /// <returns>Hóa đơn chi tiết</returns>
        [HttpPost]
        [Route("Invoice/{invoiceId}")]
        public AjaxResult PostInvoice(Guid invoiceId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    var invoice = invoiceBL.GetInvoiceByID(invoiceId);
                    ajaxResult.Data = invoiceBL.MapInvoiceToInvoiceViewModel(invoice);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy hóa đơn theo id. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy hóa đơn theo ngày tạo
        /// </summary>
        /// <param name="invoiceId">ngày tạo của hóa đơn</param>
        /// <returns>Hóa đơn chi tiết</returns>
        [HttpPost]
        [Route("Invoices")]
        public AjaxResult PostInvoices(InvoiceDto invoiceDto)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetAllInvoiceViewModel(invoiceDto);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy hóa đơn theo ngày tạo. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Lấy danh sách các sản phẩm theo id của hóa đơn
        /// </summary>
        /// <param name="invoiceId">Id của hóa đơn</param>
        /// <returns>Danh sách các sản phẩm</returns>
        /// Người tạo: ntxuan (11/5/2019)
        [Route("GetProducs/{invoiceId}")]
        public async Task<AjaxResult> Post(Guid invoiceId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceDetailBL invoiceDetailBL = new InvoiceDetailBL())
                {
                    await Task.Delay(200);
                    ajaxResult.Data = invoiceDetailBL.GetAllInvoiceDetailViewModelByInvoiceID(invoiceId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy danh sách các sản phẩm theo id của hóa đơn. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy danh sách các nhà cung cấp để đổ dữ liệu xuống client
        /// </summary>
        /// <returns>Danh sách nhà cung cấp</returns>
        /// Người tạo: ntxuan (13/5/2019)
        [Route("GetSuppliers")]
        public AjaxResult GetSuppliers()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (SupplierBL supplierBL = new SupplierBL())
                {
                    ajaxResult.Data = supplierBL.GetAllSupplierViewModel();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy danh sách các nhà cung cấp để đổ dữ liệu xuống client. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy danh sách nhân viên để trả dữ liệu cho client
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        /// Người tạo: ntxuan (13/5/2019)
        [Route("GetEmployees")]
        public AjaxResult GetEmployees()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBL employeeBL = new EmployeeBL())
                {
                    ajaxResult.Data = employeeBL.GetAllEmployeeViewModel();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy danh sách nhân viên để trả dữ liệu cho client. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lưu hóa đơn lên server
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveNewInvoice")]
        public AjaxResult SaveNewInvoice(InvoiceViewModel invoiceViewModel)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    var invoice = invoiceBL.MapInvoiceViewModelToInvoice(invoiceViewModel);
                    invoiceBL.CreateInvoice(invoice);
                    ajaxResult.Data = invoice.InvoiceID;
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lưu hóa đơn lên server. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lưu hóa đơn lên server khi sửa đổi
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveEditInvoice")]
        public AjaxResult SaveEditInvoice(InvoiceViewModel invoiceViewModel)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    var invoice = invoiceBL.MapInvoiceViewModelToInvoice(invoiceViewModel);
                    invoice.InvoiceID = invoiceViewModel.InvoiceID;
                    invoiceBL.UpdateInvoice(invoice);
                    ajaxResult.Data = invoiceViewModel.InvoiceID;
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lưu hóa đơn lên server khi sửa đổi. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lưu các sản phẩm của hóa đơn
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("SaveListInvoiceDetail")]
        public AjaxResult SaveListInvoiceDetail(List<InvoiceDetailViewModel> invoiceDetailViewModels)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceDetailBL invoiceDetailBL = new InvoiceDetailBL())
                {
                    invoiceDetailBL.SaveListInvoiceDetail(invoiceDetailViewModels);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lưu các sản phẩm của hóa đơn. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm xóa một hóa đơn
        /// </summary>
        /// <returns>trạng thái thành công/ thất bại</returns>
        /// Người tạo: ntxuan (17/5/2019)
        [HttpPost]
        [Route("DeleteInvoice/{invoiceId}")]
        public AjaxResult DeleteInvoice(Guid invoiceId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    invoiceBL.DeleteInvoice(invoiceId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi xóa một hóa đơn. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm dùng để xóa nhiều hóa đơn
        /// </summary>
        /// <returns>Trạng thái thành công</returns> 
        /// Người tạo: ntxuan (25/5/2019)
        [HttpPost]
        [Route("DeleteMultiInvoice")]
        public AjaxResult DeleteMultiInvoice(List<Guid> listInvoiceID)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    foreach (var invoiceID in listInvoiceID)
                    {
                        invoiceBL.DeleteInvoice(invoiceID);
                    }
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi xóa nhiều hóa đơn. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm dùng để lọc dữ liệu
        /// </summary>
        /// <returns>Dữ liệu lọc</returns>
        /// Người tạo: ntxuan (25/5/2019)
        [HttpPost]
        [Route("GetDataFilter")]
        public AjaxResult GetDataFilter(InvoiceDto invoiceDto)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (InvoiceBL invoiceBL = new InvoiceBL())
                {
                    ajaxResult.Data = invoiceBL.GetDataFilter(invoiceDto);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lọc dữ liệu. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm dùng để lấy tất các hàng hóa
        /// </summary>
        /// <returns>Danh sách hàng hóa</returns>
        /// Người tạo: ntxuan (25/5/2019)
        [HttpGet]
        [Route("GetListMerchandise")]
        public AjaxResult GetListMerchandise()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (ProductBL productBL = new ProductBL())
                {
                    ajaxResult.Data = productBL.GetAllProduct();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lọc dữ liệu. Vui lòng liên hệ MISA!";
            }
            return ajaxResult;
        }
    }
}
