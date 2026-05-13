import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "./../types/product.type";
import { parseBody } from "../utilities/parseBody";
import { sendResponse } from "../utilities/sendResponse";


export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({ message: "The is product route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);

    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({ message: "The is single product route", data: product }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({
        message: "Product is successfully inserted",
        data: products,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });

      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    products[index] = {
        id: products[index].id,
        ...body
    }
    insertProduct(products)
    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({
        message: "Product data is updated",
        data: products,
      }),
    );
  }
  else if(method === "DELETE" && id!==null){
    const products = readProduct()
    const index = products.findIndex((p:IProduct)=>p.id===id)
    if(index<0){
        res.writeHead(404, { "content-type": "application/json" });

      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    products.splice(index,1);
    insertProduct(products);
    return sendResponse(res,true,200,"Product is deleted successfully",products)
  }
};
