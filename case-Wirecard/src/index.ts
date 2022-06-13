import { CardController } from "./controller/CardController";
import { PaymentController } from "./controller/PaymentController";
import { UserController } from "./controller/UserController";
import { app } from "./services/App";

const userController = new UserController()
const cardController = new CardController()
const paymentController = new PaymentController()

app.post("/signup", userController.insertUser)
app.post("/login", userController.login)


app.post("/createCard", cardController.insertCard)

app.post("/creditPayment", paymentController.makeCreditPayment)
app.post("/boletoPayment", paymentController.makeBoletoPayment)
app.get("/user/payment", paymentController.getPayment)