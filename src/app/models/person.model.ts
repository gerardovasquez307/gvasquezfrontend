import * as JoiValidation from 'Joi';

 var PostPersonSchema = JoiValidation.object({
    SSN: JoiValidation.number().min(111111111).max(999999999).required(), 
    Name: JoiValidation.string().required(),
    Age: JoiValidation.number().min(1).max(122).required(),
    IsMale:JoiValidation.boolean().required(),
    CurrentAddress:JoiValidation.string().min(3).required(),
    Phone:JoiValidation.number().min(1111111111).max(9999999999).required(),
    Email:JoiValidation.string().required(),
    RelatedTo:JoiValidation.number().required(),
    Relationship:JoiValidation.number().required()
});


const FindPersonSchema = JoiValidation.object({
SSN: JoiValidation.number().required()
});

const UpdatePersonSchema = JoiValidation.object({
    SSN: JoiValidation.number().min(111111111).max(999999999).required(),
    Name: JoiValidation.string(),
    Age: JoiValidation.number().min(1).max(122),
    IsMale:JoiValidation.boolean(),
    CurrentAddress:JoiValidation.string().min(3),
    Phone:JoiValidation.number().min(1111111111).max(9999999999),
    Email:JoiValidation.string(),
    RelatedTo:JoiValidation.number(),
    Relationship:JoiValidation.number()
});

module.exports = {PostPersonSchema, FindPersonSchema, UpdatePersonSchema};