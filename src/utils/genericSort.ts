export default function genericSort<T>(a: T, b: T, properties: keyof T) {
    if (a[properties] > b[properties]) {
        return 1;
    }
    if (a[properties] < b[properties]) {
        return -1;
    }
    return 0;

}
