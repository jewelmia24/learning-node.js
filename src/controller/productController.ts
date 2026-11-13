import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/productService";
import type { IProduct } from "../types/produc";

const productController = (req: IncomingMessage, res: ServerResponse) => {
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
  const products = productService();
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");

  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "this is products page",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "this is products page",
        data: product,
      }),
    );
  }
};

export default productController;
