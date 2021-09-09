import { useState,useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products';


const baseUrl=`http://localhost:8000`;
function App() {

  const [products,setProducts]=useState([]);
  const [payment,setPayment]=useState(false);
  const [orderId,setOrderId]=useState('');
  const [paymentId,setPaymentId]=useState('');
  const [signature,setSignature]=useState('');

  useEffect(()=>{
    getProducts();
  },[])
  const getProducts=async ()=>{
    const res=await axios.get(`${baseUrl}/products`)
    console.log(res)
    if(res.status===200){
      setProducts(res.data);
    }
  }

  const buyNow=async (productId)=>{
    const res=await axios.get(`${baseUrl}/order/${productId}`);
    console.log(res);

    if(res.status!==200){
      return;
    }

    const options = {
      "key": "rzp_test_ysB6nPiarDwS4h", // Enter the Key ID generated from the Dashboard
      "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": res.data.currency,
      "name": "MPR Technologies",
      "description": res.data.notes.desc,
      "image": "https://example.com/your_logo",
      "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
         
        setOrderId(response.razorpay_order_id);
        setPaymentId(response.razorpay_payment_id);
        setSignature(response.razorpay_signature);
        setPayment(true);
      },
      //this is the customer details
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "8056782046"
      },
     
  };
  var rzp1 = new window.Razorpay(options);

  rzp1.open();

  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Welcome to online training center
        </p>
        <a
          className="App-link"
          href="https://webscript.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Webscript.info
        </a>
        <div>
          {
            payment && (
              <div>
                <p>Payment Id:{paymentId}</p>
                <p>Order Id:{orderId}</p>
                <p>Razorpay Signature:{signature}</p>
                
              </div>
            )
          }
        </div>
      </header>
      <Products products={products} buyNow={buyNow}/>
    </div>
  );
}

export default App;
