export default function checkValidation(inputEl, removedClass, targetClass) {
  inputEl.classList.remove(removedClass);
  inputEl.classList.add(targetClass);
}
