const linkBtns = document.querySelectorAll('.link');
const linkContainer = document.querySelector('.list-group');
console.log(linkContainer);

let selected = null;
let target = null;

/* linkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener('click', async (e) => {

    e.preventDefault();
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
}); */

linkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener('dragstart', () => {
    selected = linkBtn;
  });
  linkBtn.addEventListener('dragend', () => {
    if (selected.nextElementSibling == target) {
      console.log(`下一个`);
      return target.after(selected);
    }
    if (target.nextElementSibling == null) {
      console.log(`最后一个`);
      return target.after(selected);
    }
    if (target == selected.previousElementSibling) {
      console.log(`上一个`);
      return target.before(selected);
    }
    if (target.previousElementSibling == null) {
      console.log(`第一个`);
      return target.before(selected);
    }
    linkContainer.insertBefore(selected, target.nextElementSibling);
  });
  linkBtn.addEventListener('dragenter', () => {
    target = linkBtn;
  });
});
