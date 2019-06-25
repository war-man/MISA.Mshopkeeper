using MISA.Commons;
using MISA.DL;
using MISA.DL.Dictionary;
using MISA.Entities;
using MISA.Mshopkeeper.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MISA.BL.Dictionary
{
    /// <summary>
    /// Hàm xử lý nghiệp vụ chứng từ
    /// </summary>
    /// Tạo bởi: NBDUONG(19/6/2019)
    public class DocumentBL : BaseBL
    {
        private DocumentDL _documentDL;

        public DocumentBL()
        {
            _documentDL = new DocumentDL();
        }

        /// <summary>
        /// Hàm lấy dữ liệu tất cả chứng từ
        /// </summary>
        /// <returns>List<Document></returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        public List<DocumentViewModel> GetDocuments(int pageNumber, int pageSize)
        {
            if(pageNumber > GetTotalPageNumber(pageSize))
            {
                pageNumber = GetTotalPageNumber(pageSize);
            }
            var documentViewModels = new List<DocumentViewModel>();
            var listDocuments = GetDataPagination(pageNumber, pageSize);
            foreach (var item in listDocuments)
            {
                var documentVM = MapDocumentToDocumentViewModel(item);
                documentViewModels.Add(documentVM);
            }
            return documentViewModels;
        }

        /// <summary>
        /// Hàm lấy tổng số trang khi thực hiện phân trang dữ liệu
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(22/6/2019)
        public int GetTotalPageNumber(int pageSize)
        {
            var totalRecord = GetTotalDocuments();
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
        /// Tạo bởi: NBDUONG(22/6/2019)
        public int GetTotalDocuments()
        {
            return _documentDL.GetTotalDocument();
        }

        /// <summary>
        /// Hàm phân trang chứng từ
        /// </summary>
        /// <param name="pageNumber">Số trang</param>
        /// <param name="pageSize">Kích thước trang</param>
        /// <returns>Danh sách chứng từ</returns>
        /// Người tạo: NBDUONG (21/6/2019)
        public List<Document> GetDataPagination(int pageNumber, int pageSize)
        {
            return _documentDL.GetDataPagination(pageNumber, pageSize);
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo Id của chứng từ
        /// </summary>
        /// <param name="documentID"></param>
        /// <returns>Document</returns>
        /// Tạo bởi: NBDUONG(19/6/2019)
        public DocumentViewModel GetDocumentByID(Guid documentID)
        {
            var documentId = Common.ConvertToNvarchar(documentID);
            var document =  _documentDL.GetDocumentByID(documentId);
            var documentVM = MapDocumentToDocumentViewModel(document);
            return documentVM;
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo loại chứng từ
        /// Tạo bởi: NBDUONG(20/6/2019)
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<Document> GetDocumentsByDocumentType(Guid Id)
        {
            var documentTypeID = Common.ConvertToNvarchar(Id);
            return _documentDL.GetDocumentsByDocumentType(documentTypeID);
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo người nộp/ nhận
        /// Tạo bởi: NBDUONG(20/6/2019)
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<DocumentViewModel> GetDocumentsByPerson(Guid Id)
        {
            var personID = Common.ConvertToNvarchar(Id);
            var listDocuments = _documentDL.GetDocumentsByPerson(personID);
            var listDocumentVMs = new List<DocumentViewModel>();
            foreach(var item in listDocuments)
            {
                var document = MapDocumentToDocumentViewModel(item);
                listDocumentVMs.Add(document);
            }
            return listDocumentVMs;
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo mã chứng từ
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(24/6/2019)
        public Document GetDocumentByDocumentCode(string documentCode)
        {
            var codeConvert = Common.ConvertToNvarchar(documentCode);
            return _documentDL.GetDocumentByDocumentCode(codeConvert);
        }

        /// <summary>
        /// Hàm sinh mã phiếu thu tự động
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        public string GetAutoRenderDocumentCollectCode()
        {
            var listDocumentCollectCode = _documentDL.GetAutoRenderDocumentCode();
            return listDocumentCollectCode.First();
        }

        /// <summary>
        /// Hàm sinh mã phiếu chi tự động
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        public string GetAutoRenderDocumentPayCode()
        {
            var listDocumentPayCode = _documentDL.GetAutoRenderDocumentCode();
            return listDocumentPayCode.Last();
        }

        /// <summary>
        /// Hàm tạo mới chứng từ
        /// </summary>
        /// <param name="document"></param>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int CreateDocument(Document document)
        {
            return _documentDL.CreateDocument(document);
        }

        /// <summary>
        /// Hàm cập nhật chứng từ
        /// </summary>
        /// <param name="document">Chứng từ</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int UpdateDocument(Document document)
        {
            return _documentDL.UpdateDocument(document);
        }

        /// <summary>
        /// Hàm xóa hóa đơn
        /// </summary>
        /// <param name="documentID">Id Chứng từ</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int DeleteDocument(Guid Id)
        {
            var documentID = Common.ConvertToNvarchar(Id);
            return _documentDL.DeleteDocument(documentID);
        }

        /// <summary>
        /// Hàm kiểm tra chứng từ theo điều kiện lọc
        /// </summary>
        /// <param name="documentDto"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(21/6/2019)
        public List<Document> GetListDocumentsByFilter(DocumentDto documentDto)
        {
            var documents = new List<Document>();
            var listDocuments = _documentDL.GetDocumentData();
            if (documentDto.TypeFilter == "search-documentCode")
            {
                documents = listDocuments.Where(s => s.DocumentCode.ToLower().Contains(documentDto.TextFilter.ToLower())).ToList();
            }
            else if (documentDto.TypeFilter == "search-reason")
            {
                documents = listDocuments.Where(s => s.Reason.ToLower().Contains(documentDto.TextFilter.ToLower())).ToList();
            }
            else if (documentDto.TypeFilter == "search-personName")
            {
                var personBL = new PersonBL();
                documents = listDocuments.Where(s => personBL.GetPersonByID(s.PersonID).PersonName.ToLower().Contains(documentDto.TextFilter.ToLower())).ToList();
            }
            else if (documentDto.TypeFilter == "search-documentType")
            {
                var documentTypeBL = new DocumentTypeBL();
                documents = listDocuments.Where(s => documentTypeBL.GetDocumentTypeByID(s.DocumentTypeID).DocumentTypeName.ToLower().Contains(documentDto.TextFilter.ToLower())).ToList();
            }
            return documents;
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo điều kiện lọc
        /// </summary>
        /// <param name="documentDto"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(21/6/2019)
        public IEnumerable<DocumentViewModel> FilterDocument(DocumentDto documentDto)
        {
            var documentVMs = new List<DocumentViewModel>();
            foreach (var item in GetListDocumentsByFilter(documentDto))
            {
                var documentViewModel = MapDocumentToDocumentViewModel(item);
                documentVMs.Add(documentViewModel);
            }
            return documentVMs;
        }

        /// <summary>
        /// Hàm kiểm tra và lấy dữ liệu chứng từ theo ngày tháng
        /// </summary>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(21/6/2019)
        public List<Document> GetListDocumentsByDate(DateTime fromDate, DateTime toDate)
        {
            var documents = new List<Document>();
            foreach (var item in _documentDL.GetDocumentData())
            {
                if (Common.CompareDate(fromDate, item.DocumentDate) <= 0 && Common.CompareDate(toDate, item.DocumentDate) >= 0)
                {
                    documents.Add(item);
                }
            }
            return documents;
        }


        /// <summary>
        /// Hàm map dữ liệu chứng từ theo ngày tháng sang dạng VỉewModel
        /// </summary>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(21/6/2019)
        public IEnumerable<DocumentViewModel> GetDocumentsByDate(DocumentDto documentDto)
        {
           
            var documentViewModels = new List<DocumentViewModel>();
            var listDocuments = GetListDocumentsByDate(documentDto.FromDate, documentDto.ToDate);
            foreach (var item in listDocuments)
            {
                var document = MapDocumentToDocumentViewModel(item);
                documentViewModels.Add(document);
            }
            return documentViewModels.Where(x => x.IsPaid == true).OrderByDescending(x => x.DocumentDate);
        }

        /// <summary>
        /// Ánh xạ từ đối tượng Document sang đối tượng DocumentViewModel
        /// </summary>
        /// <param name="documentViewModel"></param>
        /// <returns>Document</returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public DocumentViewModel MapDocumentToDocumentViewModel(Document document)
        {
            var documentViewModel = new DocumentViewModel();
            var personBL = new PersonBL();
            var employeeBL = new EmployeeBL();
            var documentTypeBL = new DocumentTypeBL();
            documentViewModel.DocumentID = document.DocumentID;
            documentViewModel.DocumentCode = document.DocumentCode;
            documentViewModel.DocumentDate = document.DocumentDate;
            documentViewModel.TotalMoney = document.TotalMoney;
            documentViewModel.Reason = document.Reason;
            documentViewModel.DocumentAddress = document.DocumentAddress;
            documentViewModel.ReceiverName = document.ReceiverName;
            documentViewModel.DocumentTypeName = documentTypeBL.GetDocumentTypeByID(document.DocumentTypeID).DocumentTypeName;
            documentViewModel.PersonName = personBL.GetPersonByID(document.PersonID).PersonName;
            documentViewModel.PersonCode = personBL.GetPersonByID(document.PersonID).PersonCode;
            documentViewModel.EmployeeCode = employeeBL.GetEmployeeByID(document.EmployeeID).EmployeeCode;
            documentViewModel.EmployeeName = employeeBL.GetEmployeeByID(document.EmployeeID).EmployeeName;
            documentViewModel.MoneyHasToPay = document.MoneyHasToPay;
            documentViewModel.MoneyHasNotPaid = document.MoneyHasNotPaid;
            documentViewModel.AmountPaid = document.AmountPaid;
            documentViewModel.IsPaid = document.IsPaid;
            documentViewModel.CheckType = document.CheckType;
            documentViewModel.DocumentTypeID = document.DocumentTypeID;
            documentViewModel.PersonID = document.PersonID;
            documentViewModel.EmployeeID = document.EmployeeID;

            return documentViewModel;
        }

        /// <summary>
        /// Ánh xạ từ đối tượng DocumentViewModel sang đối tượng Document
        /// </summary>
        /// <param name="documentViewModel"></param>
        /// <returns>Document</returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public Document MapDocumentViewModelToDocument(DocumentViewModel documentVM)
        {
            var document = new Document();
     
            document.DocumentCode = documentVM.DocumentCode;
            document.DocumentDate = documentVM.DocumentDate;
            document.TotalMoney = documentVM.TotalMoney;
            document.Reason = documentVM.Reason;
            document.ReceiverName = documentVM.ReceiverName;
            document.MoneyHasToPay = documentVM.MoneyHasToPay;
            document.MoneyHasNotPaid = documentVM.MoneyHasNotPaid;
            document.AmountPaid = documentVM.AmountPaid;
            document.DocumentAddress = documentVM.DocumentAddress;
            document.IsPaid = documentVM.IsPaid;
            document.CheckType = documentVM.CheckType;
            document.DocumentTypeID = documentVM.DocumentTypeID;
            document.PersonID = documentVM.PersonID;
            document.EmployeeID = documentVM.EmployeeID;

            return document;
        }
    }
}
