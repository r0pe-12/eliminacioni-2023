const DeleteModal = (props) => {
    const modal = document.getElementById('myDeleteModal')
    // TODO na neku foru consolelog fixuje sve
    console.log(modal);
    console.log(modal);
    console.log(modal);
    if (modal) {
        modal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const id = button.getAttribute('data-id')
            const title = button.getAttribute('data-title')

            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalTitle = modal.querySelector('#staticBackdropLabel')
            const delBtn = modal.querySelector('#deleteBtn');

            modalTitle.textContent = `Do you want to delete ${title}`
            delBtn.setAttribute('prod-id', id);
        })
    }

    const deleteHandler = evt => {
        evt.preventDefault()
        const id = evt.target.getAttribute('prod-id');
        const close = modal.querySelector('#closeModal');
        close.click();
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(console.log);
    }

    return (
        <div className="modal fade" id="myDeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                <div className="modal-content px-2 py-1">
                    <div className="modal-header d-block border-0">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">prod</h1>
                        <br/>
                    </div>
                    <div className="modal-footer justify-content-between border-0">
                        <button type="button" style={{height: '50px'}}
                                className="btn btn-outline-secondary col-12 col-md-5"
                                data-bs-dismiss="modal">Otkaži
                        </button>
                        <button id={'deleteBtn'} type="button" style={{height: '50px'}}
                                onClick={deleteHandler}
                                className="btn btn-danger col-12 col-md-5">Obriši
                        </button>
                        <button id={'closeModal'} type="button" hidden data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
