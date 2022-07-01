import * as JoiValidation from 'joi';

 var PostPersonSchema = JoiValidation.object({
    SSN: JoiValidation.number().min(111111111).max(999999999).required(), 
    Name: JoiValidation.string().required(),
    Age: JoiValidation.number().min(1).max(122).required(),
    IsMale:JoiValidation.boolean().required(),
    Address:JoiValidation.string().min(3).required(),
    Phone:JoiValidation.number().min(1111111111).max(9999999999).required(),
    Email:JoiValidation.string().required(),
    RelatedTo:JoiValidation.string().required(),
    Relationship:JoiValidation.number().required()
});


var FindPersonSchema = JoiValidation.object({
SSN: JoiValidation.number().required()
});

var UpdatePersonSchema = JoiValidation.object({
    SSN: JoiValidation.number().min(111111111).max(999999999).required(),
    Name: JoiValidation.string(),
    Age: JoiValidation.number().min(1).max(122),
    IsMale:JoiValidation.boolean(),
    Address:JoiValidation.string().min(3),
    Phone:JoiValidation.number().min(1111111111).max(9999999999),
    Email:JoiValidation.string(),
    RelatedTo:JoiValidation.string(),
    Relationship:JoiValidation.number()
});

export var PersonSchemas = {PostPersonSchema, FindPersonSchema, UpdatePersonSchema};