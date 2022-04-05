import {Modal,Button} from "antd";

function DeleteModal({deletehandleOk,deletehandleCancel,isDeleteModalVisible}) {
    return (<>
        <Modal title="DELETE" visible={isDeleteModalVisible}  onOk={deletehandleOk} onCancel={deletehandleCancel} 
        footer={[
            <Button key="Cancel" type="primary" onClick={deletehandleCancel}>
              Cancel
            </Button>,
            <Button key="Delete" type="danger"  onClick={deletehandleOk}>
              Delete
            </Button>,
            
          ]}>
            <p>Do u really wanna Delete the post? u made...</p>
            
        </Modal>
    </>)
};

export default DeleteModal;