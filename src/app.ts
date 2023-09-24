import express from "express";
import {
  createTodo,
  deleteTodo,
  getToDos,
  getTodosByID,
  updateTodos,
} from "./logic";
import { validation } from "./middlewares/validations";
import { createTodoValidation } from "./schemas/createTodoValidations";
import { isTodoValid } from "./middlewares/isTodoIdValid";
import { editTodoValidation } from "./schemas/editTodoValidations";

const app = express();

app.use(express.json());

app.get("/", getToDos);
app.get("/:todoId", isTodoValid, getTodosByID);
app.post("/", validation(createTodoValidation), createTodo);
app.delete("/:todoId", isTodoValid, deleteTodo);
app.put("/:todoId", validation(editTodoValidation), isTodoValid, updateTodos);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
