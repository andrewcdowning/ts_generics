export interface IFooBar {
    foo: string;
    bar: string;
}

const foobars: Array<IFooBar> = [
    {
        foo: 'foo1',
        bar: 'bar1'
    },
    {
        foo: 'foo2',
        bar: 'bar2'
    },
    {
        foo: 'foo3',
        bar: 'bar3'
    }
]


// function sortByFoo(foobars: [IFooBar]) {
//     foobars.sort((a,b) => {
//         if (a.foo > b.foo) {
//             return 1;
//         }
//         if (a.foo < b.foo) {
//             return -1;
//         }
//         return 0
//     });
// }

// function sortByBar(foobars: [IFooBar]) {
//     foobars.sort((a,b) => {
//         if (a.bar > b.bar) {
//             return 1;
//         }
//         if (a.bar < b.bar) {
//             return -1;
//         }
//         return 0
//     });
// }

// Generic sort 
function sortByKey<T>(data: Array<T>, key: keyof T) {

    data.sort((a,b) =>{
        if (a[key] > b[key]) {
            return 1;
        }
        if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    })
}

sortByKey<IFooBar>(foobars, 'foo')


class Animal {
    public legCount: number;
    constructor(legCount: number){
        this.legCount = legCount
    }
}

class Cat extends Animal {
    constructor(){
        super(4)
    }
}

class Kanagroo extends Animal {
    constructor(){
        super(2)
    }
}

class Bacteria {

}

function printLegCount<T extends Animal>(animal: T){
    console.log(`Animal leg count is ${animal.legCount}`)
}

const myCat = new Cat();
const myKangaroo = new Kanagroo();
const myBacteria = new Bacteria();

printLegCount(myCat)
printLegCount(myKangaroo)
//printLegCount(Bacteria)
