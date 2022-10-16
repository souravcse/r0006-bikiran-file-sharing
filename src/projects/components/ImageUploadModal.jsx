import imgAvatar from '../../assets/images/img-avatar.jpg';
import { iconsModal } from '../../configs/Icons';

const ModalHeader = ({ handleCloseClick }) => (
    <div className="modal-box-header" style={{ borderBottom: '1px solid rgba(19, 15, 64, 0.1)' }}>
        <div>
            <div className="modal-box-title">Crop your image</div>
            <div className="modal-box-close">
                <button className="button squire" type="button" onClick={handleCloseClick}>
                    <img src={iconsModal.iconCloseModal} alt="Close" />
                </button>
            </div>
        </div>
    </div>
);
function ModalBody() {
    return (
        <div className="container h-100 text-center">
            <div className="image-crop-area">
                <img className="w-100" src={imgAvatar} alt="avatar" />
            </div>
            <div className="line">
                <span className="img-upload-btn">Upload</span>
            </div>
        </div>
    );
}

function ImageUploadModal({ handleCloseClick }) {
    // const handleCloseClick = () => setOpenModal(null);
    return (
        <div className="modal-box backdrop">
            <div className="modal-box-content" style={{ maxWidth: '448px' }}>
                <ModalHeader handleCloseClick={handleCloseClick} />

                <ModalBody />
            </div>
        </div>
    );
}

export default ImageUploadModal;
