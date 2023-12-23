/*
    Генератор уникального id (не совсем)
    Генерирует случайный UUID по шаблону ‘xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx’.
    UUID включает случайно сгенерированные шестнадцатеричные цифры,
    фиксированную ‘4’ для указания версии и цифру,
    следующую определенному шаблону, обозначаемому ‘y".
 */
export const create_UUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
};