import { useState } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

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

  return (
    <>

      <header>
        <h1>Lista della Spesa</h1>
      </header>
      <main>
        <ul>
          {
            products.map((p, index) => <li key={index}><p>Nome: {p.name}, Prezzo: {p.price} €</p> <button onClick={() => addToCart(p)}>Aggiungi al Carrello</button></li>)
          }
        </ul>
        {
          addedProducts && addedProducts.map((p, index) => <li key={index}><p>Nome: {p.name}, Prezzo: {(p.price * p.quantity).toFixed(2)} €</p></li>)
        }
      </main>

    </>
  )
}

export default App
