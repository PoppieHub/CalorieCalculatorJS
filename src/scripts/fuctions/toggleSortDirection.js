import {sortDirection} from "../variables.js";
import {displayProducts} from "./displayFunctions.js";

// Переключение направления сортировки списка продуктов
export default function toggleSortDirection() {
    sortDirection.toggle();
    // Обновление рендеринга продуктов с учетом нового порядка сортировки
    displayProducts();
}