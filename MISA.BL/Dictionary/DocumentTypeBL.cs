using MISA.Commons;
using MISA.DL;
using MISA.DL.Dictionary;
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
    /// Lớp thao tác nghiệp vụ cho Loại chứng từ
    /// </summary>
    /// Người tạo: NBDUONG (20/6/2019)
    public class DocumentTypeBL : BaseBL
    {
        private DocumentTypeDL documentTypeDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: NBDUONG (20/6/2019)
        public DocumentTypeBL()
        {
            documentTypeDL = new DocumentTypeDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Loại chứng từ
        /// </summary>
        /// <returns>Danh sách Loại chứng từ</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public List<DocumentType> GetAllDocumentType()
        {
            return documentTypeDL.GetAllDocumentTypes();
        }

        /// <summary>
        /// Hàm lấy Loại chứng từ theo id
        /// </summary>
        /// <param name="documentTypeID">Id của Loại chứng từ</param>
        /// <returns>Loại chứng từ</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public DocumentType GetDocumentTypeByID(Guid documentTypeID)
        {
            var documentTypeId = Common.ConvertToNvarchar(documentTypeID);
            return documentTypeDL.GetDocumentTypeByID(documentTypeId);
        }

        /// <summary>
        /// Hàm thêm mới Loại chứng từ
        /// </summary>
        /// <param name="documentType">Loại chứng từ</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int CreateDocumentType(DocumentType documentType)
        {
            return documentTypeDL.CreateDocumentType(documentType);
        }

        /// <summary>
        /// Hàm cập nhật Loại chứng từ
        /// </summary>
        /// <param name="documentType">Loại chứng từ</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int UpdateDocumentType(DocumentType documentType)
        {
            return documentTypeDL.UpdateDocumentType(documentType);
        }

        /// <summary>
        /// Hàm xóa Loại chứng từ
        /// </summary>
        /// <param name="documentTypeID">Id Loại chứng từ</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public int DeleteDocumentType(Guid documentTypeID)
        {
            var documentTypeId = Common.ConvertToNvarchar(documentTypeID);
            return documentTypeDL.DeleteDocumentType(documentTypeId);
        }
    }
}
