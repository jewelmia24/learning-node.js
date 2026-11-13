import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/productService";
import type { IProduct } from "../types/produc";
import { bodyParser } from "../utils/bodyParse";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  //   const products = [
  //     {
  //       id: 1,
  //       name: "Product 1",
  //       price: 100,
  //     },
  //     {
  //       id: 2,
  //       name: "Product 2",
  //       price: 200,
  //     },
  //   ];

  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  const products = productService();

  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  if (url === "/products" && method === "GET") {
    // const products = productService();
    sendResponse(res, 200, true, "products retrive successfully", products);
  } else if (method === "GET" && id !== null) {
    // const products = productService();
    const product = products.find((p: IProduct) => p.id === id);
    if (!product) {
      return sendResponse(res, 404, false, "product not found");
    }
    sendResponse(res, 200, true, "product retrive successfully", product);
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: products.length + 1,
      ...body,
    };
    // const products = productService();
    products.push(newProduct);
    createProduct(products);

    sendResponse(res, 201, true, "products created successfully", newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const productIndex = products.findIndex((p: IProduct) => p.id === id);

    if (productIndex < 0) {
      return sendResponse(res, 404, false, "product not found");
    }

    products[productIndex] = {
      id: products[productIndex].id,
      ...body,
    };

    createProduct(products);
    sendResponse(
      res,
      201,
      true,
      "products update successfully",
      products[productIndex],
    );
  } else if (method === "DELETE" && id !== null) {
    const productIndex = products.findIndex((p: IProduct) => p.id === id);

    if (productIndex < 0) {
      return sendResponse(res, 404, false, "product not found");
    }

    products.splice(productIndex, 1);

    createProduct(products);
    sendResponse(res, 200, true, "product deleted successfully");
  }
};

export default productController;
