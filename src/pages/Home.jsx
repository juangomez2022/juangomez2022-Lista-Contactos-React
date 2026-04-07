import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { actions } from "../store";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    actions.getContacts(dispatch);
  }, [dispatch]);

  return (
    <div className="container mt-5">

      {/* Botón agregar */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add">
          <button className="btn btn-success">
            Add new contact
          </button>
        </Link>
      </div>

      {/* Lista */}
      {store.contacts.length === 0 ? (
        <div className="text-center mt-5">
          <div className="card shadow p-5 mx-auto" style={{ maxWidth: "400px" }}>
            <i className="fa-regular fa-address-book fa-4x text-secondary mb-3"></i>
            <h3>No contacts yet</h3>
            <p className="text-muted">
              Start by creating your first contact.
            </p>

            <Link to="/add">
              <button className="btn btn-success w-100">
                Create first contact
              </button>
            </Link>
          </div>
        </div>
      ) : (
        store.contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};