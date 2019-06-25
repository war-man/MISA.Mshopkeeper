using MISA.Entities;
using System;

namespace MISA.Mshopkeeper.Models.ViewModels
{
    /// <summary>
    /// Lớp để lấy dữ liệu chứng từ
    /// Tạo bởi: NBDUONG(15/5/2019)
    /// </summary>
    public class DocumentViewModel
    {
        #region Properties
        //Id
        public Guid DocumentID { get; set; }
        //Mã chứng từ
        public string DocumentCode { get; set; }
        //Ngày chứng từ
        public DateTime DocumentDate { get; set; }
        //Tổng tiền
        public decimal TotalMoney { get; set; }
        //Lý do
        public string Reason { get; set; }
        //Địa chỉ
        public string DocumentAddress { get; set; }
        //Tên người nộp/nhận
        public string ReceiverName { get; set; }
        //Loại chứng từ
        public string DocumentTypeName { get; set; }
        //Mã đối tượng
        public string PersonCode { get; set; }
        //Tên đối tượng
        public string PersonName { get; set; }
        //Mã nhân viên
        public string EmployeeCode { get; set; }
        //Tên nhân viên
        public string EmployeeName { get; set; }
        //Số tiền phải trả
        public decimal MoneyHasToPay { get; set; }
        //Số tiền chưa trả
        public decimal MoneyHasNotPaid { get; set; }
        //Số tiền đã trả
        public decimal AmountPaid { get; set; }
        //Check chứng từ được trả chưa
        public bool IsPaid { get; set; }
        //Check loại chứng từ là Khác hay trả nợ
        public int CheckType { get; set; }
        #endregion

        #region ForeignKeys
        ////Khóa ngoại tới bảng loại chứng từ
        public Guid DocumentTypeID { get; set; }
        //Khóa ngoại tới bảng đối tượng
        public Guid PersonID { get; set; }
        //Khóa ngoại tới bảng nhân viên
        public Guid EmployeeID { get; set; }
        #endregion

        #region Constructors
        public DocumentViewModel()
        {
            DocumentID = Guid.NewGuid();
            IsPaid = true;
        }
        #endregion
    }
}