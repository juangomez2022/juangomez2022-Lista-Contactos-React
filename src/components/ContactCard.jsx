import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { actions } from "../store";
import { useState } from "react";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = async () => {
    await actions.deleteContact(dispatch, contact.id);
    setShowModal(false);
  };

  return (
    <div className="card p-3 mb-3 position-relative">

      
      <div className="icons-functions">
        <button
          className="icon-btn me-3"
          onClick={() => navigate(`/edit/${contact.id}`)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className="icon-btn"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div className="d-flex align-items-center mx-4">

        <img
          src={`https://randomuser.me/api/portraits/men/${contact.id % 10}.jpg`}
          alt="contact"
          className="contact-img "
        />

        <div className="contact-info mx-5">
          <h5 className="mb-3">{contact.name}</h5>

          <p className="text-muted small">
            <i className="fa-solid fa-location-dot me-2"></i>
            {contact.address}
          </p>

          <p className="text-muted small">
            <i className="fa-solid fa-phone me-2"></i>
            {contact.phone}
          </p>

          <p className="text-muted small">
            <i className="fa-solid fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>
      </div>

    
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Delete Contact</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                Are you sure?
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactCard;