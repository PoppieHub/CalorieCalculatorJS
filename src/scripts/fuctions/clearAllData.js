import {storage} from "../variables.js";

// Удаление данных из localStorage и перезагрузка страницы
export default () => {
    localStorage.removeItem(storage.products);
    localStorage.removeItem(storage.goals);
    localStorage.removeItem(storage.selectedProducts);
    location.reload();
};
