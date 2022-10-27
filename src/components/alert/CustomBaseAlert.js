import Vue from 'vue';

export const CustomBaseAlert = (title, text, icon) => {
  return (Vue.swal({
    title,
    icon,
    text,
    showConfirmButton: false,
    showCloseButton: true,
  }))
};
