import { useState, useEffect } from 'react'
import itemService from './services/items'

const Header = ({ header }) => (
  <h1>{header}</h1>
);

const SubHeader = ({ text }) => (
  <h2>{text}</h2>
);

const ItemS = ({ itemS, deleteItemS }) => {
  return (
    <p>
      {itemS}
      <button onClick={deleteItemS}>delete</button>
    </p>
  )
}

const ItemK = ({ itemK, deleteItemK }) => {
  return (
    <p>
      {itemK}
      <button onClick={deleteItemK}>delete</button>
    </p>
  )
}

const ItemLIDL = ({ itemLIDL, deleteItemLIDL }) => {
  return (
    <p>
      {itemLIDL}
      <button onClick={deleteItemLIDL}>delete</button>
    </p>
  )
}

const ItemsS = ({ itemsToShowS, deleteItemS}) => {
  return (
    <>
      {itemsToShowS.map((item) => (
        <ItemS
        key={item.id}
        item={item.item}
        deleteItemS={() => deleteItemS(item.id)}/>
      ))}
    </>
  );
};

const ItemsK = ({ itemsToShowK, deleteItemK}) => {
  return (
    <>
      {itemsToShowK.map((item) => (
        <ItemK
        key={item.id}
        item={item.item}
        deleteItemK={() => deleteItemK(item.id)}/>
      ))}
    </>
  );
};

const ItemsLIDL = ({ itemsToShowLIDL, deleteItemLIDL}) => {
  return (
    <>
      {itemsToShowLIDL.map((item) => (
        <ItemLIDL
        key={item.id}
        item={item.item}
        deleteItemLIDL={() => deleteItemLIDL(item.id)}/>
      ))}
    </>
  );
};

const Filter = ({ showFound, handleFoundChange }) => {
  return (
    <div>
      filter shown with
      <input value={showFound} onChange={handleFoundChange} />
    </div>
  );
};

const Notification = ({ notification, error }) => {
  if (notification, error === null) {
    return null
  }
  if (error) {
      return (
          <div className='error'>
            {error}
          </div>
        )
  }
  else if (notification) {
      return (
          <div className='notification'>
              {notification}
          </div>
  )
}
}

const ItemFormS = ({ addItemS, newItem, handleItemChange }) => {
  return (
    <form onSubmit={addItemS}>
      <div>
        Item: 
        <input value={newItem} onChange={handleItemChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const ItemFormK = ({ addItemK, newItem, handleItemChange }) => {
  return (
    <form onSubmit={addItemK}>
      <div>
        Item: 
        <input value={newItem} onChange={handleItemChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const ItemFormLIDL = ({ addItemLIDL, newItem, handleItemChange }) => {
  return (
    <form onSubmit={addItemLIDL}>
      <div>
        Item: 
        <input value={newItem} onChange={handleItemChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [itemsS, setItemsS] = useState([]);
  const [itemsK, setItemsK] = useState([]);
  const [itemsLIDL, setItemsLIDL] = useState([]);
  const [newItemS, setNewItemS] = useState('');
  const [newItemK, setNewItemK] = useState('');
  const [newItemLIDL, setNewItemLIDL] = useState('');
  const [showFound, setShowFound] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    itemService
      .getAll()
      .then(initialItems => {
        setItemsK(initialItems)
        setItemsS(initialItems)
        setItemsLIDL(initialItems)
      })
  }, [])

  const addItemS = (event) => {
    event.preventDefault();
    const itemObject = { item: newItemS };
    if (itemsS.some((existing) => existing.item.toLowerCase() === newItemS.toLowerCase())) {
      changeItemS(itemObject);
      setNewItemS('');
    } else {
      itemService
        .create(itemObject)
        .then((returnedItem) => {
          setItemsS(itemsS.concat(returnedItem));
          setNewItemS('');
          setNotificationMessage(`Added ${returnedItem.item}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  const addItemK = (event) => {
    event.preventDefault();
    const itemObject = { item: newItemK };
    if (itemsK.some((existing) => existing.item.toLowerCase() === newItemK.toLowerCase())) {
      changeItemK(itemObject);
      setNewItemK('');
    } else {
      itemService
        .create(itemObject)
        .then((returnedItem) => {
          setItemsK(itemsK.concat(returnedItem));
          setNewItemK('');
          setNotificationMessage(`Added ${returnedItem.item}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  const addItemLIDL = (event) => {
    event.preventDefault();
    const itemObject = { item: newItemLIDL };
    if (itemsLIDL.some((existing) => existing.item.toLowerCase() === newItemLIDL.toLowerCase())) {
      changeItemLIDL(itemObject);
      setNewItemLIDL('');
    } else {
      itemService
        .create(itemObject)
        .then((returnedItem) => {
          setItemsLIDL(itemsLIDL.concat(returnedItem));
          setNewItemLIDL('');
          setNotificationMessage(`Added ${returnedItem.item}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };


  const itemsToShowS = showFound
    ? itemsS.filter((item) =>
        item.item.toLowerCase().includes(showFound.toLowerCase())
      )
    : itemsS;
  
    const itemsToShowK = showFound
    ? itemsK.filter((item) =>
        item.item.toLowerCase().includes(showFound.toLowerCase())
      )
    : itemsK;

    const itemsToShowLIDL = showFound
    ? itemsLIDL.filter((item) =>
        item.item.toLowerCase().includes(showFound.toLowerCase())
      )
    : itemsS;

    const deleteItemS = id => {
      const itemS = itemsS.find(i => i.id.toLocaleLowerCase() === id.toLocaleLowerCase())
      const deletedItemS = { ... itemS}
      if (window.confirm(`Delete ${deletedItemS.item}?`)) {
        itemService
          .remove(id, deletedItemS)
          .then(() => {
            setItemsS(itemsS.filter(i => i.id !== id))
            console.log('Deleted item ', deletedItemS.item)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(`Information of ${deletedItemS.item} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            setItemsS(itemsS.filter(i => i.id !== id))
          })
        }
    }
    const deleteItemK = id => {
      const itemK = itemsK.find(i => i.id.toLocaleLowerCase() === id.toLocaleLowerCase())
      const deletedItemK = { ... itemK}
      if (window.confirm(`Delete ${deletedItemK.item}?`)) {
        itemService
          .remove(id, deletedItemK)
          .then(() => {
            setItemsK(itemsK.filter(i => i.id !== id))
            console.log('Deleted item ', deletedItemK.item)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(`Information of ${deletedItemK.item} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            setItemsK(itemsS.filter(i => i.id !== id))
          })
        }
    }
    const deleteItemLIDL = id => {
      const itemLIDL = itemsLIDL.find(i => i.id.toLocaleLowerCase() === id.toLocaleLowerCase())
      const deletedItemLIDL = { ... itemLIDL}
      if (window.confirm(`Delete ${deletedItemLIDL.item}?`)) {
        itemService
          .remove(id, deletedItemLIDL)
          .then(() => {
            setItemsLIDL(itemsS.filter(i => i.id !== id))
            console.log('Deleted item ', deletedItemLIDL.item)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(`Information of ${deletedItemLIDL.item} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            setItemsS(itemsLIDL.filter(i => i.id !== id))
            setItemsK(itemsLIDL.filter(i => i.id !== id))
            setItemsLIDL(itemsLIDL.filter(i => i.id !== id))
          })
        }
    }

    const changeItemS = itemObject => {
      const itemS = itemsS.find(i => i.item.toLocaleLowerCase() === itemObject.item.toLocaleLowerCase())
      const changedItemS = { ... itemS, item: itemObject.item}
      if (changedItemS) {
        if (window.confirm(`${newItemS} is already added to shopping list, replace the old item with a new one?`)) {
          itemService
            .update(changedItemS.id, changedItemS)
            .then(returnedItemS => {
              setItemsS(itemsS.map(i => i.id !== changedItemS.id ? i : returnedItemS))
              console.log('changed item ', itemObject)
              setNotificationMessage(`Changed number of ${returnedItemS.item}`)
              setTimeout(() => {
                setNotificationMessage(null);
              }, 5000);
              })
        .catch(error => {
          console.log(error)
          alert(`The item '${itemObject.name}' could not be changed on the server`);
        })
      }
    }
  }

  const changeItemK = itemObject => {
    const itemK = itemsK.find(i => i.item.toLocaleLowerCase() === itemObject.item.toLocaleLowerCase())
    const changedItemK = { ... itemK, item: itemObject.item}
    if (changedItemK) {
      if (window.confirm(`${newItemK} is already added to shopping list, replace the old item with a new one?`)) {
        itemService
          .update(changedItemK.id, changedItemK)
          .then(returnedItemK => {
            setItemsS(itemsK.map(i => i.id !== changedItemK.id ? i : returnedItemK))
            console.log('changed item ', itemObject)
            setNotificationMessage(`Changed number of ${returnedItemK.item}`)
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            })
      .catch(error => {
        console.log(error)
        alert(`The item '${itemObject.name}' could not be changed on the server`);
      })
    }
  }
}

const changeItemLIDL = itemObject => {
  const itemLIDL = itemsLIDL.find(i => i.item.toLocaleLowerCase() === itemObject.item.toLocaleLowerCase())
  const changedItemLIDL = { ... itemLIDL, item: itemObject.item}
  if (changedItemLIDL) {
    if (window.confirm(`${newItemLIDL} is already added to phonebook, replace the old number with a new one?`)) {
      itemService
        .update(changedItemLIDL.id, changedItemLIDL)
        .then(returnedItemLIDL => {
          setItemsS(itemsLIDL.map(i => i.id !== changedItemLIDL.id ? i : returnedItemLIDL))
          console.log('changed item ', itemObject)
          setNotificationMessage(`Changed number of ${returnedItemLIDL.item}`)
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          })
    .catch(error => {
      console.log(error)
      alert(`The item '${itemObject.name}' could not be changed on the server`);
    })
  }
}
}

const handleItemChangeS = (event) => {
  setNewItemS(event.target.value);
};

const handleItemChangeK = (event) => {
  setNewItemK(event.target.value);
};

const handleItemChangeLIDL = (event) => {
  setNewItemLIDL(event.target.value);
};

const handleFoundChange = (event) => {
  setShowFound(event.target.value);
};


  const header = 'Shopping list';

  return (
    <div>
      <Header header={header} />

      <Notification notification={notificationMessage} error={errorMessage}/>
      <Filter showFound={showFound} handleFoundChange={handleFoundChange} />

      <SubHeader text="S-kaupat" />
      <ItemsS itemsToShowS={itemsS} deleteItemS={deleteItemS} changeItemS={changeItemS} />
      <ItemFormS addItemS={addItemS} newItem={newItemS} handleItemChange={handleItemChangeS} />

      <SubHeader text="K-kaupat" />
      <ItemsK itemsToShowK={itemsK} deleteItemK={deleteItemK} changeItemK={changeItemK} />
      <ItemFormK addItemK={addItemK} newItem={newItemK} handleItemChange={handleItemChangeK} />

      <SubHeader text="LIDL" />
      <ItemsLIDL itemsToShowLIDL={itemsLIDL} deleteItemLIDL={deleteItemLIDL} changeItemLIDL={changeItemLIDL} />
      <ItemFormLIDL addItemLIDL={addItemLIDL} newItem={newItemLIDL} handleItemChange={handleItemChangeLIDL} />
    </div>
  );
};

export default App;