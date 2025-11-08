import { useState } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateCartItem } = useCart();
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    setUpdating(true);
    await updateCartItem(item.id, newQty);
    setUpdating(false);
  };

  const handleRemove = async () => {
    setRemoving(true);
    await removeFromCart(item.id);
    setRemoving(false);
  };

  return (
    <div className="card flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product?.image || 'https://via.placeholder.com/200'}
          alt={item.product?.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=No+Image';
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.product?.name}
          </h3>
          <p className="text-primary-600 font-bold text-xl">
            ${item.product?.price?.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            
            <span className="w-12 text-center font-semibold">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-lg font-bold text-gray-900">
              ${item.subtotal?.toFixed(2)}
            </p>
          </div>
          
          <button
            onClick={handleRemove}
            disabled={removing}
            className="btn-danger p-2 disabled:opacity-50"
            title="Remove item"
          >
            {removing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiTrash2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

