using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Hàm xây dựng đối tượng loại chứng từ
    /// Tạo bởi: NBDUONG (15/5/2019)
    /// </summary>
    public class DocumentType : BaseEntity
    {
        #region Properties
        //Id
        public Guid DocumentTypeID { get; set; }
        //Tên loại đối tượng
        [Required]
        [MaxLength(255)]
        public string DocumentTypeName { get; set; }
        #endregion

        #region Constructors
        //Hàm khởi tạo đối tượng loại chứng từ
        public DocumentType()
        {
            DocumentTypeID = Guid.NewGuid();
        }
        #endregion
    }
}