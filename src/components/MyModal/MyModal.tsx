import {Button, Modal} from 'react-bootstrap';
import React, {PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  onClose: () => void;
  isOpen: boolean;
}

const MyModal: React.FC<Props> = ({isOpen, onClose, children}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;