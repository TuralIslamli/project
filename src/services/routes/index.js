const isDEV = process.env.NODE_ENV === 'development';

const prod = {
    HOME: '/xbitbucket/xtimesheet/public/front/',
    SIGN_IN: '/xbitbucket/xtimesheet/public/front/signin',
    DASHBOARD: '/xbitbucket/xtimesheet/public/front/dashboard',
    CHANGE_PASSWORD: '/xbitbucket/xtimesheet/public/front/change-password',
};

const dev = {
    HOME: '/',
    SIGN_IN: '/signin',
    DASHBOARD: '/dashboard',
    CHANGE_PASSWORD: '/change-password',
};

export const ROUTES = isDEV ? dev : prod;