import { NextFunction, Request, Response } from "express";

export const validation =
  //uma função recebe um parametro "validations" e retorna outraa função, (chamamos de tank), para ser reaproveitavel tipa com any(qualquer tipo de dado)
  (validations: any) => (req: Request, res: Response, next: NextFunction) => {
    const erros: string[] = []; // tipar a a lista de erros

    const validations = {
      // criar uma constante com objeto com as chaves e valores que precisa
      title: "required",
      content: "required",
    };

    Object.entries(validations).forEach((validation) => {
      // usar o metodo de objeto "Object.entries" com o a constante como parametro e fazer um forEach
      const [key, value] = validation; //retornar o foreach com uma constate de lista(array) com valores, key, e value (chave e valores)

      if (value === "required") {
        // verificar se o value(valor) possui a string "required"
        if (!req.body[key]) erros.push(`${key} is required`); // verificar e se o req.body[key] NÃO possui a chave(key) e fazer uma adição na lista de erros(arrya de erros) com o .push()
      }
    });

    if (erros.length > 0) {
      // verificar se o array erros for maior que 0, e retorna o status 422 com o json de erro, caso não tenha nada na lista de erros, retorna next() para prosseguir com o processo
      return res.status(422).json({ erros });
    }

    return next();
  };
