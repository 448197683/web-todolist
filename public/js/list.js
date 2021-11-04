const delBtns = document.querySelectorAll('button');

delBtns.forEach((delBtn) => {
  delBtn.addEventListener('click', () => {
    console.log(delBtn);
  });
});
