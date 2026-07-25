// A CreateProduct is a DTO that is ready to send to the API.  It should not contain a null.
// The DTO should represent a valid state.

export type CreateProduct = {
    displayName: string;
    unitsPerCase: number;
    shelfCapacity: number;
    shelfDaysAllowed: number;
}
