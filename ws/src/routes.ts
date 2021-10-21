import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authentication", new AuthenticateUserController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);
router.get("/messages/last3", new GetLastMessagesController().handle);

export { router }