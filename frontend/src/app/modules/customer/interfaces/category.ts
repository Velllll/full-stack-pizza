// export interface IPositions {
//     img: string;
//     name: string;
//     discription: string;
//     price: number;
// }

// export interface ICatygory {
//     title: string;
//     positions: IPositions[];
// }

// export interface ISpecialOffers extends IPositions {
//     discount: number;
// }

// export interface ISpecialOffers extends ICatygory {
//     discount: number;
// }

export interface IPositions {
    category_id: number,
    title: string,
    img: string,
    name: string,
    discription: string,
    price: number,
    discount: number
}

export interface ICart {
    name: string;
    img: string;
    price: number;
}

