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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UpdateProductDto
 */
export interface UpdateProductDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateProductDto
     */
    brand?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateProductDto
     */
    name?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdateProductDto
     */
    price?: number | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateProductDto
     */
    description?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateProductDto
     */
    isNew?: boolean | null;
}

/**
 * Check if a given object implements the UpdateProductDto interface.
 */
export function instanceOfUpdateProductDto(value: object): value is UpdateProductDto {
    return true;
}

export function UpdateProductDtoFromJSON(json: any): UpdateProductDto {
    return UpdateProductDtoFromJSONTyped(json, false);
}

export function UpdateProductDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateProductDto {
    if (json == null) {
        return json;
    }
    return {
        
        'brand': json['brand'] == null ? undefined : json['brand'],
        'name': json['name'] == null ? undefined : json['name'],
        'price': json['price'] == null ? undefined : json['price'],
        'description': json['description'] == null ? undefined : json['description'],
        'isNew': json['isNew'] == null ? undefined : json['isNew'],
    };
}

export function UpdateProductDtoToJSON(json: any): UpdateProductDto {
    return UpdateProductDtoToJSONTyped(json, false);
}

export function UpdateProductDtoToJSONTyped(value?: UpdateProductDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'brand': value['brand'],
        'name': value['name'],
        'price': value['price'],
        'description': value['description'],
        'isNew': value['isNew'],
    };
}

