import { toast } from 'react-toastify';

export default function error(err) {
  console.log(err);
  try {
    if (Object.prototype.hasOwnProperty.call(err, 'response')) {
      if (
        Object.prototype.hasOwnProperty.call(err.response.data, 'response') &&
        Object.prototype.hasOwnProperty.call(
          err.response.data.response,
          'errors'
        ) &&
        Array.isArray(err.response.data.response.errors)
      ) {
        err.response.data.response.errors.map(e => {
          toast.error(e.message);
        });
      }
    }
  } catch (err) {
    toast.error('Ocorreu um erro ao efetuar a sua compra');
  }
}
