import Coupons from '../../component/admin/coupons'
import Coupon from "../../../services/Coupon";
import Store from "../../../services/Store";

export default async function Couponpage() {

    const response = await Coupon.get();
    const responseStore = await Store.getAll();
 
    return (
        <div>
            <Coupons response={response} responseStore={responseStore} />
        </div>
    )
        
    
    
}