const linkBtns = document.querySelectorAll('.link');
console.log(linkBtns);

linkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(linkBtn.id);
    try {
      const descFetch = await fetch(
        `http://localhost:8080/description/${linkBtn.id}`
      );
      if (descFetch.status === 200) {
        window.location.href = `http://localhost:8080/description/${linkBtn.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  });
});
