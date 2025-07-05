
// import React from "react";
// import './../styles/App.css';

// const App = () => {
//   return (
//     <div>
//         {/* Do not remove the main div */}
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./../styles/App.css";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 13", description: "Apple smartphone with A15.", image: "https://via.placeholder.com/150", price: 999 },
    { id: 2, name: "Samsung Galaxy S22", description: "Samsung flagship.", image: "https://via.placeholder.com/150", price: 899 },
    { id: 3, name: "OnePlus 10", description: "Smooth OxygenOS.", image: "https://via.placeholder.com/150", price: 749 },
    { id: 4, name: "Google Pixel 6", description: "Best Android camera.", image: "https://via.placeholder.com/150", price: 799 },
    { id: 5, name: "Xiaomi 12", description: "Flagship killer.", image: "https://via.placeholder.com/150", price: 699 },
    { id: 6, name: "Realme GT", description: "Performance on budget.", image: "https://via.placeholder.com/150", price: 599 },
    { id: 7, name: "Moto Edge", description: "Clean Android.", image: "https://via.placeholder.com/150", price: 549 },
    { id: 8, name: "Sony Xperia", description: "Multimedia power.", image: "https://via.placeholder.com/150", price: 799 }
  ]);

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | <Link to="/admin">Admin Panel</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} />} />
          <Route path="/admin" element={
            <AdminPanel
              products={products}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
              addProduct={addProduct}
            />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Mobile Store</h2>
      {products.map((product) => (
        <div className="col-12" key={product.id}>
          <div>
            <Link to={`/products/${product.id}`}>
              <div className="row">
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h4>${product.price}</h4>
      <button className="btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

const AdminPanel = ({ products, updateProduct, deleteProduct, addProduct }) => {
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "" });

  const handleAdd = () => {
    if (form.name && form.description && form.image && form.price) {
      addProduct({ ...form, price: Number(form.price) });
      setForm({ name: "", description: "", image: "", price: "" });
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <input className="form-control" value={form.name} placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="form-control" value={form.description} placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="form-control" value={form.image} placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input className="form-control" type="number" value={form.price} placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button onClick={handleAdd}>Add</button>
      </div>

      {products.map((p, index) => (
        <div key={p.id} className="col-12">
          <div>
            <a>
              <div className="row">
                <img src={p.image} alt={p.name} width="50" />
                <strong>{p.name}</strong> (${p.price})
              </div>
            </a>
          </div>
          <input className="form-control" type="number" value={p.price}
            onChange={(e) => updateProduct({ ...p, price: Number(e.target.value) })} />
          <button className="float-right" onClick={() => updateProduct(p)}>Save</button>
          <button className="float-right" onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
