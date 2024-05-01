

export const Cart = () => {


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

            <tr>
                <td colSpan={3} className="total-cell">
                Total: &nbsp;

                </td>
            </tr>
            </tbody>
        </table>
        </>
    );
};