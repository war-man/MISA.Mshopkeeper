using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Hàm xử lý thao tác với dữ liệu về chứng từ
    /// Kế thừa lớp BaseDL xử lý nghiệp vụ tổng quát
    /// </summary>
    /// Tạo bởi: NBDUONG(19/6/2019)
    public class DocumentDL : BaseDL<Document>
    {
       
        /// <summary>
        /// Hàm lấy dữ liệu tất cả chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<Document> GetDocumentData()
        {
            return GetAll("Proc_GetAllData", "Document");
        }

        /// <summary>
        /// Hàm phân trang chứng từ
        /// </summary>
        /// <param name="pageNumber">Số trang</param>
        /// <param name="pageSize">Kích thước trang</param>
        /// <returns>Danh sách chứng từ</returns>
        /// Tạo bởi: NBDUONG (21/6/2019)
        public List<Document> GetDataPagination(int pageNumber, int pageSize)
        {
            return GetDataPagination("Proc_Pagination", "Document", pageNumber, pageSize);
        }

        /// <summary>
        /// Hàm lấy ra tổng số chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(22/6/2019)
        public int GetTotalDocument()
        {
            return GetTotalRecord("Proc_GetTotalRows", "Document");
        }

        /// <summary>
        /// Hàm lấy dữ liệu chứng từ theo Id
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public Document GetDocumentByID(string documentID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Document", "DocumentID", documentID);
        }

        /// <summary>
        /// Hàm lấy dữ liệu tất cả chứng từ theo loại chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<Document> GetDocumentsByDocumentType(string Id)
        {
            return GetAllByAttribute("Proc_GetAllDataByAttribute", "Document", "DocumentTypeID", Id);
        }

        /// <summary>
        /// Hàm lấy dữ liệu tất cả chứng từ theo đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<Document> GetDocumentsByPerson(string Id)
        {
            return GetAllByAttribute("Proc_GetAllDataByAttribute", "Document", "PersonID", Id);
        }

        /// <summary>
        /// Hàm lấy mã chứng từ sinh tự động
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        public List<string> GetAutoRenderDocumentCode()
        {
            var listCode = new List<string>();
            using (DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = "Proc_GetDocumentCodeAuto";
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var documentCollectCode = (string)sqlDataReader.GetValue(0);
                    var documentPayCode = (string)sqlDataReader.GetValue(1);
                    listCode.Add(documentCollectCode);
                    listCode.Add(documentPayCode);
                    break;
                }
            }
            return listCode;
        }

        /// <summary>
        /// Hàm lấy chứng từ theo mã chứng từ
        /// </summary>
        /// <param name="documentCode"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(24/6/2019)
        public Document GetDocumentByDocumentCode(string documentCode)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Document", "DocumentCode", documentCode);
        }

        /// <summary>
        /// Hàm tạo mới chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int CreateDocument(Document document)
        {
            return SaveEntity("Proc_CreateDocument", document);
        }

        /// <summary>
        /// Hàm thay đổi thông tin chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int UpdateDocument(Document document)
        {
            return SaveEntity("Proc_UpdateDocument", document);
        }

        /// <summary>
        /// Hàm xóa chứng từ
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int DeleteDocument(string documentID)
        {
            return DeleteEntity("Proc_DeleteData", "Document", "DocumentID", documentID);
        }
    }
}
