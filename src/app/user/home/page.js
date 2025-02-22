import Home from '../../component/user/home'
import Coupon from "../../../services/Coupon";
import Store from "../../../services/Store";




export default async function Homepage() {

 
  const response = await Coupon.getAll();
  const responseStore = await Store.getAll();

    return (
        <div>
            <Home response={response} responseStore={responseStore} />
        </div>
    )
        

}