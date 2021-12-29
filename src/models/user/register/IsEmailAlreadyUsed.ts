import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { User } from '../../../entity/User';


@ValidatorConstraint({async:true})
export class IsEmailAlreadyUsedConstraint implements ValidatorConstraintInterface{
     async validate(email: string) {
         const user = await User.findOne({where:{email}})
         console.log(user)
         if(user) return false;
         return true;
     }
}

export function IsEmailAlreadyUsed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator:IsEmailAlreadyUsedConstraint,
    });
  };
}