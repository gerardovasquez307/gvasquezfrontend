import * as JoiValidation from 'joi';

export var UserSchema = JoiValidation.object({
Email:JoiValidation.string().required(),
Password: JoiValidation.string().required()
});