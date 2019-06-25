using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{ 
    /// <summary>
    /// Lớp dùng để thao tác với bảng product trong DB
    /// </summary>
    /// Người tạo: ntxuan (19/6/2019)
    public class ProductDL : BaseDL<Product>
    {
        /// <summary>
        /// Hàm lấy ra tất cả các sản phẩm
        /// </summary>
        /// <returns>Danh sách các sản phẩm</returns>
        /// Người tạo: ntxuan (19/6/2019)
        public List<Product> GetAllProduct()
        {
            return GetAll("Proc_GetAllData", "Product");
        }

        /// <summary>
        /// Lấy ra các sản phẩm theo id của hóa đơn
        /// </summary>
        /// <param name="invoiceID">Id hóa đơn</param>
        /// <returns>Danh sách các sản phẩm</returns>
        /// Người tạo: ntxuan (19/6/2019)
        public List<Product> GetAllProductByInvoicetID(string invoiceID)
        {
            return GetAllByAttribute("Proc_GetAllDataByAttribute", "Product", "InvoiceID", invoiceID);
        }

        /// <summary>
        /// Lấy ra sản phẩm theo id
        /// </summary>
        /// <param name="productID">id sản phẩm</param>
        /// <returns>Sản phẩm</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Product GetProductByID(string productID)
        {
            return GetByAttribute("Proc_GetDataByAttribute", "Product", "ProductID", productID);
        }

        /// <summary>
        /// Hàm thêm mới sản phẩm
        /// </summary>
        /// <param name="product">Đối tượng sản phẩm</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateProduct(Product product)
        {
            return SaveEntity("Proc_CreateProduct", product);
        }

        /// <summary>
        /// Hàm cập nhật sản phẩm
        /// </summary>
        /// <param name="product">Sản phẩm</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateProduct(Product product)
        {
            return SaveEntity("Proc_UpdateProduct", product);
        }

        /// <summary>
        /// Hàm xóa sản phẩm
        /// </summary>
        /// <param name="productID">ID sản phẩm</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteProduct(string productID)
        {
            return DeleteEntity("Proc_DeleteData", "Product", "ProductID", productID);
        }
    }
}
