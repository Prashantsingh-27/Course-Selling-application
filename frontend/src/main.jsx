import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51QvN6mL605vjRlV0neAgZlwmIYqoJs0eqJDsWf8j7r64gs0RcvyhLFJ2INfrXr8MoJVaMGB93jlxIWSwxVaQMEr100dLC2L3q0");

createRoot(document.getElementById('root')).render(
  
  <Elements  stripe={stripePromise}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Elements>
 
)
