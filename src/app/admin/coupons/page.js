import Coupons from '../../component/admin/coupons'
import Coupon from "../../../services/Coupon";
import Store from "../../../services/Store";
import Save from "../../../services/Save";

export default async function Couponpage() {

    const response = await Coupon.get();
    const responseStore = await Store.getAll();
    const savedCoupons = await Save.getAll();
 
    return (
        <div>
            <Coupons response={response} responseStore={responseStore} savedCoupons={savedCoupons}/>
        </div>
    )
        
    
    
}