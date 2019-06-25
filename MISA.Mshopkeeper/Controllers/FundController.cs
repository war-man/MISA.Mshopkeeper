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
        public async Task<IEnumerable<DocumentViewModel>> GetDataPagination(int pageNumber, int pageSize)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    await Task.Delay(100);
                    var documents = _documentBL.GetDocuments(pageNumber, pageSize);
                    return documents;
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
        /// Tạo bởi: NBDUONG(22/6/2019)
        [HttpPost]
        [Route("documents/GetTotalPages")]
        public int GetTotalPages(int pageSize)
        {
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    return documentBL.GetTotalPageNumber(pageSize);
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }
        /// <summary>
        /// Hàm lấy tổng số chứng từ
        /// </summary>
        /// <param name="pageSize">Kích thước một trang</param>
        /// <returns>Tổng số trang</returns>
        /// Tạo bởi: NBDUONG(22/6/2019)

        [HttpPost]
        [Route("documents/GetTotalDocuments")]
        public int GetTotalDocuments()
        {
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    return documentBL.GetTotalDocuments();
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }

        /// <summary>
        /// Hàm lấy ra danh sách loại chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("documentsType")]
        public IEnumerable<DocumentType> GetDocumentTypes()
        {
            try
            {
                using (DocumentTypeBL _documentTypeBL = new DocumentTypeBL())
                {
                    var documentTypes = _documentTypeBL.GetAllDocumentType();
                    return documentTypes;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy ra danh sách đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("people")]
        public IEnumerable<PersonViewModel> GetPeople()
        {
            try
            {
                using (PersonBL _personBL = new PersonBL())
                {
                    var people = _personBL.GetAllPeople();
                    return people;
                }
            }
            catch (Exception)
            {
                return null;
            }
           
        }

        /// <summary>
        /// Hàm lấy ra danh sách loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        [HttpGet]
        [Route("personTypes")]
        public IEnumerable<PersonType> GetPersonTypes()
        {
            try
            {
                using(PersonTypeBL _personTypeBL = new PersonTypeBL())
                {
                    var personTypes = _personTypeBL.GetAllPersonType();
                    return personTypes;
                }
            }
            catch (Exception)
            {
                return null;
            }
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
        public DocumentViewModel GetDocumentById(Guid id)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    var document = _documentBL.GetDocumentByID(id);
                    return document;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy ra chứng từ theo đối tượng nộp/nhận
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(18/5/2019)
        /// Sửa đổi bởi: NBDUONG(22/6/2019)
        [Route("documents/person/{id}")]
        public IEnumerable<DocumentViewModel> GetDocumentsByPersonID(Guid id)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    var documentVMs = _documentBL.GetDocumentsByPerson(id);
                    return documentVMs.Where(x => x.IsPaid == false);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy ra danh sách đối tượng theo id
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(19/5/2019)
        /// Sửa đổi bởi: NBDUONG(22/6/2019)
        [Route("people/{id}")]
        public async Task<PersonViewModel> GetPersonById(Guid id)
        {
            try
            {
                using (PersonBL _personBL = new PersonBL()) {
                    PersonViewModel personVM = _personBL.GetPersonByID(id);
                    await Task.Delay(100);
                    return personVM;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy ra chứng từ theo mã chứng từ
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(24/6/2019)
        [HttpPost]
        [Route("document/GetByDocumentCode")]
        public Document GetDocumentByDocumentCode(string documentCode)
        {
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    return documentBL.GetDocumentByDocumentCode(documentCode);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy mã phiếu thu tự sinh
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        [HttpGet]
        [Route("document/getAutoCollectCode")]
        public string GetAutoRenderDocumentCollectCode()
        {
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    return documentBL.GetAutoRenderDocumentCollectCode();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm lấy mã phiếu chi tự sinh
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        [HttpGet]
        [Route("document/getAutoPayCode")]
        public string GetAutoRenderDocumentPayCode()
        {
            try
            {
                using (DocumentBL documentBL = new DocumentBL())
                {
                    return documentBL.GetAutoRenderDocumentPayCode();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm tạo mới chứng từ
        /// </summary>
        /// <param name = "documentViewModel" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(23/5/2019)
        [HttpPost]
        [Route("documents/new")]
        public bool CreateNewDocument(DocumentViewModel documentViewModel)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    var document = _documentBL.MapDocumentViewModelToDocument(documentViewModel);
                    _documentBL.CreateDocument(document);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm thay đổi thông tin chứng từ
        /// </summary>
        /// <param name = "documentViewModel" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(28/5/2019)
        [HttpPost]
        [Route("documents/edit/{id}")]
        public bool EditDocument(DocumentViewModel documentViewModel)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL()) {
                    var document = _documentBL.MapDocumentViewModelToDocument(documentViewModel);
                    document.DocumentID = documentViewModel.DocumentID;
                    _documentBL.UpdateDocument(document);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm xóa chứng từ
        /// </summary>
        /// <param name = "DocumentID" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(30/5/2019)
        [HttpPost]
        [Route("documents/delete/{DocumentID}")]
        public bool DeleteDocument(Guid DocumentID)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL()) {
                    _documentBL.DeleteDocument(DocumentID);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm xóa nhiều chứng từ cùng 1 lúc
        /// </summary>
        /// <param name = "listID" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(7/6/2019)
        [HttpPost]
        [Route("documents/delete/listDocuments")]
        public bool DeleteMultiDocument(List<Guid> listID)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    foreach (var item in listID)
                    {
                        _documentBL.DeleteDocument(item);
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
        /// Hàm xử lý lọc dữ liệu chứng từ theo điều kiện lọc
        /// </summary>
        /// <param name = "documentDto" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(12/6/2019)
        [HttpPost]
        [Route("documents/filterData")]
        public IEnumerable<DocumentViewModel> FilterDocument(DocumentDto documentDto)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    return _documentBL.FilterDocument(documentDto);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Hàm xử lý lọc dữ liệu chứng từ theo ngày tháng
        /// </summary>
        /// <param name = "documentDto" ></ param >
        /// < returns ></ returns >
        /// Tạo bởi: NBDUONG(13/6/2019)
        [HttpPost]
        [Route("documents/getByDate")]
        public IEnumerable<DocumentViewModel> GetDocumentsByDate(DocumentDto documentDto)
        {
            try
            {
                using (DocumentBL _documentBL = new DocumentBL())
                {
                    return _documentBL.GetDocumentsByDate(documentDto);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}