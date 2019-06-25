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
    /// Lớp thao tác nghiệp vụ cho Hóa đơn chi tiết
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class InvoiceDetailBL : BaseBL
    {
        private InvoiceDetailDL invoiceDetailDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceDetailBL()
        {
            invoiceDetailDL = new InvoiceDetailDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Hóa đơn chi tiết
        /// </summary>
        /// <returns>Danh sách Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<InvoiceDetail> GetAllInvoiceDetail()
        {
            return invoiceDetailDL.GetAllInvoiceDetail();
        }

        /// <summary>
        /// Hàm lấy các hóa đơn chi tiết theo id hóa đơn
        /// </summary>
        /// <param name="invoiceId">Id hóa đơn</param>
        /// <returns>Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<InvoiceDetailViewModel> GetAllInvoiceDetailViewModelByInvoiceID(Guid invoiceId)
        {
            var invoiceDetailViewModels = new List<InvoiceDetailViewModel>();
            var invoiceDetails = GetAllInvoiceDetailByInvoieID(invoiceId);
            foreach (var item in invoiceDetails)
            {
                var invoiceDetailViewModel = MapInvoiceDetailToInvoiceDetailViewModel(item);
                invoiceDetailViewModels.Add(invoiceDetailViewModel);
            }
            return invoiceDetailViewModels;
        }

        /// <summary>
        /// Hàm dùng để lưu các bản ghi của invoiceDetail
        /// </summary>
        /// <param name="invoiceDetailViewModels">danh sách invoiceDetailViewModels truyền vào</param>
        /// Người tạo: ntxuan (21/6/2019)
        public void SaveListInvoiceDetail(List<InvoiceDetailViewModel> invoiceDetailViewModels)
        {
            var InvoiceID = invoiceDetailViewModels[0].InvoiceID;
            var listInvoiceDetail = GetAllInvoiceDetail().Where(s => s.InvoiceID == InvoiceID).ToList();
            foreach (var item in listInvoiceDetail)
            {
                DeleteInvoiceDetail(item.InvoiceDetailID);
            }

            foreach (var item in invoiceDetailViewModels)
            {
                var invoiceDetail = MapInvoiceDetaiViewModelToInvoiceDetail(item);
                CreateInvoiceDetail(invoiceDetail);
            }
        }

        /// <summary>
        /// Hàm dùng để lất Hóa đơn chi tiết theo id hóa đơn
        /// </summary>
        /// <param name="invoiceID">Id Hóa đơn </param>
        /// <returns>Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<InvoiceDetail> GetAllInvoiceDetailByInvoieID(Guid invoiceID)
        {
            var invoiceDetailId = Common.ConvertToNvarchar(invoiceID);
            return invoiceDetailDL.GetAllInvoiceDetailByInvoieID(invoiceDetailId);
        }

        /// <summary>
        /// Hàm lấy Hóa đơn chi tiết theo id
        /// </summary>
        /// <param name="invoiceDetailID">Id của Hóa đơn chi tiết</param>
        /// <returns>Hóa đơn chi tiết</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceDetail GetInvoiceDetailByID(Guid invoiceDetailID)
        {
            var invoiceDetailId = Common.ConvertToNvarchar(invoiceDetailID);
            return invoiceDetailDL.GetInvoiceDetailByID(invoiceDetailId);
        }

        /// <summary>
        /// Hàm thêm mới Hóa đơn chi tiết
        /// </summary>
        /// <param name="invoiceDetail">Hóa đơn chi tiết</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            return invoiceDetailDL.CreateInvoiceDetail(invoiceDetail);
        }

        /// <summary>
        /// Hàm cập nhật Hóa đơn chi tiết
        /// </summary>
        /// <param name="invoiceDetail">Hóa đơn chi tiết</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            return invoiceDetailDL.UpdateInvoiceDetail(invoiceDetail);
        }

        /// <summary>
        /// Hàm xóa Hóa đơn chi tiết
        /// </summary>
        /// <param name="invoiceDetailID">Id Hóa đơn chi tiết</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteInvoiceDetail(Guid invoiceDetailID)
        {
            var invoiceDetailId = Common.ConvertToNvarchar(invoiceDetailID);
            return invoiceDetailDL.DeleteInvoiceDetail(invoiceDetailId);
        }

        /// <summary>
        /// Hàm để ánh xạ từ lớp InvoiceDetailViewModel sang lớp InvoiceDetail
        /// </summary>
        /// <returns>InvoiceDetail</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceDetail MapInvoiceDetaiViewModelToInvoiceDetail(InvoiceDetailViewModel invoiceDetailViewModel)
        {
            var invoiceDetail = new InvoiceDetail();
            // Ánh xạ các thuộc tính tương ứng
            invoiceDetail.InvoiceDetailID = invoiceDetailViewModel.InvoiceDetailID;
            invoiceDetail.InvoiceID = invoiceDetailViewModel.InvoiceID;
            invoiceDetail.ProductName = invoiceDetailViewModel.ProductName;
            invoiceDetail.SKU = invoiceDetailViewModel.SKU;
            invoiceDetail.Unit = invoiceDetailViewModel.Unit;
            invoiceDetail.Storage = invoiceDetailViewModel.Storage;
            invoiceDetail.UnitPrice = invoiceDetailViewModel.UnitPrice;
            invoiceDetail.DiscountPercentage = invoiceDetailViewModel.DiscountPercentage;
            invoiceDetail.TaxPercentage = invoiceDetailViewModel.TaxPercentage;
            invoiceDetail.Quantity = invoiceDetailViewModel.Quantity;

            return invoiceDetail;
        }

        /// <summary>
        /// Hàm dùng để ánh xạ từ lớp InvoiceDetail sang InvoiceDetailViewModel
        /// </summary>
        /// <param name="invoice">Hóa đơn</param>
        /// <returns>InvoiceDetailViewModel</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public InvoiceDetailViewModel MapInvoiceDetailToInvoiceDetailViewModel(InvoiceDetail invoiceDetail)
        {
            var invoiceDetailViewModel = new InvoiceDetailViewModel();
            invoiceDetailViewModel.InvoiceDetailID = invoiceDetail.InvoiceDetailID;
            invoiceDetailViewModel.InvoiceID = invoiceDetail.InvoiceID;
            invoiceDetailViewModel.ProductName = invoiceDetail.ProductName;
            invoiceDetailViewModel.SKU = invoiceDetail.SKU;
            invoiceDetailViewModel.Unit = invoiceDetail.Unit;
            invoiceDetailViewModel.Storage = invoiceDetail.Storage;
            invoiceDetailViewModel.UnitPrice = invoiceDetail.UnitPrice;
            invoiceDetailViewModel.DiscountPercentage = invoiceDetail.DiscountPercentage;
            invoiceDetailViewModel.TaxPercentage = invoiceDetail.TaxPercentage;
            invoiceDetailViewModel.Quantity = invoiceDetail.Quantity;
            invoiceDetailViewModel.Money = (double)invoiceDetail.Quantity * (double)invoiceDetail.UnitPrice;
            invoiceDetailViewModel.DiscountMoney = invoiceDetailViewModel.Money * (double)invoiceDetail.DiscountPercentage * 0.01;
            invoiceDetailViewModel.TaxMoney = (invoiceDetailViewModel.Money - invoiceDetailViewModel.DiscountMoney) * (double)invoiceDetail.TaxPercentage * 0.01;
            invoiceDetailViewModel.PaidMoney = invoiceDetailViewModel.Money - invoiceDetailViewModel.DiscountMoney + invoiceDetailViewModel.TaxMoney;

            return invoiceDetailViewModel;
        }
    }
}
