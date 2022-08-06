import { Request, Response } from 'express';
import { UserSignUpData } from '../interfaces/User';

import * as authenticationService from '../services/authenticationService';

async function postAuthentication(req: Request, res: Response) {
    const {
        name,
        email,
        phone,
    } = req.body as UserSignUpData;

    await authenticationService.postNewUserSignUp({ name, email, phone });

    return res.sendStatus(201);
}
export {
    postAuthentication,
};
