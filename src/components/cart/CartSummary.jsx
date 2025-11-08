import { useState, useEffect } from 'react';
import { FiShoppingBag, FiUser, FiMail } from 'react-icons/fi';
import CheckoutModal from './CheckoutModal';

const CartSummary = ({ cart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutCart, setCheckoutCart] = useState(cart);

  // Keep the cart snapshot when checkout modal opens
  useEffect(() => {
    if (showCheckout && cart.items.length > 0) {
      setCheckoutCart(cart);
    }
  }, [showCheckout, cart]);

  // Don't hide the modal if checkout is in progress or completed
  if (cart.items.length === 0 && !showCheckout) {
    return null;
  }

  return (
    <>
      {cart.items.length > 0 && (
        <div className="card sticky top-20">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <FiShoppingBag className="w-6 h-6" />
              <span>Order Summary</span>
            </h2>
            
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.itemCount})</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${(cart.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-primary-600">
                  ${((cart.total * 1.1).toFixed(2))}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full btn-primary py-3 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      
      {showCheckout && (
        <CheckoutModal
          cart={checkoutCart}
          onClose={() => {
            setShowCheckout(false);
            setCheckoutCart(cart);
          }}
        />
      )}
    </>
  );
};

export default CartSummary;

