import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background-color: #312E38;
        color: #FFF;
        font-size: 14px;
        line-height: 1.5715;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-size: 16px;
    }

    h1, h2, h3, h4 ,h5 , h6, strong {
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }
`;
