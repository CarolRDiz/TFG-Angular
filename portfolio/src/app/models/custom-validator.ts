import { AbstractControl } from "@angular/forms";
import { APP_CONSTS } from "./app.const";
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
import { luhnCheck } from './luhn.helper';

export const escapeRegExp = (input: string) => {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const phoneNumberUtil = PhoneNumberUtil.getInstance();


export class AppValidator {

    /**
     * 
     * @param cutOffPastYear 1970
     * @param ageToCheck 18
     * @returns validatorFun
     */



    // static dobValidator = (cutOffPastYear: number = 1970, ageToCheck: number = 18) => {
    //     return (control: AbstractControl) => {
    //         if (control.value) {
    //             const dob = new Date(control.value.replace(new RegExp(escapeRegExp('-'), 'g'), ' '));
    //             const diff_ms = Date.now() - dob.getTime();
    //             const age_dt = new Date(diff_ms);
    //             const years = Math.abs(age_dt.getUTCFullYear() - cutOffPastYear);
    //             const invalidDOB = years < ageToCheck;
    //             if (invalidDOB) return {
    //                 invalidDOB: { actualValue: control.value, ageAsOnDate: years, message: `Age must be equal or greater than ${ageToCheck} till date` }
    //             };
    //         }
    //         return null;
    //     };
    // }

    static emailValidator() {
        return (control: AbstractControl) => {
            if (control.value) {
                const valid: boolean = new RegExp(APP_CONSTS.emailRegex).test(control.value);
                if (!valid) return { invalidEmail: true, message: 'Introduce un correo electrónico válido!' };
            }
            return null;
        }
    }

    static cityValidator() {
        return (control: AbstractControl) => {
            if (control.value) {
                const valid: boolean = new RegExp(APP_CONSTS.cityRegex).test(control.value);
                if (!valid) return { invalidCity: true, message: 'Los caracteres especiales no son válidos' };
            }
            return null;
        }
    }

    static postalCodeValidator() {
        return (control: AbstractControl) => {
            if (control.value) {
                const valid: boolean = new RegExp(APP_CONSTS.postalCodeRegex).test(control.value);
                if (!valid) return { invalidPostalCode: true, message: 'Introduce un código postal válido' };
            }
            return null;
        }
    }

    static phoneValidator() {
        return (control: AbstractControl) => {
            if (control.value) {
                let validNumber = false;
                try {
                    const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
                        control.value, 'ES'
                    );
                    validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
                } catch (e) { }

                if (!validNumber) return { invalidPhone: true, message: 'Número de teléfono móvil no válido', hints: 'Phone number format must be like {STD code}-{8 digit positive number} (e.g : 033-23459876/ 080-34567654/ 022-85233654 etc.' };
                // const valid: boolean = APP_CONSTS.phoneRegex.test(control.value);
                // if (!valid) return { invalidPhone: true, message: 'Invalid phone number!', hints: 'Phone number format must be like {STD code}-{8 digit positive number} (e.g : 033-23459876/ 080-34567654/ 022-85233654 etc.' };
            }
            return null;
        }
    }
    

    static luhnValidator() {
        return (control: AbstractControl) => {
            if (control.value) {
                const isValid = luhnCheck(control.value);
                return isValid ? null : { 'invalidLuhnCheck': isValid, message: 'Tarjeta no válida'};
            }
            return null
        };
        
    }
}