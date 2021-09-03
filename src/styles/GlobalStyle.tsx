import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    *, h1, h2, h3, h4, h5, h6{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *{       
        font-family: var(--raleway-ff);
        font-size: 16px;
    };

    :root{
        --c-black: #1D1F22;
        --c-primary: #5ECE7B;
        --c-disabled: #8D8F9A;
        --roboto-ff: 'Roboto', sans-serif;
        --roboto-condensed: 'Roboto Condensed', sans-serif;
        --source-sans-pro-ff: 'Source Sans Pro', sans-serif;
        --raleway-ff: 'Raleway', sans-serif;
        --container-width: 85%;
        --fs-xs: 0.875rem;
        --fs-s: 1.125rem;
        --fs-m: 1.5rem;
        --fs-l: 1.875rem;
        --fw-light: 300;
        --fw-normal: 400;
        --fw-medium: 500;
        --fw-semibold: 600;
        --fw-bold: 700;
        --m-xs: 0.75em;
        --m-s: 1em;
        --m-m: 2em;
        --m-l: 4em;
        --m-xl: 6.25em;
        --m-center: 0 auto;
        --p-s: 0.5em;
        --p-m: 1em;
        --p-l: 1.25em;
    
    };

    body{
        color: var(--c-black);
    }
    
    
`;
