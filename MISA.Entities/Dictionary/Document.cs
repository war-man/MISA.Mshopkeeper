using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    /// <summary>
    /// Hàm xây dựng đối tượng chứng từ
    /// Tạo bởi: NBDUONG(15/5/2019)
    /// </summary>
    public class Document : BaseEntity
    {
        #region Properties
        //Id
        public Guid DocumentID { get; set; }
        //Mã chứng từ
        [Required(ErrorMessage = "Vui lòng điền mã chứng từ")]
        [MaxLength(20)]
        public string DocumentCode { get; set; }
        //Ngày chứng từ
        [Required(ErrorMessage = "Vui lòng điền ngày chứng từ")]
        public DateTime DocumentDate { get; set; }
        //Tổng tiền
        [Required(ErrorMessage = "Vui lòng điền tổng tiền")]
        public decimal TotalMoney { get; set; }
        //Số tiền phải trả
        public decimal MoneyHasToPay { get; set; }
        //Số tiền chưa trả
        public decimal MoneyHasNotPaid { get; set; }
        //Số tiền đã trả
        [Required(ErrorMessage = "Vui lòng điền số tiền trả")]
        public decimal AmountPaid { get; set; }
        //Người nộp/nhận
        [MaxLength(100)]
        public string ReceiverName { get; set; }
        //Lý do
        [MaxLength(255)]
        public string Reason { get; set; }
        //Địa chỉ
        [MaxLength(255)]
        public string DocumentAddress { get; set; }

        //Check được trả chưa
        [Required]
        public bool IsPaid { get; set; }

        //Check loại chứng từ là Khác hay trả nợ
        [Required]
        public int CheckType { get; set; }
        #endregion

        #region ForeignKey
        //Khóa ngoại đến bảng Person
        [Required]
        public Guid PersonID { get; set; }

        //Khóa ngoại đến bảng Employee
        [Required]
        public Guid EmployeeID { get; set; }

        //Khóa ngoại đến bảng loại chứng từ
        [Required]
        public Guid DocumentTypeID { get; set; }

        #endregion

        #region Constructors
        //Hàm khởi tạo chứng từ
        public Document()
        {
            DocumentID = Guid.NewGuid();
            DocumentDate = DateTime.Now;
            IsPaid = true;
        }

        #endregion
    }
}