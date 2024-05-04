import { Link } from "react-router-dom";
import { useCartStore } from "../store";
import cartIcon from "../assets/cart.svg";
import "../App.css";

export const Nav = () => {

    /*
    
        The approach of using useCartStore((state) => state.cartItems) in Zustand, where useCartStore is likely a custom hook created with the Zustand library for managing state, is a common pattern in modern React development. This specific usage has several important benefits and reasons behind it:

        1. Selective State Subscription
        One of the key features of Zustand is that it allows components to subscribe to only the parts of the state that they need. By doing so, you can optimize your component's performance:

            - Reduced Rerenders: The component will only rerender when the specific piece of state it subscribes to (cartItems in this case) changes. If other parts of the store change (like other properties not related to cartItems), the component will not rerender. This is particularly beneficial in larger applications where many state updates occur, but many components only care about specific changes.


        2. Simplicity and Clarity
        Using this pattern makes the code simpler and more declarative:

            - Readability: It’s immediately clear which part of the state the component is interested in. This improves readability and maintainability of the code as you can see right at the top of your component which state slices it depends on.
        
            - Ease of Use: The simplicity of just requesting the needed data directly in the component makes it easier to manage and use the state effectively, without the need to manage potentially complex selectors or context providers.


        3. Encapsulation of State Logic
        By encapsulating the state logic inside the store and only exposing what is necessary, the rest of your application remains decoupled from the state logic:

            - Decoupling: Components are not directly manipulating the state but instead interacting through a well-defined API (the useCartStore hook). This means changes to the store's internal workings (like how state is updated) can often be made without requiring changes to components that use it.


        4. Type Safety and Autocompletion
        If you’re using TypeScript, this pattern can also improve type safety and developer experience:

            - Type Safety: TypeScript can infer the type of cartItems directly from the Zustand store, ensuring you get compile-time checks and reducing runtime errors.
        
            - Autocompletion: When using IDEs with good TypeScript support, developers can receive autocompletion and inline documentation for the state, improving the development speed and accuracy.

        
        5. Functional Programming Style
        The pattern of using a selector function ((state) => state.cartItems) aligns with functional programming principles, which emphasize immutability and pure functions:

            - Immutability: By accessing state through a selector, you are less likely to mutate state inadvertently since you are provided with just the slice you need, not the entire state object.
        
            - Pure Functions: Selectors are pure functions that return part of the state based on their input. This makes them predictable and easy to test.

        The use of useCartStore((state) => state.cartItems) in Zustand not only optimizes component performance by reducing unnecessary rerenders but also enhances code clarity, maintainability, and decoupling of the state management from UI components. This approach aligns with modern React best practices, leveraging functional programming concepts to manage state more effectively in complex applications.
    
    */

    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <nav className="nav-container">
        <ul className="nav">
            <li className="nav-item">
            <Link to="/">Products</Link>
            </li>
            <li className="nav-item">
            <Link to="/cart" className="cart-link">
                {cartItems.length > 0 && (
                <span className="cart-items-count">{cartItems.length}</span>
                )}
                <img src={cartIcon} alt="cart link" className="cart-icon" />
            </Link>
            </li>
        </ul>
        </nav>
    );
};