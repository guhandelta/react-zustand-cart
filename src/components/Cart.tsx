import { Link } from "react-router-dom";
import { formatCurrency, getTotalPrice } from "../helpers";
import { CartItem } from "../types";
import TrashIcon from "../assets/trash.svg";
import { useCartStore } from "../store";

export const Cart = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeItem = useCartStore((state) => state.removeItem);
    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);

    const handleIncrementQuantity = (cartItem: CartItem) => {
        incrementQuantity({ ...cartItem });
    };

    const handleDecrementQuantity = (cartItem: CartItem) => {
        decrementQuantity({ ...cartItem });
    };

    const handleRemoveItem = (cartItem: CartItem) => {
        removeItem({ ...cartItem });
    };

    /*
    
    The Zustand functions like removeItem, incrementQuantity, and decrementQuantity from the store are not used directly as event handlers but are instead wrapped within new functions such as handleIncrementQuantity, handleDecrementQuantity, and handleRemoveItem. This wrapping serves several important purposes in the context of a React application, like,

    1. Parameter Passing
    One of the primary reasons for wrapping these store functions in new handlers is to pass additional parameters or process data before invoking the store function. In your example, each handler function is crafted to take a CartItem object as an argument and then pass this, often with modifications or specific properties, to the store function. Directly using the store function in the JSX (like in an onClick handler) would not allow for this customization unless you use inline arrow functions in each JSX element, which can lead to less readable and potentially less performant code due to function re-creation on each render.

    2. Abstraction and Encapsulation
    By wrapping the store actions, you abstract away the direct manipulation of the store from the UI layer. This means your UI component doesn't need to know how the store function works or what it needs to operate correctly. It just needs to call a function that handles all these operations internally. This separation of concerns makes the codebase easier to manage and debug.

    3. Pre-processing Logic
    Sometimes, before updating the state, there might be necessary pre-processing of the data. Wrapping allows you to integrate this logic without cluttering the UI code. For instance, you might want to validate something or modify the data slightly before passing it to the state management layer.

    4. Reusability
    If the same logic for incrementing, decrementing, or removing items needs to be used in different parts of your component or in different event handlers, having them wrapped in a single function avoids code duplication. This makes your code cleaner and more maintainable.

    5. Condition Checking
    Before performing a state update, you might want to check certain conditions (e.g., is the item quantity greater than 1 before decrementing?). Encapsulating this logic inside a handler function keeps the JSX clean and focused purely on the UI logic.

    6. Performance Optimization
    Directly passing inline functions like onClick={() => incrementQuantity(cartItem)} can lead to performance issues because these functions are re-created on every render. While wrapping them in a constant function defined in the component’s scope as you've done doesn't completely mitigate the creation of new functions (since new instances of handleIncrementQuantity, etc., are created on each render unless memoized), it does often lead to clearer and more manageable code.

    7. Improved Readability and Maintainability
    This encapsulation makes your component easier to read and maintain, as the business logic is separated from the UI rendering logic. This separation is particularly useful in larger projects where state management can become complex.

    Wrapping Zustand actions in component-specific handler functions is a beneficial practice that improves code organization, maintainability, readability, and allows for additional logic processing without complicating the UI component’s code.

    Zustand actions can be used directly in components, but this generally only makes sense when no additional parameters or preprocessing is required before updating the state. Eg:
    
        <button onClick={() => incrementQuantity()}>Increment</button>

    In most cases, wrapping the actions in functions as you've done is a more flexible and maintainable approach.

    This direct usage would be appropriate if incrementQuantity does not need any external data to update the state (which is not the case in your scenario where the action depends on a specific cartItem).

    What Might Go Wrong If Used Directly?
        Immediate Invocation: As mentioned, mistakenly setting onClick={incrementQuantity()} would call the function during render instead of in response to a click, likely leading to errors or unintended state mutations.
    
        Parameter Mismanagement: If actions need specific data from the component (like a cartItem object), directly attaching the action to an event handler without wrapping could lead to issues where the necessary data isn't passed correctly, resulting in bugs or incorrect state updates.
    
        Lack of Flexibility: Directly using Zustand actions in your JSX can limit your ability to handle complex interactions that might require additional data processing or multiple steps before committing a state update.

    */

    return (
        <>
        <h1>Cart</h1>
        <table className="cart-table">
            <thead>
            <tr>
                <th>Product</th>
                <th className="product-data-cell">Quantity</th>
                <th className="product-data-cell">Price</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map((cartItem) => (
                <tr key={cartItem.product.id} className="product-row">
                <td className="product-head">
                    <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    className="product-image"
                    width="60"
                    height="60"
                    />
                    <h4>
                    <Link to="#">{cartItem.product.name}</Link>
                    </h4>
                </td>
                <td className="product-data-cell">
                    <div className="product-quantity">
                    <button
                        className="btn-left"
                        onClick={() => handleDecrementQuantity(cartItem)}
                    >
                        -
                    </button>
                    <span className="product-quantity_value">
                        {cartItem.quantity}
                    </span>
                    <button
                        className="btn-right"
                        onClick={() => handleIncrementQuantity(cartItem)}
                    >
                        +
                    </button>
                    </div>
                    <button
                    onClick={() => handleRemoveItem(cartItem)}
                    className="delete-btn"
                    >
                    <img src={TrashIcon} alt="Remove" className="icon" />
                    </button>
                </td>
                <td className="product-data-cell">
                    {formatCurrency(cartItem.product.price * cartItem.quantity)}
                </td>
                </tr>
            ))}
            <tr>
                <td colSpan={3} className="total-cell">
                Total: &nbsp;
                <span className="total">
                    {formatCurrency(getTotalPrice(cartItems))}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        </>
    );
};