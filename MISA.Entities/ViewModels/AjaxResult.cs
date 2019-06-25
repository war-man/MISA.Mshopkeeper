using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp dùng để chứa kết quả trả về khi gọi ajax
    /// </summary>
    /// Người tạo: ntxuan (24/6/2019)
    public class AjaxResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public string Messenger { get; set; }
    }
}
