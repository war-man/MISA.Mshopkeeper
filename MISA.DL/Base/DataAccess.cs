using System;
using System.Data;
using System.Data.SqlClient;

namespace MISA.DL
{
    /// <summary>
    /// Lớp dùng để kết nối tới database
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class DataAccess : IDisposable
    {
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private string _connectionString;


        public SqlCommand SqlCommand
        {
            get { return _sqlCommand; }
        }

        /// <summary>
        /// Hàm khỏi tạo mặc định để khởi tạo các chuỗi kết nối cần thiết
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public DataAccess()
        {
            _connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.MSHOPKEEPER01;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";

            // Khởi tạo đối tượng SqlConnection để kết nối tới Database:
            _sqlConnection = new SqlConnection(_connectionString);

            // Khởi tạo đối tượng SqlCommand để thao tác với Database:
            _sqlCommand = _sqlConnection.CreateCommand();

            // Khai báo CommandType kiểu thao tác với Database
            _sqlCommand.CommandType = CommandType.StoredProcedure;

            // Mở kết nối:
            _sqlConnection.Open();
        }

        /// <summary>
        /// Hàm dùng để thực thi câu lệnh cho trả về dữ liệu
        /// </summary>
        /// <param name="commandText">Tên store procedure</param>
        /// <returns>Các bản ghi lấy về</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public SqlDataReader ExecuteReader(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteReader();
        }

        /// <summary>
        /// Hàm dùng để thực thi câu lệnh cho trả về id bản ghi cuối
        /// </summary>
        /// <param name="commandText">Tên store procedure</param>
        /// <returns>id  của bản ghi mới thêm</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public object ExecuteScalar(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteScalar();
        }

        public void Dispose()
        {
            _sqlConnection.Close();
        }
    }
}
