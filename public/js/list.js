const delBtns = document.querySelectorAll('button');
const linkBtns = document.querySelectorAll('.link');
console.log(linkBtns);

delBtns.forEach((delBtn) => {
  delBtn.addEventListener('click', async () => {
    console.dir(delBtn.parentElement);
    const delID = delBtn.parentElement.id;
    try {
      const delFetch = await fetch(`http://localhost:8080/delete/${delID}`, {
        method: 'delete',
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
linkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener('click', async (e) => {
    console.log(linkBtn.id);
    try {
      const descFetch = await fetch(
        `http://localhost:8080/description/${linkBtn.id}`
      );
      console.log(descFetch.status);
      if (descFetch.status === 200) {
        window.location.href = `http://localhost:8080/description/${linkBtn.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  });
});
