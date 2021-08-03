const init_state = {
  note: "",
  color: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "CHANGE_NOTE":
      return { ...state, note: action.payload };

    default:
      return state;
  }
};
