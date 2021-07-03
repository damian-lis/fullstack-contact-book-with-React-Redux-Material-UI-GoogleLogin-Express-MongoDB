import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { deleteContact, deleteContacts } from 'actions/contact.actions';
import Alert from '@material-ui/lab/Alert';

const EditDeleteBtn = (rowData, handleDeleteContact, handleOpen, setCurrentId) =>
  rowData && (
    <>
      <IconButton
        onClick={() => {
          setCurrentId(rowData._id);
          handleOpen({ editVariant: true });
        }}
        color="primary">
        <EditIcon />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => {
          handleDeleteContact(rowData._id);
        }}>
        <DeleteIcon />
      </IconButton>
    </>
  );

const SelectedImage = (rowData) => (
  <img
    alt="Userimage"
    style={{ height: 36, width: 36, borderRadius: '50%' }}
    src={rowData.selectedImage}
  />
);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  buttonWrapper: {
    textAlign: 'right',
    marginBottom: '20px',
    [theme.breakpoints.down(550)]: {
      textAlign: 'center'
    }
  },
  card: {
    margin: '10px'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.96rem'
  }
}));

const ContactTable = ({ handleOpen, setCurrentId }) => {
  const [deleteContactAlert, setDeleteContactAlert] = useState(false);
  const [deleteContactsAlert, setDeleteContactsAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const classes = useStyles();
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
    setShowAlert(true);
    setDeleteContactAlert(true);
  };

  const handleDeleteContacts = (ids) => {
    dispatch(deleteContacts(ids));
    setShowAlert(true);
    setDeleteContactsAlert(true);
  };

  return (
    <>
      {showAlert && (
        <Alert
          action={
            <Button
              onClick={() => {
                setDeleteContactAlert(false);
                setDeleteContactsAlert(false);
                setShowAlert(false);
              }}
              color="inherit"
              size="small">
              X
            </Button>
          }
          severity="success">
          {deleteContactAlert && 'Contact deleted!'}
          {deleteContactsAlert && 'Contacts deleted!'}
        </Alert>
      )}
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleOpen}>
          Add Contact
        </Button>
      </div>
      <Card>
        <MaterialTable
          title="Contact Details"
          columns={[
            {
              title: 'Image',
              field: 'selectedImage',
              render: SelectedImage
            },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phoneNo1' },
            { title: 'Address', field: 'address' },
            {
              title: 'Edit/Delete',
              field: 'edit',
              render: (rowData) =>
                EditDeleteBtn(rowData, handleDeleteContact, handleOpen, setCurrentId)
            }
          ]}
          data={contacts}
          actions={[
            {
              tooltip: 'Remove All Selected Contacts',
              icon: 'delete',
              onClick: (evt, data) => handleDeleteContacts(data.map((contact) => contact._id))
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true
          }}
        />
      </Card>
    </>
  );
};

export default ContactTable;
