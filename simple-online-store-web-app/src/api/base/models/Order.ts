/* tslint:disable */
/* eslint-disable */
/**
 * SimpleOnlineStoreApi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const Order = {
    Desc: 'Desc',
    Asc: 'Asc'
} as const;
export type Order = typeof Order[keyof typeof Order];


export function instanceOfOrder(value: any): boolean {
    for (const key in Order) {
        if (Object.prototype.hasOwnProperty.call(Order, key)) {
            if (Order[key as keyof typeof Order] === value) {
                return true;
            }
        }
    }
    return false;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    return json as Order;
}

export function OrderToJSON(value?: Order | null): any {
    return value as any;
}

export function OrderToJSONTyped(value: any, ignoreDiscriminator: boolean): Order {
    return value as Order;
}

