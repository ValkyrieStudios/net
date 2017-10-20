'use strict';

//  VERBS
export const METHOD = Object.freeze({
    GET             : 'Get',
    PUT             : 'Put',
    PATCH           : 'Patch',
    POST            : 'Post',
    DELETE          : 'Delete',
    HEAD            : 'Head',
    OPTIONS         : 'Options',
});

//  VERBS Allowed to send data in body
export const METHODS_ALLOWED_BODY = Object.freeze({
    [METHOD.PUT]    : true,
    [METHOD.POST]   : true,
    [METHOD.PATCH]  : true,
});
