import { Request, Response } from "express";
import { todoDatabase } from "./database";
import { v4 as uuidv4 } from "uuid";

export const getToDos = (req: Request, res: Response) => {
  return res.status(200).json(todoDatabase);
};

export const getTodosByID = (req: Request, res: Response) => {
  return res.status(200).json(res.locals.foundTodo); // chama a res.locals.nomedavariavel
  //ANIMAL PLANET
};

export const createTodo = (req: Request, res: Response) => {
  const newTodo = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
  };

  todoDatabase.push(newTodo);

  return res
    .status(201)
    .json({ menssage: "todo sucssfully created", todo: newTodo });
};

export const deleteTodo = (req: Request, res: Response) => {
  const index = todoDatabase.findIndex((todo) => todo.id === req.params.todoId);

  todoDatabase.splice(index, 1);
  return res.status(200).json({ message: "todo sucssfully removed" });
};

export const updateTodos = (req: Request, res: Response) => {
  const index = todoDatabase.findIndex((todo) => todo.id === req.params.todoId);

  const NewTodo = {
    id: req.params.todoId,
    title: req.body.title,
    content: req.body.content,
  };
  todoDatabase.splice(index, 1, NewTodo);
  return res
    .status(200)
    .json({ message: "todo sucssfully Updated", todo: NewTodo });
};
