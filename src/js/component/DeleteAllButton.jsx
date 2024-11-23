import React from "react";
import PropTypes from 'prop-types';

const DeleteAllButton = ( { deleteAll } ) => {
    return (
        <div className="d-flex justify-content-center m-5">
        <button
        className="btn btn-danger"
        onClick={deleteAll}>
              Burn all tasks!
        </button>
      </div>
    )
}


DeleteAllButton.PropTypes = {
    deleteAll: PropTypes.func.isRequired
}

export default DeleteAllButton;