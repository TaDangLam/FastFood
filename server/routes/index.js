import { UserRoute } from "./UserRoute.js";
import { ProductRoute } from "./ProductRoute.js";
import { OptionRoute } from "./OptionProductRoute.js";
import { CategoryRoute } from "./CategoryRoute.js";
import { OrderRoute } from "./OrderRoute.js";
import { PaymentRoute } from "./PaymentRoute.js";
import { AddressRoute } from "./AddressRoute.js";
import { ReviewRoute } from "./ReviewRoute.js";


const routes = (app) => {
    app.use('/api/user', UserRoute);
    app.use('/api/product', ProductRoute);
    app.use('/api/option', OptionRoute);
    app.use('/api/category', CategoryRoute);
    app.use('/api/order', OrderRoute);
    app.use('/api/payment', PaymentRoute);
    app.use('/api/address', AddressRoute);
    app.use('/api/review', ReviewRoute)
}

export default routes;