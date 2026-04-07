const API_URL = "https://playground.4geeks.com/contact/agendas/juan_gomez_2026/contacts";

export const initialStore = () => ({
  contacts: []
});

export default function storeReducer(store, action) {
  switch (action.type) {

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    default:
      return store;
  }
}

export const actions = {

  getContacts: async (dispatch) => {
    try {
      const resp = await fetch(API_URL);
      const data = await resp.json();

      dispatch({
        type: "set_contacts",
        payload: data.contacts || data
      });

    } catch (error) {
      console.log("GET ERROR:", error);
    }
  },

  createContact: async (form, dispatch) => {
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!resp.ok) {
        console.log("ERROR POST:", await resp.text());
        return false;
      }

      const data = await fetch(API_URL).then(r => r.json());

      dispatch({
        type: "set_contacts",
        payload: data.contacts || data
      });

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateContact: async (id, form, dispatch) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await fetch(API_URL).then(r => r.json());

      dispatch({
        type: "set_contacts",
        payload: data.contacts || data
      });

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  },

  deleteContact: async (dispatch, id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await fetch(API_URL).then(r => r.json());

      dispatch({
        type: "set_contacts",
        payload: data.contacts || data
      });

    } catch (error) {
      console.log(error);
    }
  }
};