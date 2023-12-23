import currentDate from "../utils/currentDate.js";
import {storage} from "../variables.js";

// Удаление из массива съеденных
export default (productId) => {
    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem(storage.selectedProducts)) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate());

    // Удаление продукта по его id
    if (currentDateEntry) {
        for (let i = 0; i < currentDateEntry.products.length; i++) {
            // Поиск продукта с заданным ID в текущей группе
            const productIndex = currentDateEntry.products[i].findIndex(product => product.id === productId);

            // Если продукт найден, удаляем его из группы и завершаем цикл
            if (productIndex !== -1) {
                currentDateEntry.products[i].splice(productIndex, 1);
                break;
            }
        }

        // Удаление пустых групп продуктов
        currentDateEntry.products = currentDateEntry.products.filter(productGroup => productGroup.length > 0);

        // Удаление записи, если в ней нет продуктов
        if (currentDateEntry.products.length === 0) {
            selectedProducts = selectedProducts.filter(entry => entry.date !== currentDate());
        }

        // Сохранение изменений в localStorage
        localStorage.setItem(storage.selectedProducts, JSON.stringify(selectedProducts));
    }
};