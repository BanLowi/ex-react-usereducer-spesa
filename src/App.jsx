import { useState } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (prod) => {

    const checkProd = addedProducts.find(p => p.name === prod.name)

    if (!checkProd) {

      setAddedProducts([...addedProducts, { name: prod.name, price: prod.price, quantity: 1 }])
    } else {

      setAddedProducts(addedProducts.map(p =>
        p.name === prod.name ? { ...p, quantity: p.quantity + 1 } : p
      ))
    }

  }

  const removeFromCart = (prod) => {

    const checkQuant = prod.quantity > 1

    if (!checkQuant) {

      setAddedProducts(addedProducts.filter(p => p.name !== prod.name))
    } else {

      setAddedProducts(addedProducts.map(p =>
        p.name === prod.name ? { ...p, quantity: p.quantity - 1 } : p
      ))
    }
  }

  const updateProductQuantity = (prod, quant) => {
    setAddedProducts(curr => curr.map(p => p.name === prod ? { ...p, quantity: Number(quant).toFixed(0) } : p))
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
                <button onClick={() => addToCart(p)}>Aggiungi al Carrello</button>
              </li>)
          }
        </ul>

        <h2>Carrello:</h2>

        <ul>
          {
            addedProducts && addedProducts.map((p, index) =>
              <li key={index}>
                <p>Nome: {p.name},
                  Prezzo: {(p.price * p.quantity).toFixed(2)} €,
                  Quantità:
                  <input type="number"
                    min={1}
                    value={p.quantity}
                    onChange={(e) => updateProductQuantity(p.name, e.target.value)} />
                </p>
                <button onClick={() => removeFromCart(p)}>Rimuovi dal Carrello</button>

              </li>)
          }
        </ul>
        <p>Totale: {addedProducts.reduce(reduceTotal, 0)} €</p>
      </main>

    </>
  )
}

export default App
