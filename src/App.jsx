import { useReducer, useState } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


function App() {

  const [addedProducts, setAddedProducts] = useState([]);
  const [cartProducts, dispatchCartProducts] = useReducer(cartProductsReducer, addedProducts);

  function cartProductsReducer(products, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        if (!action.payload) return products;
        const checkProd = products.find(p => p.name === action.payload.name)

        if (!checkProd) {

          return [...products, { name: action.payload.name, price: action.payload.price, quantity: 1 }]
        } else {

          return products.map(p =>
            p.name === action.payload.name ? { ...p, quantity: p.quantity + 1 } : p
          )
        }
      case "REMOVE_FROM_CART":
        if (!action.payload) return products;

        return products.filter(p => p.name !== action.payload.name)

      case "UPDATE_QUANTITY":

        return products.map(p => p.name === action.payload.name ? { ...p, quantity: Number(action.payload.quantity).toFixed(0) } : p);
      default:
        return products;
    }
  }

  const reduceTotal = (tot, num) => {
    return tot + Number((num.price * num.quantity).toFixed(2))
  }

  return (
    <>

      <header>
        <h1>Lista della Spesa</h1>
      </header>
      <main>
        <ul>
          {
            products.map((p, index) =>
              <li key={index}>
                <p>Nome: {p.name}, Prezzo: {p.price} €</p>
                <button onClick={() => dispatchCartProducts({ type: "ADD_TO_CART", payload: { ...p } })}>Aggiungi al Carrello</button>
              </li>)
          }
        </ul>

        <h2>Carrello:</h2>

        <ul>
          {
            cartProducts && cartProducts.map((p, index) =>
              <li key={index}>
                <p>Nome: {p.name},
                  Prezzo: {(p.price * p.quantity).toFixed(2)} €,
                  Quantità:
                  <input type="number"
                    min={1}
                    value={p.quantity}
                    onChange={(e) => dispatchCartProducts({ type: "UPDATE_QUANTITY", payload: { name: p.name, quantity: e.target.value } })} />
                </p>
                <button onClick={() => dispatchCartProducts({ type: "REMOVE_FROM_CART", payload: { ...p } })}>Rimuovi dal Carrello</button>

              </li>)
          }
        </ul>
        <p>Totale: {cartProducts.reduce(reduceTotal, 0)} €</p>
      </main>

    </>
  )
}

export default App
