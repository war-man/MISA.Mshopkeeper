using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace MISA.DL
{
    /// <summary>
    /// Lớp thực hiện các nghiệp vụ trực tiếp với csdl
    /// </summary>
    /// <typeparam name="T">Biến entity truyền vào</typeparam>
    /// Người tạo: ntxuan (20/6/2019)
    public class BaseDL<T>
    {
        /// <summary>
        /// Lấy tất cả các phần tử của một thực thể
        /// </summary>
        /// <param name="storeName">Tên store truyền vào</param>
        /// <param name="tableName"></param>
        /// <returns>Danh sách các phần tử</returns>
        /// Người tạo: NBDUONG
        public List<T> GetAll(string storeName, string tableName)
        {
            var entities = new List<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }
                    }
                    entities.Add(entity);
                }
            }
            return entities;
        }

        /// <summary>
        /// Hàm dùng để phân trang
        /// </summary>
        /// <param name="storeName">Tên store procedure</param>
        /// <param name="tableName">Tên bảng</param>
        /// <param name="pageNumber">Số trang</param>
        /// <param name="pageSize">Kích thước trang</param>
        /// <returns>Danh sách thực thể</returns>
        /// Người tạo: ntxuan (21/6/2019)
        public List<T> GetDataPagination(string storeName, string tableName, int pageNumber, int pageSize)
        {
            var entities = new List<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                sqlCommand.Parameters.AddWithValue("@PageNumber", pageNumber);
                sqlCommand.Parameters.AddWithValue("@PageSize", pageSize);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }
                    }
                    entities.Add(entity);
                }
            }
            return entities;
        }

        /// <summary>
        /// Hàm lấy các phần tử theo một điều kiện nào đó
        /// </summary>
        /// <param name="storeName">Tên store procedure</param>
        /// <param name="tableName">Tên bảng truyền vào</param>
        /// <param name="columnName">Tên cột truyền vào</param>
        /// <param name="value">Giá trị truyền vào</param>
        /// <returns>Danh sách các thực thể</returns>
        /// Người tạo: NBDUONG (20/6/2019)
        public List<T> GetAllByAttribute(string storeName, string tableName, string columnName, string value)
        {
            var entities = new List<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                sqlCommand.Parameters.AddWithValue("@ColumnName", columnName);
                sqlCommand.Parameters.AddWithValue("@Value", value);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }
                    }
                    entities.Add(entity);
                }
            }
            return entities;
        }

        /// <summary>
        /// Hàm lấy một bản ghi theo một điều kiện nào đó
        /// </summary>
        /// <param name="storeName">Tên store procedure</param>
        /// <param name="tableName">Tên bảng truyền vào</param>
        /// <param name="columnName">Tên cột truyền vào</param>
        /// <param name="value">Giá trị truyền vào</param>
        /// <returns>Một bản ghi</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public T GetByAttribute(string storeName, string tableName, string columnName, string value)
        {
            var entity = Activator.CreateInstance<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                sqlCommand.Parameters.AddWithValue("@ColumnName", columnName);
                sqlCommand.Parameters.AddWithValue("@Value", value);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }
                    }
                    break;
                }
            }
            return entity;
        }

        /// <summary>
        /// Hàm lấy tổng số bản ghi của một bảng
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="tableName"></param>
        /// <returns>Tổng số bản ghi</returns>
        /// Người tạo: NBDUONG (21/6/2019)
        public int GetTotalRecord(string storeName, string tableName)
        {
            var totalRecord = 0;
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    totalRecord = (int)sqlDataReader.GetValue(0);
                    break;
                }
            }
            return totalRecord;
        }

        /// <summary>
        /// Phương thức dùng để thêm mới và sửa đổi một đối tượng
        /// </summary>
        /// <param name="storeName">Tên store procedure</param>
        /// <param name="entity">Thực thể truyền vào</param>
        /// <returns>Số lượng bản ghi được thực hiện thành công</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int SaveEntity(string storeName, T entity)
        {
            int result = 0;
            using (DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;
                try
                {
                    foreach (SqlParameter parameter in parameters)
                    {
                        var paramName = parameter.ToString().Replace("@", string.Empty);
                        var property = entity.GetType().GetProperty(paramName);
                        if (property != null)
                        {
                            var paramValue = property.GetValue(entity);
                            parameter.Value = paramValue != null ? paramValue : DBNull.Value;
                        }
                        else
                        {
                            parameter.Value = DBNull.Value;
                        }
                    }
                    result = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    sqlTransaction.Rollback();
                }
                return result;
            }
        }

        /// <summary>
        /// Hàm xóa các phần tử theo điều kiện nào đó
        /// </summary>
        /// <param name="storeName">Tên store procedure</param>
        /// <param name="tableName">Tên bảng truyền vào</param>
        /// <param name="columnName">Tên cột truyền vào</param>
        /// <param name="value">Giá trị truyền vào</param>
        /// <returns>Số bản ghi được xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteEntity(string storeName, string tableName, string columnName, string value)
        {
            int result = 0;
            using (DataAccess dataAccess = new DataAccess())
            {

                var sqlCommand = dataAccess.SqlCommand;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;
                try
                {
                    sqlCommand.CommandText = storeName;
                    sqlCommand.Parameters.AddWithValue("@TableName", tableName);
                    sqlCommand.Parameters.AddWithValue("@ColumnName", columnName);
                    sqlCommand.Parameters.AddWithValue("@Value", value);
                    result = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    sqlTransaction.Rollback();
                }
            }
            return result;
        }

        public void Dispose()
        {
        }
    }
}
