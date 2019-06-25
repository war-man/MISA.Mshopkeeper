﻿using MISA.DL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MISA.BL
{
    /// <summary>
    /// Lớp chứa các hàm dùng chung cho các lớp nghiệp vụ khác
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class BaseBL : IDisposable
    {
        /// <summary>
        /// Hàm để chuyển từ Id dạng Guid sang chuỗi để chuyền vào store
        /// </summary>
        /// <param name="id">ID</param>
        /// <returns>Chuỗi hợp lệ trong store</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public string ConvertToNvarchar(object id)
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
        public int CompareDate(DateTime date1, DateTime date2)
        {
            DateTime date1Compare = new DateTime(date1.Year, date1.Month, date1.Day);
            DateTime date2Compare = new DateTime(date2.Year, date2.Month, date2.Day);
            int value = DateTime.Compare(date1Compare, date2Compare);
            return value;
        }

        //Dispose
        public void Dispose()
        {
            
        }
    }
}
