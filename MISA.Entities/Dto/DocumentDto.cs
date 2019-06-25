using System;

namespace MISA.Entities
{
    //Đối tượng trung chuyển dữ liệu của chứng từ
    //Tạo bởi: NBDUONG(20/6/2019)
    public class DocumentDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TextFilter { get; set; }
        public string TypeFilter { get; set; }
        public Guid PersonID { get; set; }
    }
}