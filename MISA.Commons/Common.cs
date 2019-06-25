using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Commons
{
    /// <summary>
    /// Lớp dùng để chứa các phương thức dùng chung cho nghiệp vụ
    /// </summary>
    /// Người tạo: ntxuan (23/6/2019)
    public class Common
    {
        /// <summary>
        /// Hàm để chuyển từ Id dạng Guid sang chuỗi để chuyền vào store
        /// </summary>
        /// <param name="id">ID</param>
        /// <returns>Chuỗi hợp lệ trong store</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public static string ConvertToNvarchar(object id)
        {
            string idNew = id.ToString();
            return "'" + id + "'";
        }

        /// <summary>
        /// Hàm để so sánh hai giá trị datetime
        /// </summary>
        /// <param name="date1">Giá trị datetime1</param>
        /// <param name="date2">Giá trị datetime2</param>
        /// <returns>Giá trị nguyên</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public static int CompareDate(DateTime date1, DateTime date2)
        {
            DateTime date1Compare = new DateTime(date1.Year, date1.Month, date1.Day);
            DateTime date2Compare = new DateTime(date2.Year, date2.Month, date2.Day);
            int value = DateTime.Compare(date1Compare, date2Compare);
            return value;
        }

        /// <summary>
        /// Hàm validate dữ liệu nhập vào input
        /// </summary>
        /// <param name="input"></param>
        /// <param name="maxLength"></param>
        /// <returns></returns>
        /// Tạo bởi: NBDUONG(25/6/2019)
        public static bool IsValid(string input, int maxLength)
        {
            var flag = true;
            if (String.IsNullOrEmpty(input))
            {
                flag = false;
            }
            else if(input.Length > maxLength || input.Length < 0)
            {
                flag = false;
            }
            else
            {
                flag = true;    
            }
            return flag;
        }
    }
}
