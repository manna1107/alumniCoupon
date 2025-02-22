import Mycoupons from '../../component/user/mycoupons'
import Coupon from "../../../services/Coupon";
import Store from "../../../services/Store";
import Save from "../../../services/Save";


export default async function Mycouponspage() {

  const response = await Coupon.getAll();
  const responseStore = await Store.getAll();
  const responseSave = await Save.getAll();
  
 
    return (
        <div>
            <Mycoupons response={response} responseStore={responseStore} responseSave={responseSave} />
        </div>
    )
        

}