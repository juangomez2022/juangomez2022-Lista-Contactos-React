import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";
import { actions } from "../store";

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // cargar contacto si edit
  useEffect(() => {
    if (id) {
      const contact = store.contacts.find(c => c.id == id);

      if (contact) {
        setForm({
          name: contact.name || "",
          email: contact.email || "",
          phone: contact.phone || "",
          address: contact.address || ""
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim()
    };

    if (!cleanForm.name || !cleanForm.email || !cleanForm.phone || !cleanForm.address) {
      alert("All fields are required");
      return;
    }

    let success = false;

    if (id) {
      success = await actions.updateContact(id, cleanForm, dispatch);
    } else {
      success = await actions.createContact(cleanForm, dispatch);
    }

    if (success) {
      await actions.getContacts(dispatch);
      navigate("/");
    } else {
      alert("Error saving contact");
    }
  };

  return (
    <div className="container mt-5">

      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      <h2 className="text-center mb-4">
        {id ? "Edit Contact" : "Add Contact"}
      </h2>

      <form onSubmit={handleSubmit}>
        Full name
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Full Name"/>
        Email
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
        />
        Phone
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Phone"
        />
        Address
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Address"
        />

        <button className="btn btn-primary w-100">
          Save
        </button>

      </form>
    </div>
  );
};

export default AddContact;