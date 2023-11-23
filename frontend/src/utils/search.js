
export default function (items, filter, filterBy) {
    if (!items) return null;

    if (!filter || !filterBy || !filter.trim() || !items[0].hasOwnProperty(filterBy)) {
        return items;
    }

    let result =  items.filter((element) => 
        element[filterBy].toString()
        .toLowerCase().startsWith(filter.toString().toLowerCase())
    );
    return result;
}