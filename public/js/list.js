const delBtns = document.querySelectorAll('button');

delBtns.forEach((delBtn) => {
  delBtn.addEventListener('click', async () => {
    console.dir(delBtn.parentElement);
    const delID = delBtn.parentElement.id;
    try {
      const delFetch = await fetch('http://localhost:8080/delete', {
        method: 'delete',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ delID }),
      });
      console.log(delFetch.status);
      if (delFetch.status === 200) {
        delBtn.parentElement.remove();
      }
    } catch (error) {
      console.log(error);
    }
  });
});
