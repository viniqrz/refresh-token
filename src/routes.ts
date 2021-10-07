import { Router } from "express";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);

router.get('/courses', (req, res) => {
  return res.json([
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'Elixir' },
    { id: 4, name: 'React Native' },
    { id: 5, name: 'Flutter' },
  ]);
});

export { router };