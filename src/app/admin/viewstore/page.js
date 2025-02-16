import Form from '../../component/admin/viewstore'
import Store from '../../../services/Store'


export default async function Formpage() {

    const responseStore = await Store.getAll();

    return (
        <div>
            <Form responseStore={responseStore}/>
        </div>
    )
        
    
    
}