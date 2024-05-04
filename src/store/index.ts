import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";

export type CartState = {
    cartItems: CartItem[];
};

export type CartActions = {
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    incrementQuantity: (item: CartItem) => void;
    decrementQuantity: (item: CartItem) => void;
};

// CartState & CartActions: This defines the TypeScript types for the state and the actions, ensuring type safety.
export const useCartStore = create<CartState & CartActions>()(
    // persist: Wraps the state and actions definition, enabling the cart's state to be saved to and loaded from local storage, or another persistence layer, keyed by "cart-storage".
    persist(

        /*
            In Zustand, the (set, get) => ({}) function is the core configuration function used to define the state and actions of the store. This function is essential for setting up both the initial state of the store and the methods (actions) that will manipulate that state. Here’s a detailed breakdown of what set, get, and the function itself represent:

            The Setup Function: (set, get) => ({})

            set: This is a function that you can use to update the state of the store. It's used within the actions to change the state based on interactions or events in your application. You can pass an object to set that represents the new state, or a function that returns the new state. The function version is particularly useful when the new state depends on the current state.

            get: This function allows you to access the current state of the store from within your actions. It’s a synchronous function that returns the current state directly, enabling you to make decisions or compute new values based on the existing state.
            
            The Return Object ({}): Inside this setup function, you return an object that defines both the initial state of your store and any actions (methods) that can modify this state. This object typically includes properties for the state variables and functions for actions that will use set and get to perform state updates.
        */

        (set, get) => ({
        cartItems: [],
        addItem: (item: CartItem) => {
            const items = get().cartItems;
            const itemIndex = findItemIndex(items, item);

            if (itemIndex === -1) {
                set({ cartItems: [...items, { ...item, quantity: 1 }] });
            }
        },
        removeItem: (item: CartItem) => {
            const items = get().cartItems;
            const itemIndex = findItemIndex(items, item);

            if (itemIndex > -1) {
            items.splice(itemIndex, 1);
                set({ cartItems: [...items] });
            }
        },
        incrementQuantity: (item: CartItem) => {
            const items = get().cartItems;
            const itemIndex = findItemIndex(items, item);

            if (itemIndex > -1) {
            items[itemIndex].quantity++;
                set({ cartItems: [...items] });
            }
        },
        decrementQuantity: (item: CartItem) => {
            const items = get().cartItems;
            const itemIndex = findItemIndex(items, item);

            if (itemIndex > -1) {
            items[itemIndex].quantity--;

            // if the decremented item quantity is 0, remove the item
            if (items[itemIndex].quantity === 0) {
                items.splice(itemIndex, 1);
            }

                set({ cartItems: [...items] });
            }
        },
        }),
        { name: "cart-storage" }
    )
);

const findItemIndex = (cartItems: CartItem[], item: CartItem) => {
    return cartItems.findIndex(
        (cartItem) => cartItem.product.id === item.product.id
    );
};
