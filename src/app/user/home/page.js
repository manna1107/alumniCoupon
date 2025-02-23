import Home from '../../component/user/home'
import Coupon from "../../../services/Coupon";
import Store from "../../../services/Store";
import Save from "../../../services/Save";



export default async function Homepage() {
    

 
  const response = await Coupon.getAll();
  const responseStore = await Store.getAll();
  const savedCoupon = await Save.getAll();
  console.log("savedCoupon",savedCoupon);
  

    return (
        <div>
            <Home response={response} responseStore={responseStore} savedCoupon={savedCoupon}/>
        </div>
    )
        

}