const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {

  return (
    <>

      <header>
        <h1>Lista della Spesa</h1>
      </header>
      <main>
        <ul>
          {
            products.map(p => <li><p>Nome: {p.name}, Prezzo: {p.price} €</p></li>)
          }
        </ul>
      </main>

    </>
  )
}

export default App
