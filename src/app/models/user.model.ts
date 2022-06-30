import * as JoiValidation from 'Joi';

export var UserSchema = JoiValidation.object({
Email:JoiValidation.string().required(),
Password: JoiValidation.string().required()
});