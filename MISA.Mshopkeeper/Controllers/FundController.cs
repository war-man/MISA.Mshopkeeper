using MISA.BL;
using MISA.BL.Dictionary;
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
    /// Hàm điều khiển các hoạt động của Quỹ tiền
    /// Tạo bởi: NBDUONG(15/5/2019)
    /// </summary>
    [RoutePrefix("fund")]
    public class FundController : ApiController
    {
        /// <summary>
        /// Lấy các hóa đơn để hiển thị 
        /// </summary>
        /// <returns>Danh sách hóa đơn</returns>
        /// Tạo bởi: NBDUONG (22/6/2019)
        [HttpGet]
        [Route("documents/{pageNumber}/{pageSize}")]
        public AjaxResult GetDataPagination(int pageNumber, int pageSize)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    ajaxResult.Data = _documentBL.GetDocuments(pageNumber, pageSize);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy tổng số trang
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Tạo bởi: NBDUONG(22/6/2019)
        [HttpPost]
        [Route("documents/GetTotalPages")]
        public AjaxResult GetTotalPages(int pageSize)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    ajaxResult.Data = documentBL.GetTotalPageNumber(pageSize);
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu tổng số trang. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy tổng số chứng từ
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Tạo bởi: NBDUONG(22/6/2019)

        [HttpPost]
        [Route("documents/GetTotalDocuments")]
        public AjaxResult GetTotalDocuments()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    ajaxResult.Data = documentBL.GetTotalDocuments();
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu tổng số chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra danh sách loại chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("documentsType")]
        public AjaxResult GetDocumentTypes()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentTypeBL _documentTypeBL = new DocumentTypeBL())
                {
                    ajaxResult.Data = _documentTypeBL.GetAllDocumentType();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu loại chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra danh sách đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("people")]
        public AjaxResult GetPeople()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (PersonBL _personBL = new PersonBL())
                {
                    ajaxResult.Data = _personBL.GetAllPeople();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu đối tượng. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra danh sách loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("personTypes")]
        public AjaxResult GetPersonTypes()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using(PersonTypeBL _personTypeBL = new PersonTypeBL())
                {
                    ajaxResult.Data = _personTypeBL.GetAllPersonType();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu loại đối tượng. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra chứng từ theo id
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(18/5/2019)
        /// Sửa đổi bởi: NBDUONG(22/6/2019)
        [HttpGet]
        [Route("{id}")]
        public AjaxResult GetDocumentById(Guid id)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    ajaxResult.Data = _documentBL.GetDocumentByID(id);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra chứng từ theo đối tượng nộp/nhận
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(18/5/2019)
        /// Sửa đổi bởi: NBDUONG(22/6/2019)
        [Route("documents/person/{id}")]
        public AjaxResult GetDocumentsByPersonID(Guid id)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    var documentVms = _documentBL.GetDocumentsByPerson(id);
                    ajaxResult.Data = documentVms.Where(x => x.IsPaid == false);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu chứng từ theo đối tượng. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra danh sách đối tượng theo id
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(19/5/2019)
        /// Sửa đổi bởi: NBDUONG(22/6/2019)
        [Route("people/{id}")]
        public AjaxResult GetPersonById(Guid id)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (PersonBL _personBL = new PersonBL()) {
                    PersonViewModel personVM = _personBL.GetPersonByID(id);
                    ajaxResult.Data = personVM;
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu đối tượng. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy ra chứng từ theo mã chứng từ
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(24/6/2019)
        [HttpPost]
        [Route("document/GetByDocumentCode")]
        public AjaxResult GetDocumentByDocumentCode(string documentCode)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    ajaxResult.Data = documentBL.GetDocumentByDocumentCode(documentCode);
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu chứng từ theo mã chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy mã phiếu thu tự sinh
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        [HttpGet]
        [Route("document/getAutoCollectCode")]
        public AjaxResult GetAutoRenderDocumentCollectCode()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    ajaxResult.Data = documentBL.GetAutoRenderDocumentCollectCode();
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu mã phiếu thu. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm lấy mã phiếu chi tự sinh
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        [HttpGet]
        [Route("document/getAutoPayCode")]
        public AjaxResult GetAutoRenderDocumentPayCode()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    ajaxResult.Data = documentBL.GetAutoRenderDocumentPayCode();
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lấy dữ liệu mã phiếu chi. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm tạo mới chứng từ
        /// </summary>
        /// <param name = "documentViewModel" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(23/5/2019)
        [HttpPost]
        [Route("documents/new")]
        public AjaxResult CreateNewDocument(DocumentViewModel documentViewModel)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    var document = _documentBL.MapDocumentViewModelToDocument(documentViewModel);
                    _documentBL.CreateDocument(document);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi thêm chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm thay đổi thông tin chứng từ
        /// </summary>
        /// <param name = "documentViewModel" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(28/5/2019)
        [HttpPost]
        [Route("documents/edit/{id}")]
        public AjaxResult EditDocument(DocumentViewModel documentViewModel)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL()) {
                   
                    var document = _documentBL.MapDocumentViewModelToDocument(documentViewModel);
                    document.DocumentID = documentViewModel.DocumentID;
                    _documentBL.UpdateDocument(document);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi sửa chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm xóa chứng từ
        /// </summary>
        /// <param name = "DocumentID" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(30/5/2019)
        [HttpPost]
        [Route("documents/delete/{DocumentID}")]
        public AjaxResult DeleteDocument(Guid DocumentID)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL()) {
                    _documentBL.DeleteDocument(DocumentID);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi xóa chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm xóa nhiều chứng từ cùng 1 lúc
        /// </summary>
        /// <param name = "listID" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(7/6/2019)
        [HttpPost]
        [Route("documents/delete/listDocuments")]
        public AjaxResult DeleteMultiDocument(List<Guid> listID)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    foreach (var item in listID)
                    {
                        _documentBL.DeleteDocument(item);
                    }
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi xóa chứng từ. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm xử lý lọc dữ liệu chứng từ theo điều kiện lọcl
        /// </summary>
        /// <param name = "documentDto" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(12/6/2019)
        [HttpPost]
        [Route("documents/filterData")]
        public AjaxResult FilterDocument(DocumentDto documentDto)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    ajaxResult.Data = _documentBL.FilterDocument(documentDto);
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lọc dữ liệu. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm xử lý lọc dữ liệu chứng từ theo ngày tháng
        /// </summary>
        /// <param name = "documentDto" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(13/6/2019)
        [HttpPost]
        [Route("documents/getByDate")]
        public AjaxResult GetDocumentsByDate(DocumentDto documentDto)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    ajaxResult.Data = _documentBL.GetDocumentsByDate(documentDto);
                    ajaxResult.Success = true; 
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messenger = "Có lỗi xảy ra khi lọc dữ liệu. Xin vui lòng liên hệ MISA để giải quyết";
            }
            return ajaxResult;
        }
    }
}