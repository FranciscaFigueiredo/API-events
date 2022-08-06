import * as authenticationRepository from '../repositories/authenticationRepository';

import { UserSignUpData } from '../interfaces/User';

async function postNewUserSignUp({ name, email, phone }: UserSignUpData) {
    const userData = await authenticationRepository.create({ name, email, phone });

    return userData;
}

export {
    postNewUserSignUp,
};
