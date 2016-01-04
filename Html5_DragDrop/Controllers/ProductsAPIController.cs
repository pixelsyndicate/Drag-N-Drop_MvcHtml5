using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Html5_DragDrop.Models;

namespace Html5_DragDrop.Controllers
{
    public class ProductsAPIController : ApiController
    {

        ApplicationEntities ctx;

        public ProductsAPIController()
        {
            ctx = new ApplicationEntities();
        }

        [Route("Products")]
        public IEnumerable<Product> GetProducts()
        {
            return ctx.Products.ToList();
        }

    }
}