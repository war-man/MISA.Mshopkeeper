using MISA.Commons;
using MISA.DL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    /// <summary>
    /// Lớp thao tác nghiệp vụ cho Sản phẩm
    /// </summary>
    /// Người tạo: ntxuan (20/6/2019)
    public class ProductBL : BaseBL
    {
        private ProductDL productDL;

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// Người tạo: ntxuan (20/6/2019)
        public ProductBL()
        {
            productDL = new ProductDL();
        }

        /// <summary>
        /// Hàm lấy ra tất cả các Sản phẩm
        /// </summary>
        /// <returns>Danh sách Sản phẩm</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public List<Product> GetAllProduct()
        {
            return productDL.GetAllProduct();
        }

        /// <summary>
        /// Hàm lấy Sản phẩm theo id
        /// </summary>
        /// <param name="productID">Id của Sản phẩm</param>
        /// <returns>Sản phẩm</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public Product GetProductByID(Guid productID)
        {
            var productId = Common.ConvertToNvarchar(productID);
            return productDL.GetProductByID(productId);
        }

        /// <summary>
        /// Hàm thêm mới Sản phẩm
        /// </summary>
        /// <param name="product">Sản phẩm</param>
        /// <returns>Trạng thái thêm mới</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int CreateProduct(Product product)
        {
            return productDL.CreateProduct(product);
        }

        /// <summary>
        /// Hàm cập nhật Sản phẩm
        /// </summary>
        /// <param name="product">Sản phẩm</param>
        /// <returns>Trạng thái cập nhật</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int UpdateProduct(Product product)
        {
            return productDL.UpdateProduct(product);
        }

        /// <summary>
        /// Hàm xóa Sản phẩm
        /// </summary>
        /// <param name="productID">Id Sản phẩm</param>
        /// <returns>Trạng thái xóa</returns>
        /// Người tạo: ntxuan (20/6/2019)
        public int DeleteProduct(Guid productID)
        {
            var productId = Common.ConvertToNvarchar(productID);
            return productDL.DeleteProduct(productId);
        }
    }
}
