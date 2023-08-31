import { createGlobalStyle } from "styled-components";

export default  createGlobalStyle`
    :root {
        --primary-color: #F3F7F4;
        --secondary-color: #B7A18F;
        --accent-color: #b17368;
        --bold-accent-color: #EA9A1C;
        --blue-accent-color: #6c86a1;
        --light-accent-color: #F1D7A6;
        --text-color: #212830;
        --heading-font-family: 'Poppins', sans-serif;
        --body-font-family: 'Urbanist', sans-serif;
        cursor: default;
    }
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        font-family: var(--body-font-family);
        background-image: url(/assets/background.jpg);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: 50% 40%;
        background-size: cover;
        line-height: 1;
    }
    h1 {
        font-family: var(--heading-font-family);
        font-size: 2rem;
    }
    a {
        color: var(--primary-color);
        text-decoration: none;
        font-family: var(--body-font-family);   
        transition: all 300ms ease;
        
        &:hover {
            cursor: pointer;
            color: var(--bold-accent-color);
        }
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;
