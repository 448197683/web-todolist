const delBtn = document.querySelector('#delBtn');
const edidBtn = document.querySelector('#editBtn');
const doneBtn = document.querySelector('#doneBtn');
const editForm = document.querySelector('#editForm');
const editInput = document.querySelector('input');

delBtn.addEventListener('click', async () => {
  const delID = delBtn.parentElement.id;
  try {
    const delFetch = await fetch(`http://localhost:8080/delete/${delID}`, {
      method: 'delete',
    });
    console.log(delFetch.status);
    if (delFetch.status === 200) {
      window.location.href = `http://localhost:8080/list`;
    }
  } catch (error) {
    console.log(error);
  }
});

edidBtn.addEventListener('click', (e) => {
  editForm.classList.remove('hide');
  edidBtn.parentElement.classList.add('hide');
});

doneBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const currentUrl = window.location.href;
  const id = currentUrl.split('/')[4];
  const value = e.target.parentElement[0].value;
  try {
    const editFetch = await fetch(`/description/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    console.log(editFetch.status);
    if (editFetch.status === 200) {
      editForm.classList.add('hide');
      edidBtn.parentElement.classList.remove('hide');
      document.querySelector('p').innerHTML = value;
    }
  } catch (error) {
    console.log(error);
  }
});
