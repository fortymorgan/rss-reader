export default () => {
  const input = document.querySelector('input');
  input.value = '';

  const errors = document.querySelectorAll('.alert');
  errors.forEach(error => error.remove());
};
