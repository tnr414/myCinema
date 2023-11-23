export default function (items, rating) {
    if (rating === 0) {
        return items;
    } else {
        return items.filter((item) => item.rate >= rating);
    }
}