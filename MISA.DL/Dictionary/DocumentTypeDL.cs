using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Hàm xử lý thao tác với dữ liệu về loại chứng từ
    /// Kế thừa lớp BaseDL xử lý nghiệp vụ tổng quát
    /// </summary>
    /// Tạo bởi: NBDUONG(19/6/2019)
    public class DocumentTypeDL : BaseDL<DocumentType>
    {
        /// <summary>
        /// Hàm lấy dữ liệu loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public List<DocumentType> GetAllDocumentTypes()
        {
            return GetAll("Proc_GetAllData", "DocumentType");
        }

        /// <summary>
        /// Hàm lấy dữ liệu loại đối tượng theo Id
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public DocumentType GetDocumentTypeByID(string documentTypeID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "DocumentType", "DocumentTypeID", documentTypeID);
        }

        /// <summary>
        /// Hàm tạo mới loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int CreateDocumentType(DocumentType documentType)
        {
            return SaveEntity("Proc_CreateDocumentType", documentType);
        }

        /// <summary>
        /// Hàm thay đổi thông tin loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int UpdateDocumentType(DocumentType documentType)
        {
            return SaveEntity("Proc_UpdateDocumentType", documentType);
        }

        /// <summary>
        /// Hàm xóa loại đối tượng
        /// </summary>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(20/6/2019)
        public int DeleteDocumentType(string documentTypeID)
        {
            return DeleteEntity("Proc_DeleteData", "DocumentType", "DocumentTypeID", documentTypeID);
        }
    }
}
