import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(''); // Add state for userId
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userData = {
        userId: userId, // Pass userId to userData
        totalAmount: totalPrice,
        products: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
      };

      const response = await axios.post('http://localhost:8080/order', userData);
      console.log(response);
      dispatch(clearCart());
      setLoading(false);
      await Swal.fire({
        title: "Thank you for your order!",
        text: "Our delivery will contact you soon!",
        icon: "success"
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className='m-5'>
      <form onSubmit={handleSubmit} className='custom-checkout-page-main-div mt-5 rounded-4' style={{ border: '1px solid #b69f2c', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }} >
        <h3 className='text-center text-warning2' style={{ fontSize: '2.5rem' }}>Delivery Address</h3>
        <div className='text-center mb-5 opacity-50' style={{ fontSize: '1rem' }}>Fill out your information to complete the order</div>
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="userId">User ID</label>
              <input placeholder='Enter your user ID' required onChange={(e) => setUserId(e.target.value)} type="text" id="userId" className="form-control" />
            </div>
          </div>
        </div>
        {/* Other form inputs */}
        <button data-mdb-ripple-init type="submit" className="btn bg-warning1 btn-block mb-5 custom-checkout-page-button w-100 h-25">  {loading ? (
          <div className="spinner-border text-dark" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          'Place order'
        )}</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutPage;
