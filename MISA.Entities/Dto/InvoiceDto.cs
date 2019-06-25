using System;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp để truyền dữ liệu từ client lên server
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class InvoiceDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TextFilter { get; set; }
        public string TypeFilter { get; set; }
    }
}