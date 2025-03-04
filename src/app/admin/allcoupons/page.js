import Coupons from '../../component/admin/allcoupons'
import Coupon from "../../../services/Coupon";


export default async function Couponpage() {

    const response = await Coupon.get();
    //const responseStore = await Store.getAll();
 
    return (
        <div>
            <Coupons response={response} responseStore={responseStore} />
        </div>
    )
        
    
    
}